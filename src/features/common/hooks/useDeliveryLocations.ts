import { useState, useEffect } from "react";
import axiosInstance from "../../../core/axiosInstance";
import { handleAxiosError } from "../../../lib/handleAxiosError";

export interface DeliveryDay {
  location: string;
  dayOfWeek: string;
  timeOfDay?: string;
}

const useDeliveryLocations = () => {
  const [data, setData] = useState<DeliveryDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/location");
      const formattedData = response.data.map((item: any) => ({
        location: item.city,
        dayOfWeek: item.deliveryday,
        timeOfDay: item.time || undefined,
      }));
      setData(formattedData);
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

  return {
    data,
    loading,
    error,
  };
};

export default useDeliveryLocations;
