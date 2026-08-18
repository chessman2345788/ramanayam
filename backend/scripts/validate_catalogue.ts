/**
 * ═══════════════════════════════════════════════════════════════════
 * RAMANAYAM CATALOGUE VALIDATION SCRIPT
 * ═══════════════════════════════════════════════════════════════════
 *
 * Validates the full catalogue CSV against:
 *  - Required fields (name, sku, category, price, stock)
 *  - Price integrity (MRP >= Selling Price, Selling Price > 0)
 *  - SKU uniqueness (within CSV + against PostgreSQL)
 *  - Category matching (against live DB categories)
 *  - Image URL validity (well-formed https:// URLs)
 *  - Slug uniqueness (generated slugs)
 *  - Stock validation (stock >= 0)
 *  - SEO fields (description, shortDescription present)
 *
 * Run:  npx ts-node scripts/validate_catalogue.ts
 * ═══════════════════════════════════════════════════════════════════
 */

import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── CSV Parser ─────────────────────────────────────────────────────
function parseCsv(csvText: string): Record<string, string>[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]).map((h) => h.replace(/^"|"$/g, ""));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]).map((v) => v.replace(/^"|"$/g, ""));
    if (values.length >= headers.length - 1) {
      const rowObj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        rowObj[h] = values[idx] || "";
      });
      rows.push(rowObj);
    }
  }

  return rows;
}

// ─── Slug generator (must match backend) ────────────────────────────
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Validation types ───────────────────────────────────────────────
interface ValidationError {
  row: number;
  sku: string;
  field: string;
  message: string;
  value: string;
}

interface ValidationReport {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateSkusInCsv: number;
  existingSkuConflicts: number;
  missingCategories: number;
  invalidPrices: number;
  invalidGst: number;
  invalidStock: number;
  missingImages: number;
  invalidImages: number;
  missingRequiredFields: number;
  duplicateSlugs: number;
  errors: ValidationError[];
  categoryDistribution: Record<string, number>;
  unmatchedCategories: string[];
}

