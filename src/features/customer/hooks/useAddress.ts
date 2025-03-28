import { useState, useEffect } from 'react';
import axiosInstance from '../../../core/axiosInstance';

interface Address {
    id: string;
    addressType: string;
    streetName: string;
    town: string;
    province: string;
    postalCode: string;
    createdDate: string;
    modifiedDate: string;
}

const useAddress = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const toggleAddressForm = () => {
        setShowAddressForm(!showAddressForm);
    };

    const fetchAddresses = async () => {
        try {
            const response = await axiosInstance.get<Address[]>('/address');
            setAddresses(response.data);
        } catch (error: any) {
            setError(error.message || 'Failed to fetch addresses');
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
        error,
        showAddressForm,
        toggleAddressForm,
        refetchAddresses: fetchAddresses
    };
};

export default useAddress;
