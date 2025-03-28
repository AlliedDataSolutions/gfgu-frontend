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

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    showAddressForm,
    toggleAddressForm,
    refetchAddresses: fetchAddresses,
  };
};

export default useAddress;
