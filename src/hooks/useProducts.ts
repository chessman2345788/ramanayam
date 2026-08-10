import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService, FetchProductsResponse } from "@/services/product.service";
import type { Product } from "@/components/admin/products/types/product.types";
import { eventBus } from "@/services/event-bus.service";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  list: (params: Record<string, any>) => ["products", "list", params] as const,
  detail: (id: string) => ["products", "detail", id] as const,
};

// GET Products List Hook
export function useProductsQuery(params: Record<string, any>) {
  return useQuery<FetchProductsResponse>({
    queryKey: productKeys.list(params),
    queryFn: () => ProductService.fetchProductsFromApi(params),
    placeholderData: (previousData) => previousData,
  });
}

// GET Product Details Hook
export function useProductDetailsQuery(id: string) {
  return useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: () => ProductService.fetchProductByIdFromApi(id),
    enabled: Boolean(id),
  });
}

// POST Product Mutation Hook
export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProductData: any) => ProductService.createProductFromApi(newProductData),
    onSuccess: (createdProduct) => {
      eventBus.emit("PRODUCT_ADDED", createdProduct);
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

// PUT Product Mutation Hook with Optimistic Update
export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ProductService.updateProductFromApi(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });

      const previousQueries = queryClient.getQueriesData<FetchProductsResponse>({ queryKey: productKeys.all });

      // Optimistically update list queries
      queryClient.setQueriesData<FetchProductsResponse>({ queryKey: productKeys.all }, (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
        };
      });

      return { previousQueries };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSuccess: (updatedProduct) => {
      eventBus.emit("PRODUCT_UPDATED", updatedProduct);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

// DELETE Product Mutation Hook with Optimistic Update
export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductService.deleteProductFromApi(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });

      const previousQueries = queryClient.getQueriesData<FetchProductsResponse>({ queryKey: productKeys.all });

      queryClient.setQueriesData<FetchProductsResponse>({ queryKey: productKeys.all }, (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.filter((p) => p.id !== id),
          pagination: {
            ...old.pagination,
            total: Math.max(0, old.pagination.total - 1),
          },
        };
      });

      return { previousQueries };
    },
    onError: (_err, _id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSuccess: (_res, id) => {
      eventBus.emit("PRODUCT_DELETED", { id });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

// Bulk Delete Mutation Hook with Optimistic Update
export function useBulkDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => ProductService.bulkDeleteProductsFromApi(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });

      const previousQueries = queryClient.getQueriesData<FetchProductsResponse>({ queryKey: productKeys.all });

      queryClient.setQueriesData<FetchProductsResponse>({ queryKey: productKeys.all }, (old) => {
        if (!old) return old;
        const idSet = new Set(ids);
        return {
          ...old,
          products: old.products.filter((p) => !idSet.has(p.id)),
          pagination: {
            ...old.pagination,
            total: Math.max(0, old.pagination.total - ids.length),
          },
        };
      });

      return { previousQueries };
    },
    onError: (_err, _ids, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

// Bulk Publish Mutation Hook with Optimistic Update
export function useBulkPublishMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => ProductService.bulkPublishProductsFromApi(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });

      const previousQueries = queryClient.getQueriesData<FetchProductsResponse>({ queryKey: productKeys.all });
      const idSet = new Set(ids);

      queryClient.setQueriesData<FetchProductsResponse>({ queryKey: productKeys.all }, (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.map((p) => (idSet.has(p.id) ? { ...p, status: "Active" } : p)),
        };
      });

      return { previousQueries };
    },
    onError: (_err, _ids, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

// Bulk Archive Mutation Hook with Optimistic Update
export function useBulkArchiveMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => ProductService.bulkArchiveProductsFromApi(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });

      const previousQueries = queryClient.getQueriesData<FetchProductsResponse>({ queryKey: productKeys.all });
      const idSet = new Set(ids);

      queryClient.setQueriesData<FetchProductsResponse>({ queryKey: productKeys.all }, (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.map((p) => (idSet.has(p.id) ? { ...p, status: "Archived" } : p)),
        };
      });

      return { previousQueries };
    },
    onError: (_err, _ids, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
