import { useEffect, useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useAuth } from "@/features/context/AuthContext";
import ErrorMessage from "@/components/ui/errormessage";

interface Order {
  id: string;
  orderNumber: string;
  product: string;
  quantity: number;
  orderDate: string;
  amount: number;
  status: string;
}

export function VendorOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState("");

  const fetchOrders = async (vendorID: string, pageNumber: number) => {
    setError("");
    try {
        const response = await axiosInstance.get("/order", {
        params: {
          vendorId: vendorID,
          page: pageNumber + 1, // assuming backend pages are 1-indexed
          limit: 10,
        },
      });
      setOrders(response.data.records);
      setPageCount(Math.ceil(response.data.count / 10));
    } catch (err) {
      handleAxiosError(err);
      setError("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    if (user && user.vendor && user.vendor.id) {
        fetchOrders(user.vendor.id, page);
    }
  }, [user, page]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-screen-xl mx-auto px-4 pt-12 pb-8">
        {error && <ErrorMessage message={error} />}
        <h1 className="text-2xl font-semibold text-black mb-6">All Orders</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="border-b border-neutral-200">
              <tr className="text-sm font-semibold text-gray-600">
                <th className="text-left p-2">Order #</th>
                <th className="text-left p-2">Product</th>
                <th className="text-center p-2">Qty</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-left p-2">Date</th>
                <th className="text-center p-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((order) => (
                <tr key={order.id} className="text-sm text-gray-800">
                  <td className="p-2">{order.orderNumber}</td>
                  <td className="p-2">{order.product}</td>
                  <td className="p-2 text-center">{order.quantity}</td>
                  <td className="p-2 text-right">${order.amount.toFixed(2)}</td>
                  <td className="p-2">{order.orderDate}</td>
                  <td className="p-2 text-center">{order.status}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td className="p-2" colSpan={6}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          pageCount={pageCount}
          handlePageClick={({ selected }) => setPage(selected)}
        />
      </div>
    </div>
  );
}
