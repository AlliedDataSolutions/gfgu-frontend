import { useEffect, useState } from "react";
import { Product } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";

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
      } else {
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
