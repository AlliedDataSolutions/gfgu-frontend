import { Product,  } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
// import { useEffect, useState } from "react";


export const createProduct = async (productData: Partial<Product>) => {
    try {
    //   setLoading(true);
      const response = await axiosInstance.post("/product", productData);
      return response.data; // Returning data for handling success
    } catch (error) {
      handleAxiosError(error);
    } finally {
    //   setLoading(false);
    }
  };
  
/**
 * Update an existing product by ID
 */
  export const updateProduct = async (productId: string, productData: Partial<Product>) => {
    try {
      const response = await axiosInstance.put(`/product/${productId}`, productData);
      return response.data; // Returning updated product data
    } catch (error) {
      handleAxiosError(error);
    }
  };
  
  /**
   * Get product details by ID
   */
  export const getProductById = async (productId: string): Promise<Product | null> => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      return response.data; // Returning product details
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };