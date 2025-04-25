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
  const [gridApi, setGridApi] = useState<any>(null);

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
      if (gridApi) {
        gridApi.applyTransaction({ remove: [{ id: id }] });
      }
      fetchData();
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

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  return {
    data,
    loading,
    error,
    deleteDeliveryDay,
    createDeliveryDay,
    onGridReady,
  };
};

export default useDeliveryDays;
