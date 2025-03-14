import { useEffect, useState } from "react";
import { Product } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";

export const useRelatedProduct = (
  type: string | undefined,
  selectedProductId: string | undefined
) => {
  const [realtedProducts, setRelatedProductDetails] = useState<Product[]>([]);

  useEffect(() => {
    if (!type) return;
    fetchProductByCategory();
  }, [type]);

  const fetchProductByCategory = async () => {
    try {
      // setLoading(true);
      const reponse = await axiosInstance.get(
        `/product?limit=4&category=${type}`
      );
      console.log(reponse);
      const related: Product[] = reponse.data.records;

      setRelatedProductDetails(
        related.filter((product) => {
          product.id !== selectedProductId;
        })
      );
    } catch (error) {
      handleAxiosError(error);
    } finally {
      // setLoading(false);
    }
  };

  return {
    realtedProducts,
  };
};
