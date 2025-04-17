import { useState, useEffect } from 'react';
import axiosInstance from '@/core/axiosInstance';

interface Transaction {
    id: string;
    amount: string;
    type: string;
    adminId: string | null;
    participantType: string;
    orderLineId: string;
    createdAt: string;
    vendor: {
        id: string;
        businessName: string;
        businessDescription: string | null;
        status: string;
    };
}

interface TransactionResponse {
    transactions: Transaction[];
    count: number;
}

const useTransaction = (endpoint: string, skip: number = 0, take: number = 10) => {
    const [data, setData] = useState<Transaction[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get<TransactionResponse>(`${endpoint}?skip=${skip}&take=${take}`);
                setData(response.data.transactions);
                setCount(response.data.count);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, skip, take]);

    return { data, count, loading, error };
};

export default useTransaction;
