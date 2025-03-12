import { useEffect, useState } from "react";
import { Product } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";

export const useRelatedProduct = (type: string | undefined) => {
  const [
    realtedProducts,
    setRelatedProductDetails
  ] = useState<Product[]>([]);

  useEffect(() => {
    if (!type) return;
    fetchProductByCategory();
  }, [type]);

  const fetchProductByCategory = async () => {
    try {
      // setLoading(true);
      const reponse = await axiosInstance.get(`/product?limit=4&category=${type}`);
      console.log(reponse);

      setRelatedProductDetails(reponse.data);
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
