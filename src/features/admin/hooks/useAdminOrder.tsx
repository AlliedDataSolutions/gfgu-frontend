import { useState, useEffect } from "react";
import { format } from "date-fns";
import axiosInstance from "@/core/axiosInstance";

interface FilterOrders {
  page: number;
  limit: number;
  productName?: string;
  productDescription?: string;
  vendorId?: string;
  orderDate?: Date;
}

const useAdminOrder = (filters: FilterOrders) => {
  const [allOrdersData, setAllOrdersData] = useState<any>({
    records: [],
    count: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orderDateStr = filters.orderDate
          ? format(filters.orderDate, "yyyy-MM-dd")
          : undefined;

        let url = `/admin/all-orders?page=${filters.page}&limit=${filters.limit}`;
        if (filters.productName) {
          url += `&productName=${filters.productName}`;
        }
        if (filters.productDescription) {
          url += `&productDescription=${filters.productDescription}`;
        }
        if (filters.vendorId) {
          url += `&vendorId=${filters.vendorId}`;
        }
        if (orderDateStr) {
          url += `&orderDate=${orderDateStr}`;
        }

        const response = await axiosInstance.get(url);
        setAllOrdersData(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filters]);

  return {
    allOrdersData,
    loading,
    setAllOrdersData,
    setLoading,
  };
};

export default useAdminOrder;
