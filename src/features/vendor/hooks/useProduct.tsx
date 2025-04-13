import { Product,  } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useEffect, useState } from "react";

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

    // Delete function
  export const deleteProduct = async (productId: string) => {
    try {
      const response = await axiosInstance.delete(`/product/${productId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  export const useProductFilter = (
    category: string | undefined,
    vendorId: string | undefined,
    page: number,
    limit: number,
    minPrice: number,
    maxPrice: number
  ) => {
    const [filterProducts, setProductFilterDetails] = useState<{
      records: Product[];
      count: number;
    }>({ records: [], count: 0 });
  
    useEffect(() => {
      fetchProductByFilter();
    }, [category, vendorId, page, limit, minPrice, maxPrice]);
  
    const fetchProductByFilter = async () => {
      try {
      // setLoading(true);
      var url = `/product?limit=${limit}&page=${page}&${
        minPrice ? `minPrice=${minPrice}&` : ""
      }${maxPrice ? `maxPrice=${maxPrice}&` : ""}`;
      if (category) {
        url = url + `&category=${category}`;
      }
      if (vendorId) {
        url = url + `&vendorId=${vendorId}`;
      } 
      else {
        const storage = localStorage.getItem("vendorId")
        if (storage) {
          url = url + `&vendorId=${storage}`;
        }
      }  
        const reponse = await axiosInstance.get(url);
  
        setProductFilterDetails(reponse.data);
      } catch (error) {
        handleAxiosError(error);
      } finally {
        // setLoading(false);
      }
    };
  
    return {
      filterProducts,
    };
  };