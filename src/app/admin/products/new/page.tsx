"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { productFormSchema, ProductFormValues } from "@/schemas/product.schema";
import { useCreateProductMutation } from "@/hooks/useProducts";
import { ProductImage, ProductVariant } from "@/components/admin/products/types/product.types";
import { GeneralCard } from "@/components/admin/products/components/editor/GeneralCard";
import { ImageUploader } from "@/components/admin/products/components/editor/ImageUploader";
import { PricingCard } from "@/components/admin/products/components/editor/PricingCard";
import { InventoryCard } from "@/components/admin/products/components/editor/InventoryCard";
import { VariantEditor } from "@/components/admin/products/components/editor/VariantEditor";
import { SEOCard } from "@/components/admin/products/components/editor/SEOCard";
import { VisibilityCard } from "@/components/admin/products/components/editor/VisibilityCard";

export default function AddProductPage() {
  const router = useRouter();
  const createMutation = useCreateProductMutation();
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [images, setImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: {
      name: "",
      slug: "",
      shortDesc: "",
      fullDesc: "",
      categoryId: "c20c95be-bd39-4ebd-bca4-e387a8c20bdb",
      category: "Puja Brassware",
      vendorId: "0b989d8b-454a-4325-b305-5f646d8260a1",
      vendor: "Moradabad Sacred Brass Guild",
      brand: "Ramanayam Heritage",
      price: 0,
      mrp: 0,
      costPrice: 0,
      gstRate: 12,
      sku: "",
      barcode: "",
      stock: 10,
      lowStockLimit: 10,
      status: "Active",
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: true,
      isTrending: false,
      seoTitle: "",
      seoDescription: "",
    },
  });

  const formData = watch();

  const handleFieldChange = (field: string, value: any) => {
    setValue(field as keyof ProductFormValues, value, { shouldValidate: true });
  };

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const onSubmit = (data: ProductFormValues, publish: boolean) => {
    const payload = {
      ...data,
      status: publish ? ("Active" as const) : ("Draft" as const),
      images,
      variants,
    };

    console.log("=== PRODUCT PUBLISH DEBUG ===");
    console.log("PAYLOAD:", JSON.stringify(payload, null, 2));

    createMutation.mutate(payload, {
      onSuccess: (createdProduct) => {
        showToast(`Product "${createdProduct.name}" ${publish ? "published" : "saved as draft"} successfully!`);
        setTimeout(() => router.push("/admin/products"), 1000);
      },
      onError: (err: any) => {
        const errorsArr = err?.response?.data?.errors;
        let errorDetail = err?.response?.data?.message || err?.message || "An unexpected error occurred.";
        if (Array.isArray(errorsArr) && errorsArr.length > 0) {
          errorDetail = errorsArr.map((e: any) => `${e.field}: ${e.message}`).join(" | ");
        }
        showToast(`Failed to publish product: ${errorDetail}`, "error");
      },
    });
  };

  const onSaveDraft = () => handleSubmit((data) => onSubmit(data, false))();
  const onPublish = () => handleSubmit((data) => onSubmit(data, true))();

  return (
    <div className="space-y-6 pb-24 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {toast.type === "error" && <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Top Navigation & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border border-black/10 hover:bg-[#FAF8F3] text-[#666666] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#7A1F1F]">Add New Product</h1>
            <p className="text-xs text-[#666666]">Create a new item in your Ramanayam temple catalog.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={createMutation.isPending}
            onClick={onSaveDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-black/10 bg-white text-[#171717] text-xs font-semibold rounded-xl hover:bg-[#FAF8F3] disabled:opacity-50 transition-colors"
          >
            {createMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-stone-500" />
            ) : (
              <Save className="w-4 h-4 text-[#999999]" />
            )}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={createMutation.isPending}
            onClick={onPublish}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#F57C00] text-white text-xs font-semibold rounded-xl hover:bg-[#E06D00] disabled:opacity-50 shadow-sm transition-colors"
          >
            {createMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>Publish Product</span>
          </button>
        </div>
      </div>

      {/* Validation Errors Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-600" /> Please fix the following errors before submitting:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            {Object.entries(errors).map(([field, err]) => (
              <li key={field}>
                <span className="capitalize">{field}</span>: {err?.message as string}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Editor Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Specs) */}
        <div className="lg:col-span-2 space-y-6">
          <GeneralCard formData={formData} onChange={handleFieldChange} />
          <ImageUploader images={images} onChange={setImages} />
          <PricingCard formData={formData} onChange={handleFieldChange} />
          <InventoryCard formData={formData} onChange={handleFieldChange} />
          <VariantEditor variants={variants} onChange={setVariants} />
          <SEOCard formData={formData} onChange={handleFieldChange} />
        </div>

        {/* Right Column (Publishing & Visibility) */}
        <div className="lg:col-span-1 space-y-6">
          <VisibilityCard formData={formData} onChange={handleFieldChange} />
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md border border-black/10 px-6 py-3.5 rounded-2xl shadow-xl flex items-center justify-between mt-8">
        <Link href="/admin/products" className="text-xs font-semibold text-[#666666] hover:text-[#171717]">
          Cancel
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={createMutation.isPending}
            onClick={onSaveDraft}
            className="px-4 py-2 border border-black/10 bg-white text-[#171717] text-xs font-semibold rounded-xl hover:bg-[#FAF8F3] disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={createMutation.isPending}
            onClick={onPublish}
            className="px-5 py-2 bg-[#F57C00] text-white text-xs font-semibold rounded-xl hover:bg-[#E06D00] disabled:opacity-50 shadow-sm flex items-center gap-2"
          >
            {createMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Publish Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}
