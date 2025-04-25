import { useState, useEffect } from "react";
import axiosInstance from "../../../core/axiosInstance";
import { handleAxiosError } from "../../../lib/handleAxiosError";

interface DeliveryDay {
  id: string;
  city: string;
  deliveryday: string;
  time: string | null;
}

const useDeliveryDays = () => {
  const [data, setData] = useState<DeliveryDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/location");
      setData(response.data);
      setError(null);
    } catch (e: any) {
      handleAxiosError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteDeliveryDay = async (id: string) => {
    try {
      await axiosInstance.delete(`/admin/location/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (e: any) {
      handleAxiosError(e);
    } finally {
    }
  };

  const createDeliveryDay = async (city: string, deliveryday: string) => {
    try {
      const response = await axiosInstance.post("/admin/location", {
        city,
        deliveryday,
      });
      setData([...data, response.data.location]);
    } catch (e: any) {
      handleAxiosError(e);
    }
  };

  return {
    data,
    loading,
    error,
    deleteDeliveryDay,
    createDeliveryDay,
  };
};

export default useDeliveryDays;
