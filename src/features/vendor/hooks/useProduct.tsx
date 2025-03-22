import { Product,  } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";

export const createProduct = async (productData: Partial<Product>) => {
    try {
      const response = await axiosInstance.post("/product", productData);
      return response.data; 
    } catch (error) {
      handleAxiosError(error);
    } finally {
 
    }
  };

  export const updateProduct = async (productId: string, productData: Partial<Product>) => {
    try {
      const response = await axiosInstance.put(`/product/${productId}`, productData);
      return response.data; // Returning updated product data
    } catch (error) {
      handleAxiosError(error);
    }
  };

  export const getProductById = async (productId: string): Promise<Product | null> => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      return response.data; // Returning product details
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };