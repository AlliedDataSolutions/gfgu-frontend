import { useEffect, useState } from "react";
import { Product } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";


export const useProductDetails = (id: string | undefined) => {
  const [
    productDetails,
    setProductDetails
  ] = useState<Product>();

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchProductById();
  }, [id]);


  const fetchProductById = async () => {
    try {
      // setLoading(true);
      const reponse = await axiosInstance.get(`/product/${id}`);
      console.log(reponse);
      const product: Product = reponse.data
      setProductDetails(product);
      setSelectedImage(product?.images[0]?.url ?? "");
    } catch (error) {
      handleAxiosError(error);
    } finally {
      // setLoading(false);
    }
  };

  return {
    selectedImage,
    productDetails,
    setSelectedImage
  };
};
