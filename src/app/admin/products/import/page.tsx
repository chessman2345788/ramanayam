"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  Database,
  FileSpreadsheet,
} from "lucide-react";
import { AdminToast } from "@/components/admin/ui";
import { ProductService } from "@/services/product.service";

const SAMPLE_CSV_CONTENT = `name,sku,category,price,compareAtPrice,stock,description,shortDescription,image_1,weight,status,featured
"Pure Brass Pooja Thali Set (11 Inch)","RAM-THALI-001","Pooja Thali & Accessories",1299,1699,45,"Handcrafted 11-inch heavy brass thali set including diya, agarbatti stand, and katori for daily temple rituals.","Handcrafted heavy brass thali set","https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",850,"ACTIVE",true
"Natural Camphor (Kapur) Flakes 250g","RAM-CAMPHOR-002","Pooja Samagri",349,499,120,"100% pure organic bhimseni camphor for aarti and havan. Leaves zero residue and emits sacred aroma.","Pure organic bhimseni camphor for daily aarti","https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",250,"ACTIVE",false
"Original 5 Mukhi Rudraksha Mala (108+1 Beads)","RAM-MALA-003","Mala",899,1299,60,"Lab-certified 5 mukhi Nepali Rudraksha beads strung in traditional red thread for japa and meditation.","Lab-certified 5 mukhi Nepali Rudraksha mala","https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",150,"ACTIVE",true
"Handmade Brass Lord Ganesha Idol (6 Inch)","RAM-IDOL-004","Murti",2499,3299,25,"Intricately carved solid brass Lord Ganesha idol in blessings posture for home mandir and altar.","Intricately carved solid brass Ganesha idol","https://images.unsplash.com/photo-1567591416417-76348efc63c7?w=800&auto=format&fit=crop&q=80",1400,"ACTIVE",true
"Vamavarti Natural Blowable Shankh (Conch)","RAM-SHANKH-005","Shankh & Bells",1499,1999,30,"Authentic natural ocean shell blowable shankh producing resonant Om sound for temple rituals.","Authentic natural ocean shell blowable shankh","https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",450,"ACTIVE",false
"Premium Sandalwood Dhoop Cones (100 Count)","RAM-DHOOP-006","Home Fragrance",299,399,150,"Bamboo-less natural Mysore chandan dhoop cones for deep spiritual focus and room purification.","Bamboo-less natural Mysore chandan dhoop cones","https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",300,"ACTIVE",false
"Handcrafted Wooden Home Temple (Mandir)","RAM-MANDIR-007","Mandir",4999,6499,15,"Teakwood finish wall-mountable wooden mandir with carved dome and storage drawer for idols.","Teakwood finish wall-mountable wooden mandir","https://images.unsplash.com/photo-1545232979-fbf5d96b1b44?w=800&auto=format&fit=crop&q=80",4500,"ACTIVE",true
"Brass Temple Hand Bell (Ghanti)","RAM-BELL-008","Shankh & Bells",599,799,75,"Pure brass hand-held bell engraved with Garuda motif emitting clear resonant vibrations.","Pure brass temple hand bell with Garuda motif","https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80",350,"ACTIVE",false
"Siddh Shree Yantra (Copper Plate 4x4 Inch)","RAM-YANTRA-009","Yantra",699,999,50,"Consecrated 24k gold-plated copper Shree Yantra plate for prosperity and positive energy.","Consecrated 24k gold-plated copper Shree Yantra","https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",120,"ACTIVE",false
"Organically Made Roli Kumkum & Chandan Set","RAM-KUMKUM-010","Pooja Samagri",199,299,200,"Traditional turmeric-derived red kumkum and pure sandalwood paste for tilak during pujas.","Turmeric-derived red kumkum and chandan paste","https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",100,"ACTIVE",false
"Heavy Pure Copper Lota / Kalash (500ml)","RAM-COPPER-011","Brass & Copper Items",499,699,80,"Seamless pure copper water vessel (kalash) for offering Jal to Surya Dev and deity abhishekam.","Seamless pure copper water vessel for puja","https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",320,"ACTIVE",false
"Designer Velvet Bhagwan Vastra Dress Set","RAM-VASTRA-012","Bhagwan Vastra",399,549,90,"Embroidered zardozi velvet poshak suitable for 4 to 6 inch deity murtis.","Embroidered zardozi velvet poshak for idols","https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",80,"ACTIVE",false
"Complete Navratri Special Pooja Kit","RAM-KIT-013","Pooja Kits",1899,2499,40,"All-in-one ritual kit containing 32 essential samagri items for 9 days of Navratri puja.","All-in-one ritual kit with 32 samagri items","https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",2100,"ACTIVE",true
"Round Handmade Cotton Wicks (Batti) 500 Count","RAM-WICKS-014","Pooja Samagri",149,199,250,"100% unbleached raw organic cotton wicks for diya lighting in temples.","Unbleached raw organic cotton wicks for diyas","https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",150,"ACTIVE",false
"Gold-Plated Brass Mukut Shringar Crown","RAM-MUKUT-015","Mukut & Shringar",449,599,65,"Adjustable gold-finish stone studded mukut crown for Laddu Gopal and deity idols.","Gold-finish stone studded mukut crown for idols","https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",95,"ACTIVE",false`;

function parseCsvText(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const parseLine = (line: string) => {
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
    if (values.length === headers.length) {
      const rowObj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        rowObj[h] = values[idx];
      });
      rows.push(rowObj);
    }
  }

  return rows;
}

