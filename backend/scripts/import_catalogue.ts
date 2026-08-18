/**
 * ═══════════════════════════════════════════════════════════════════
 * RAMANAYAM CATALOGUE IMPORT EXECUTION SCRIPT
 * ═══════════════════════════════════════════════════════════════════
 *
 * Imports the validated 1,010 products using the exact ProductService
 * and ProductRepository batch transaction architecture.
 *
 * Rules:
 *  - CREATE ONLY (skip any SKU that already exists)
 *  - Batched transactions (50 items / transaction)
 *  - Accurate inventory record initialization
 *  - Primary image association
 *  - Complete category linkage
 *
 * Run:  npx ts-node scripts/import_catalogue.ts
 * ═══════════════════════════════════════════════════════════════════
 */

import * as fs from "fs";
import * as path from "path";
import { prisma } from "../src/prisma";
import { ProductRepository } from "../src/modules/products/product.repository";
import { ProductService } from "../src/modules/products/product.service";

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

async function executeImport(): Promise<void> {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("🚀 STARTING RAMANAYAM CATALOGUE IMPORT");
  console.log("═══════════════════════════════════════════════════════════\n");

  const startTime = Date.now();

  // 1. Check existing state & metrics before import
  const initialProductCount = await prisma.product.count();
  const initialVariantCount = await prisma.productVariant.count();
  const initialInventoryCount = await prisma.inventory.count();
  const initialImageCount = await prisma.productImage.count();

  console.log("📊 Pre-Import Database State:");
  console.log(`   Products:    ${initialProductCount}`);
  console.log(`   Variants:    ${initialVariantCount}`);
  console.log(`   Inventory:   ${initialInventoryCount}`);
  console.log(`   Images:      ${initialImageCount}\n`);

  // 2. Read and parse CSV
  const csvPath = path.join(__dirname, "data", "ramanayam_full_catalogue.csv");
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found at ${csvPath}`);
  }

  const csvContent = fs.readFileSync(csvPath, "utf8");
  const parsedRows = parseCsv(csvContent);
  console.log(`📄 Loaded ${parsedRows.length} CSV rows from ${csvPath}`);

  // 3. Initialize Service and Repository
  const repository = new ProductRepository(prisma);
  const service = new ProductService(repository);

  // 4. Run Dry-Run Validation using ProductService
  console.log("🔍 Performing pre-import dry-run validation via ProductService...");
  const validation = await service.validateCsvImport(parsedRows);

  console.log("📋 Dry-Run Summary:");
  console.log(`   Total Rows:          ${validation.summary.totalRows}`);
  console.log(`   Valid Rows:          ${validation.summary.validRows}`);
  console.log(`   Invalid Rows:        ${validation.summary.invalidRows}`);
  console.log(`   Duplicate SKUs:      ${validation.summary.duplicateSkus}`);
  console.log(`   Missing Categories:  ${validation.summary.missingCategories}`);

  if (validation.summary.invalidRows > 0 || validation.validProducts.length === 0) {
    console.error("❌ CRITICAL: Validation found invalid rows. Aborting import to protect database integrity.");
    console.error("Errors:", validation.errors);
    process.exit(1);
  }

  console.log(`\n✅ Dry-Run Validation Passed (100% clean)! Ready to import ${validation.validProducts.length} products.`);

  // 5. Execute Batched Import in CREATE ONLY mode
  console.log("\n📦 Executing batched import (50 products per ACID transaction)...");
  const result = await service.executeCsvImport(validation.validProducts);

  const durationMs = Date.now() - startTime;

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🎉 IMPORT EXECUTION FINISHED");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`   Products Created:    ${result.createdCount}`);
  console.log(`   Products Failed:     ${result.failedCount}`);
  console.log(`   Time Taken:          ${(durationMs / 1000).toFixed(2)}s\n`);

  // 6. Post-Import State
  const finalProductCount = await prisma.product.count();
  const finalVariantCount = await prisma.productVariant.count();
  const finalInventoryCount = await prisma.inventory.count();
  const finalImageCount = await prisma.productImage.count();

  console.log("📊 Post-Import Database State:");
  console.log(`   Products:    ${finalProductCount} (+${finalProductCount - initialProductCount})`);
  console.log(`   Variants:    ${finalVariantCount} (+${finalVariantCount - initialVariantCount})`);
  console.log(`   Inventory:   ${finalInventoryCount} (+${finalInventoryCount - initialInventoryCount})`);
  console.log(`   Images:      ${finalImageCount} (+${finalImageCount - initialImageCount})`);
  console.log("═══════════════════════════════════════════════════════════\n");
}

executeImport()
  .catch((err) => {
    console.error("❌ Import execution failed:", err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
