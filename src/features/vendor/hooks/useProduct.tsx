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
  