export default function ProductImportPage() {
  const [rawCsvText, setRawCsvText] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    summary: {
      totalRows: number;
      validRows: number;
      invalidRows: number;
      duplicateSkus: number;
      missingCategories: number;
    };
    errors: Array<{ row: number; sku: string; field: string; message: string; value: any }>;
    validProducts: any[];
  } | null>(null);

  const [executionSummary, setExecutionSummary] = useState<{
    createdCount: number;
    failedCount: number;
  } | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "ramanayam_15_sample_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded sample 15-item Ramanayam product CSV.");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      setRawCsvText(content);
      setValidationResult(null);
      setExecutionSummary(null);
      showToast(`Loaded ${file.name} successfully.`);
    };
    reader.readAsText(file);
  };

  const handleDryRunValidate = async () => {
    const parsedRows = parseCsvText(rawCsvText);
    if (parsedRows.length === 0) {
      showToast("Please select or paste a valid CSV file first.");
      return;
    }

    setIsValidating(true);
    setExecutionSummary(null);
    try {
      const result = await ProductService.validateCsvImportApi(parsedRows);
      setValidationResult(result);
      showToast(`Validation complete: ${result.summary.validRows} valid, ${result.summary.invalidRows} issues.`);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to validate CSV.";
      showToast(`Error: ${errMsg}`);
    } finally {
      setIsValidating(false);
    }
  };

  const handleExecuteImport = async () => {
    if (!validationResult || validationResult.validProducts.length === 0) {
      showToast("No valid products ready to import.");
      return;
    }

    setIsExecuting(true);
    try {
      const res = await ProductService.executeCsvImportApi(validationResult.validProducts);
      setExecutionSummary(res);
      showToast(`Import successful! ${res.createdCount} products created in database.`);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to execute product import.";
      showToast(`Error: ${errMsg}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-stone-900 font-display">
              Bulk Product CSV Import
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Validate and batch-import Ramanayam product catalogue directly into PostgreSQL.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadSampleCsv}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-700" />
          <span>Download Sample 15-Item CSV</span>
        </button>
      </div>

      {/* Main Upload / Input Card */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-amber-600" />
          <h2 className="text-sm font-bold text-stone-900">Select or Paste CSV File</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-stone-50/50 hover:bg-amber-50/30 transition-colors">
            <Upload className="w-8 h-8 text-amber-600 mb-2" />
            <p className="text-xs font-bold text-stone-800">Upload CSV Document</p>
            <p className="text-[11px] text-stone-400 mt-1 mb-3">Supports .csv files up to 10MB</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="text-xs text-stone-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
              <span>Or Paste Raw CSV Data</span>
              <span className="text-[10px] text-stone-400">Headers: name, sku, category, price, stock...</span>
            </label>
            <textarea
              rows={6}
              value={rawCsvText}
              onChange={(e) => setRawCsvText(e.target.value)}
              placeholder="Paste raw CSV contents here..."
              className="w-full p-3 text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleDryRunValidate}
            disabled={isValidating || !rawCsvText.trim()}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            {isValidating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Validating CSV against DB...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Validate & Dry-Run CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dry-Run Validation Preview Cards & Metrics */}
      {validationResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
              <span className="text-xs font-semibold text-stone-500">Total Rows</span>
              <div className="text-2xl font-black text-stone-900 mt-1 font-display">
                {validationResult.summary.totalRows}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Valid Ready Rows
              </span>
              <div className="text-2xl font-black text-emerald-800 mt-1 font-display">
                {validationResult.summary.validRows}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-2xs">
              <span className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Invalid / Error Rows
              </span>
              <div className="text-2xl font-black text-rose-800 mt-1 font-display">
                {validationResult.summary.invalidRows}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-2xs">
              <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> Duplicate SKUs
              </span>
              <div className="text-2xl font-black text-amber-800 mt-1 font-display">
                {validationResult.summary.duplicateSkus}
              </div>
            </div>
          </div>

          {/* Validation Errors Breakdown Table */}
          {validationResult.errors.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
              <div className="p-4 bg-rose-50/50 border-b border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-bold">Validation Errors & Conflicts ({validationResult.errors.length})</span>
                </div>
                <span className="text-[11px] text-rose-600 font-semibold">Row issues must be resolved before import</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Row #</th>
                      <th className="py-2.5 px-4">SKU</th>
                      <th className="py-2.5 px-4">Field</th>
                      <th className="py-2.5 px-4">Issue Description</th>
                      <th className="py-2.5 px-4">Input Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {validationResult.errors.map((err, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-2.5 px-4 font-mono font-bold text-stone-900">{err.row}</td>
                        <td className="py-2.5 px-4 font-mono text-amber-800">{err.sku || "N/A"}</td>
                        <td className="py-2.5 px-4 font-semibold text-stone-800">{err.field}</td>
                        <td className="py-2.5 px-4 text-rose-700 font-medium">{err.message}</td>
                        <td className="py-2.5 px-4 font-mono text-stone-500 truncate max-w-[200px]">{String(err.value ?? "")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Execute CTA Bar */}
          <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-amber-900">
                Ready to Import {validationResult.validProducts.length} Valid Products into PostgreSQL
              </h3>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Executes in safe batched transactions (50 items per transaction) in CREATE ONLY mode.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExecuteImport}
              disabled={isExecuting || validationResult.validProducts.length === 0}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-extrabold shadow-md transition-colors cursor-pointer shrink-0"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Importing into Database...</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  <span>Execute PostgreSQL Import ({validationResult.validProducts.length} Products)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Execution Results Summary */}
      {executionSummary && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold">Import Execution Completed Successfully</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200">
              <span className="text-xs text-stone-500 font-semibold">Products Created in Database</span>
              <div className="text-xl font-black text-emerald-800 mt-0.5">{executionSummary.createdCount}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-stone-200">
              <span className="text-xs text-stone-500 font-semibold">Failed Items</span>
              <div className="text-xl font-black text-stone-800 mt-0.5">{executionSummary.failedCount}</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View Products Catalog</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
