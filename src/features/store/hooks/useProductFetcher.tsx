import { Product } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useEffect, useState } from "react";

export const useProductFetcher = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  const fetchProduct = async (filters: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    vendorId?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);

      // Clean up filters to avoid passing empty or undefined values
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axiosInstance.get(
        `/product?${queryParams.toString()}`
      );

      // Assuming the response includes the fields you need:
      const fetchedProducts = response.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        stockLevel: product.stockLevel,
        createdDate: product.createdDate,
      }));

      setProducts(fetchedProducts);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    fetchProduct,
  };
};
