import { useEffect, useState } from "react";
import { Product } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";


export const useProductDetails = (id: string | undefined) => {
  const [
    productDetails,
    setProductDetails
  ] = useState<Product>();

  useEffect(() => {
    if (!id) return;
    fetchProductById();
  }, [id]);


  const fetchProductById = async () => {
    try {
      // setLoading(true);
      const reponse = await axiosInstance.get(`/product/${id}`);
      console.log(reponse);

      setProductDetails(reponse.data);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      // setLoading(false);
    }
  };

  return {
    productDetails,
  };
};
