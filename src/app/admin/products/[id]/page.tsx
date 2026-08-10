"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Trash2, Loader2, AlertCircle } from "lucide-react";
import { productFormSchema, ProductFormValues } from "@/schemas/product.schema";
import { useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation } from "@/hooks/useProducts";
import { ProductImage, ProductVariant } from "@/components/admin/products/types/product.types";
import { GeneralCard } from "@/components/admin/products/components/editor/GeneralCard";
import { ImageUploader } from "@/components/admin/products/components/editor/ImageUploader";
import { PricingCard } from "@/components/admin/products/components/editor/PricingCard";
import { InventoryCard } from "@/components/admin/products/components/editor/InventoryCard";
import { VariantEditor } from "@/components/admin/products/components/editor/VariantEditor";
import { SEOCard } from "@/components/admin/products/components/editor/SEOCard";
import { VisibilityCard } from "@/components/admin/products/components/editor/VisibilityCard";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = (params?.id as string) || "";

  const { data: existingProduct, isLoading, isError, error } = useProductDetailsQuery(productId);
  const updateMutation = useUpdateProductMutation();
  const deleteMutation = useDeleteProductMutation();

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as any,
  });

  const formData = watch();

  useEffect(() => {
    if (existingProduct) {
      reset({
        name: existingProduct.name || "",
        slug: existingProduct.slug || "",
        shortDesc: existingProduct.shortDesc || "",
        fullDesc: existingProduct.fullDesc || "",
        category: existingProduct.category || "Puja Essentials",
        brand: existingProduct.brand || "Ramanayam Heritage",
        vendor: existingProduct.vendor || "Varanasi Guild",
        price: existingProduct.price || 0,
        mrp: existingProduct.mrp || 0,
        costPrice: existingProduct.costPrice || 0,
        gstRate: existingProduct.gstRate || 12,
        sku: existingProduct.sku || "",
        barcode: existingProduct.barcode || "",
        stock: existingProduct.stock || 0,
        lowStockLimit: existingProduct.lowStockLimit || 5,
        status: existingProduct.status || "Active",
        isFeatured: existingProduct.isFeatured || false,
        isBestSeller: existingProduct.isBestSeller || false,
        isNewArrival: existingProduct.isNewArrival || false,
        isTrending: existingProduct.isTrending || false,
        seoTitle: existingProduct.seoTitle || "",
        seoDescription: existingProduct.seoDescription || "",
      });
      if (existingProduct.images) setImages(existingProduct.images);
      if (existingProduct.variants) setVariants(existingProduct.variants);
    }
  }, [existingProduct, reset]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const handleFieldChange = (field: string, value: any) => {
    setValue(field as keyof ProductFormValues, value, { shouldValidate: true });
  };

  const onSubmit = (data: ProductFormValues) => {
    updateMutation.mutate(
      { id: productId, data: { ...data, images, variants } },
      {
        onSuccess: (updated) => {
          showToast(`Product "${updated.name}" updated successfully!`);
          setTimeout(() => router.push("/admin/products"), 1000);
        },
        onError: (err: any) => {
          showToast(err.message || "Failed to update product.", "error");
        },
      }
    );
  };

  const onSave = () => handleSubmit(onSubmit)();

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete "${formData.name || 'this product'}"?`)) return;
    deleteMutation.mutate(productId, {
      onSuccess: () => {
        showToast("Product deleted successfully.");
        setTimeout(() => router.push("/admin/products"), 500);
      },
      onError: (err: any) => {
        showToast(err.message || "Failed to delete product.", "error");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center max-w-5xl mx-auto my-12">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
        <p className="text-sm font-semibold text-stone-700">Loading product details from backend...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-12 text-center text-red-800 max-w-5xl mx-auto my-12">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
        <p className="text-sm font-bold">Failed to load product details</p>
        <p className="text-xs text-red-600 mt-1">{(error as any)?.message || "Product not found"}</p>
        <Link href="/admin/products" className="inline-block mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 max-w-5xl mx-auto">
      {/* Toast Banner */}
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

      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border border-black/10 hover:bg-[#FAF8F3] text-[#666666] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-bold text-[#7A1F1F]">Edit Product</h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-black/5 rounded-md text-[#666666]">
                {formData.sku || existingProduct?.sku}
              </span>
            </div>
            <p className="text-xs text-[#666666] mt-0.5">
              Update pricing, inventory, variants, and SEO configuration.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className="p-2 border border-red-200 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 disabled:opacity-50 transition-colors"
            title="Delete Product"
          >
            {deleteMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            disabled={updateMutation.isPending}
            onClick={onSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#F57C00] text-white text-xs font-semibold rounded-xl hover:bg-[#E06D00] disabled:opacity-50 shadow-sm transition-colors"
          >
            {updateMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Validation Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-600" /> Please fix validation errors before saving:
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

      {/* Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GeneralCard formData={formData} onChange={handleFieldChange} />
          <ImageUploader images={images} onChange={setImages} />
          <PricingCard formData={formData} onChange={handleFieldChange} />
          <InventoryCard formData={formData} onChange={handleFieldChange} />
          <VariantEditor variants={variants} onChange={setVariants} />
          <SEOCard formData={formData} onChange={handleFieldChange} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <VisibilityCard formData={formData} onChange={handleFieldChange} />
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md border border-black/10 px-6 py-3.5 rounded-2xl shadow-xl flex items-center justify-between mt-8">
        <Link href="/admin/products" className="text-xs font-semibold text-[#666666] hover:text-[#171717]">
          Cancel
        </Link>
        <button
          type="button"
          disabled={updateMutation.isPending}
          onClick={onSave}
          className="px-5 py-2 bg-[#F57C00] text-white text-xs font-semibold rounded-xl hover:bg-[#E06D00] disabled:opacity-50 shadow-sm flex items-center gap-2"
        >
          {updateMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
