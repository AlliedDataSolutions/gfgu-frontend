import { Product, ProductCategory, Vendor } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useEffect, useState } from "react";

export const useStore = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<{records: Product[], count: number}>({records: [], count: 0});
  const [popularProducts, setPopularProducts] = useState<{records: Product[], count: number}>({records: [], count: 0});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchPopularProduct();
    fetchVendors() ;
  }, []);

  // category endpoint not fully functional
  const fetchCategories = () => {
    setLoading(true);
    axiosInstance
      .get("/product/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        handleAxiosError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // vendor endpoint not fully functional
  const fetchVendors = () => {
    setLoading(true);
    axiosInstance
      .get("/product/vendors")
      .then((res) => {
        setVendors(res.data);
      })
      .catch((err) => {
        handleAxiosError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPopularProduct = async () => {
    await axiosInstance
      .get("/product?limit=8")
      .then((res) => {
        setPopularProducts(res.data);
      })
      .catch((err) => {
        handleAxiosError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // can be call like this
  //fetchProduct({});
  //fetchProduct({ search: "beans" });
  //fetchProduct({ vendorId: "12345", page: 2, limit: 10 });
  const fetchProduct = async (filters: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    vendorId?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);

      // Remove undefined or empty values from filters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axiosInstance.get(
        `/product?${queryParams.toString()}`
      );
      setProducts(response.data);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    categories,
    vendors,
    popularProducts,
    products,
    fetchProduct,
  };
};
