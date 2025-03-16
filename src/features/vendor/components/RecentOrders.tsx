
import { useEffect, useState } from "react";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useAuth } from "@/features/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";

interface Order {
  id: string;
  orderNumber: string;
  product: string;
  quantity: number;
  orderDate: string;
  amount: number;
  status: string;
}

export default function RecentOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  const fetchRecentOrders = async () => {
    setError("");
    try {
      // Call your backend endpoint to fetch recent orders (for vendor)
      const response = await axiosInstance.get(`/order/${user?.id}`, {
        params: {
          vendorId: user?.id,
          limit: 5,
          page: 1,
        },
      });
      setOrders(response.data.records);
    } catch (err) {
      handleAxiosError(err);
      setError("Failed to fetch recent orders.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecentOrders();
    }
  }, [user]);

  return (
    <div className="p-6 border border-neutral-50 rounded-lg bg-white space-y-6">
      <div className="flex flex-row items-center justify-between">
        <span className="text-xl font-semibold text-black">Recent Orders</span>
        <Button variant="link">
          <Link to={paths.vendor.orders.getHref()}>Show all</Link>
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
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
                  No recent orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
