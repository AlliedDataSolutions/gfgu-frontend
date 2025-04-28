import { useState, useEffect } from "react";
import axiosInstance from "../../../core/axiosInstance";
import { Address } from "@/core/Address";
import { AddressType } from "@/core/AddressType";
import { handleAxiosError } from "@/lib/handleAxiosError";

const useAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get<Address[]>("/address");
      const addressesWithEnumType = response.data.map((address) => ({
        ...address,
        addressType: address.addressType as AddressType,
      }));
      setAddresses(addressesWithEnumType);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (addressData: Partial<Address>) => {
    try {
      const response = await axiosInstance.post<Address>("/address", addressData);
      setAddresses((prev) => [...prev, response.data]);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const updateAddress = async (id: string, addressData: Partial<Address>) => {
    try {
      const response = await axiosInstance.put<Address>(`/address/${id}`, addressData);
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === id ? response.data : addr))
      );
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const removeAddress = async (id: string) => {
    try {
      await axiosInstance.delete(`/address/${id}`);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    showAddressForm,
    toggleAddressForm,
    refetchAddresses: fetchAddresses,
    addAddress,
    updateAddress,
    removeAddress,
  };
};

export default useAddress;