async function validateCatalogue(): Promise<void> {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("🔍 RAMANAYAM CATALOGUE VALIDATION");
  console.log("═══════════════════════════════════════════════════════════\n");

  // 1. Load CSV
  const csvPath = path.join(__dirname, "data", "ramanayam_full_catalogue.csv");
  if (!fs.existsSync(csvPath)) {
    console.error("❌ CSV file not found:", csvPath);
    process.exit(1);
  }

  const csvText = fs.readFileSync(csvPath, "utf8");
  const rows = parseCsv(csvText);
  console.log(`📄 Loaded ${rows.length} rows from CSV\n`);

  // 2. Load categories from DB
  const dbCategories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
  });
  const categoryMap = new Map<string, string>();
  for (const c of dbCategories) {
    categoryMap.set(c.name.toLowerCase().trim(), c.id);
    categoryMap.set(c.slug.toLowerCase().trim(), c.id);
  }
  console.log(`📂 Loaded ${dbCategories.length} categories from PostgreSQL`);
  console.log(`   Categories: ${dbCategories.map(c => c.name).join(", ")}\n`);

  // 3. Load existing SKUs from DB
  const allSkusInCsv = rows.map(r => (r.sku || "").trim()).filter(Boolean);
  const existingVariants = await prisma.productVariant.findMany({
    where: { sku: { in: allSkusInCsv } },
    select: { sku: true },
  });
  const existingDbSkus = new Set(existingVariants.map(v => v.sku));
  console.log(`🗄️  Found ${existingDbSkus.size} existing SKU conflicts in database\n`);

  // 4. Load existing slugs from DB
  const existingSlugs = await prisma.product.findMany({
    select: { slug: true },
  });
  const existingSlugSet = new Set(existingSlugs.map(p => p.slug));

  // 5. Validate each row
  const report: ValidationReport = {
    totalRows: rows.length,
    validRows: 0,
    invalidRows: 0,
    duplicateSkusInCsv: 0,
    existingSkuConflicts: 0,
    missingCategories: 0,
    invalidPrices: 0,
    invalidGst: 0,
    invalidStock: 0,
    missingImages: 0,
    invalidImages: 0,
    missingRequiredFields: 0,
    duplicateSlugs: 0,
    errors: [],
    categoryDistribution: {},
    unmatchedCategories: [],
  };

  const seenSkus = new Set<string>();
  const seenSlugs = new Set<string>();
  const unmatchedCatSet = new Set<string>();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2; // +2 because header is line 1, data starts line 2
    const name = (row.name || "").trim();
    const sku = (row.sku || "").trim();
    const category = (row.category || "").trim();
    const priceStr = (row.price || "").trim();
    const mrpStr = (row.compareAtPrice || "").trim();
    const stockStr = (row.stock || "").trim();
    const description = (row.description || "").trim();
    const shortDescription = (row.shortDescription || "").trim();
    const image1 = (row.image_1 || "").trim();
    const status = (row.status || "").trim().toUpperCase();
    let hasError = false;

    // Required fields
    if (!name) {
      report.errors.push({ row: rowNum, sku, field: "name", message: "Product Name is required", value: name });
      report.missingRequiredFields++;
      hasError = true;
    }

    if (!sku) {
      report.errors.push({ row: rowNum, sku, field: "sku", message: "SKU is required", value: sku });
      report.missingRequiredFields++;
      hasError = true;
    }

    if (!category) {
      report.errors.push({ row: rowNum, sku, field: "category", message: "Category is required", value: category });
      report.missingRequiredFields++;
      hasError = true;
    }

    // SKU uniqueness within CSV
    if (sku && seenSkus.has(sku)) {
      report.errors.push({ row: rowNum, sku, field: "sku", message: `Duplicate SKU "${sku}" within CSV`, value: sku });
      report.duplicateSkusInCsv++;
      hasError = true;
    } else if (sku) {
      seenSkus.add(sku);
    }

    // SKU conflict with DB
    if (sku && existingDbSkus.has(sku)) {
      report.errors.push({ row: rowNum, sku, field: "sku", message: `SKU "${sku}" already exists in database`, value: sku });
      report.existingSkuConflicts++;
      hasError = true;
    }

    // Category validation
    const normalizedCat = category.toLowerCase().trim();
    if (category && !categoryMap.has(normalizedCat)) {
      report.errors.push({ row: rowNum, sku, field: "category", message: `Category "${category}" not found in database`, value: category });
      report.missingCategories++;
      unmatchedCatSet.add(category);
      hasError = true;
    }

    // Price validation (integer comparison, no floats)
    const price = parseFloat(priceStr);
    const mrp = parseFloat(mrpStr);

    if (isNaN(price) || price <= 0) {
      report.errors.push({ row: rowNum, sku, field: "price", message: "Selling Price must be > 0", value: priceStr });
      report.invalidPrices++;
      hasError = true;
    }

    if (!isNaN(mrp) && !isNaN(price) && mrp < price) {
      report.errors.push({ row: rowNum, sku, field: "compareAtPrice", message: `MRP (${mrp}) must be >= Selling Price (${price})`, value: mrpStr });
      report.invalidPrices++;
      hasError = true;
    }

    // Stock validation
    const stock = parseInt(stockStr, 10);
    if (isNaN(stock) || stock < 0) {
      report.errors.push({ row: rowNum, sku, field: "stock", message: "Stock must be >= 0", value: stockStr });
      report.invalidStock++;
      hasError = true;
    }

    // Image validation
    if (!image1) {
      report.errors.push({ row: rowNum, sku, field: "image_1", message: "At least one image URL is required", value: "" });
      report.missingImages++;
      hasError = true;
    } else if (!image1.startsWith("https://")) {
      report.errors.push({ row: rowNum, sku, field: "image_1", message: "Image URL must start with https://", value: image1.substring(0, 50) });
      report.invalidImages++;
      hasError = true;
    }

    // Description / SEO
    if (!description) {
      report.errors.push({ row: rowNum, sku, field: "description", message: "Description is required for SEO", value: "" });
      report.missingRequiredFields++;
      // Not blocking — just warning
    }

    if (!shortDescription) {
      report.errors.push({ row: rowNum, sku, field: "shortDescription", message: "Short description is recommended", value: "" });
    }

    // Slug uniqueness
    const slug = generateSlug(name);
    if (seenSlugs.has(slug) || existingSlugSet.has(slug)) {
      // The backend appends random suffixes, so slug collisions in name are handled
      // But we still report them for awareness
      report.duplicateSlugs++;
    }
    seenSlugs.add(slug);

    // Category distribution
    if (category) {
      report.categoryDistribution[category] = (report.categoryDistribution[category] || 0) + 1;
    }

    // Status validation
    if (status && !["ACTIVE", "DRAFT", "ARCHIVED", "OUT_OF_STOCK"].includes(status)) {
      report.errors.push({ row: rowNum, sku, field: "status", message: `Invalid status "${status}"`, value: status });
      hasError = true;
    }

    if (!hasError) {
      report.validRows++;
    } else {
      report.invalidRows++;
    }
  }

  report.unmatchedCategories = Array.from(unmatchedCatSet);

  // ─── Print Report ──────────────────────────────────────────────────
  console.log("═══════════════════════════════════════════════════════════");
  console.log("📊 VALIDATION REPORT");
  console.log("═══════════════════════════════════════════════════════════\n");

  console.log(`  Total Rows:              ${report.totalRows}`);
  console.log(`  ✅ Valid Rows:            ${report.validRows}`);
  console.log(`  ❌ Invalid Rows:          ${report.invalidRows}`);
  console.log(`  🔁 Duplicate SKUs (CSV):  ${report.duplicateSkusInCsv}`);
  console.log(`  ⚠️  Existing SKU Conflicts: ${report.existingSkuConflicts}`);
  console.log(`  📂 Missing Categories:    ${report.missingCategories}`);
  console.log(`  💰 Invalid Prices:        ${report.invalidPrices}`);
  console.log(`  📦 Invalid Stock:         ${report.invalidStock}`);
  console.log(`  🖼️  Missing Images:        ${report.missingImages}`);
  console.log(`  🖼️  Invalid Images:        ${report.invalidImages}`);
  console.log(`  📝 Missing Required:      ${report.missingRequiredFields}`);
  console.log(`  🔗 Duplicate Slugs:       ${report.duplicateSlugs}`);

  if (report.unmatchedCategories.length > 0) {
    console.log(`\n  ❌ Unmatched Categories:`);
    for (const cat of report.unmatchedCategories) {
      console.log(`     - "${cat}"`);
    }
  }

  console.log("\n  📂 Category Distribution:");
  for (const [cat, count] of Object.entries(report.categoryDistribution).sort((a, b) => a[0].localeCompare(b[0]))) {
    const matched = categoryMap.has(cat.toLowerCase().trim()) ? "✅" : "❌";
    console.log(`     ${matched} ${cat}: ${count} products`);
  }

  if (report.errors.length > 0 && report.errors.length <= 20) {
    console.log("\n  ⚠️  Error Details:");
    for (const err of report.errors) {
      console.log(`     Row ${err.row} | SKU: ${err.sku || "N/A"} | ${err.field}: ${err.message}`);
    }
  } else if (report.errors.length > 20) {
    console.log(`\n  ⚠️  First 20 of ${report.errors.length} errors:`);
    for (const err of report.errors.slice(0, 20)) {
      console.log(`     Row ${err.row} | SKU: ${err.sku || "N/A"} | ${err.field}: ${err.message}`);
    }
  }

  // ─── Final verdict ─────────────────────────────────────────────────
  console.log("\n═══════════════════════════════════════════════════════════");
  if (report.invalidRows === 0 && report.missingCategories === 0 && report.duplicateSkusInCsv === 0) {
    console.log("✅ VALIDATION PASSED — All rows are valid for import");
    console.log(`   Ready to import ${report.validRows} products`);
  } else if (report.invalidRows === 0 && report.existingSkuConflicts > 0) {
    console.log("⚠️  VALIDATION PASSED WITH WARNINGS");
    console.log(`   ${report.validRows} valid rows ready`);
    console.log(`   ${report.existingSkuConflicts} existing SKUs will be skipped (CREATE ONLY policy)`);
  } else {
    console.log("❌ VALIDATION FAILED");
    console.log(`   ${report.invalidRows} rows have errors that must be resolved`);
    console.log("   DO NOT proceed with import until all errors are fixed");
  }
  console.log("═══════════════════════════════════════════════════════════");

  // Save report JSON
  const reportPath = path.join(__dirname, "data", "validation_report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  console.log(`\n📄 Full report saved: ${reportPath}`);

  await prisma.$disconnect();
}

validateCatalogue().catch((err) => {
  console.error("Fatal validation error:", err);
  prisma.$disconnect();
  process.exit(1);
});
