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
      let url = `/product?limit=${limit}&page=${page}&${
        minPrice ? `minPrice=${minPrice}&` : ""
      }${maxPrice ? `maxPrice=${maxPrice}&` : ""}`;
      if (category) {
        url = url + `&category=${category}`;
      }
      if (vendorId) {
        url = url + `&vendor=${vendorId}`;
      }

      const reponse = await axiosInstance.get(url);
      console.log(reponse);

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
