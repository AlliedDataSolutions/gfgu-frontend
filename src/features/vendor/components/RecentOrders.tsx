import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/core/axiosInstance";
import { paths } from "@/config/paths";

// We'll show only a small subset of orders (e.g., 5).
const MAX_RECENT = 5;

interface RecentOrder {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    images?: any[];
  };
  quantity: number;
  unitPrice: number;
  status: string;
  totalAmount: number;
}

export default function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/order/vendor/orderline/");
      // This returns an array of order lines. We'll just take the first 5 as 'recent'.
      const data: RecentOrder[] = res.data;
      setRecentOrders(data.slice(0, MAX_RECENT));
    } catch (error) {
      console.error("Error fetching recent orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const handleShowAll = () => {
    navigate(paths.vendor.orders.path); 
    // Adjust if your full orders page route differs
  };

  if (loading) {
    return <p>Loading recent orders...</p>;
  }

  if (recentOrders.length === 0) {
    return (
      <div className="bg-white border border-neutral-50 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <p>No recent orders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-50 rounded-lg p-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <button
          onClick={handleShowAll}
          className="text-sm underline hover:text-blue-600"
        >
          Show all
        </button>
      </div>

      {/* Table header */}
      <div className="hidden md:flex font-semibold bg-neutral-50 border-b border-neutral-200">
        <div className="px-3 py-2 w-40">Order</div>
        <div className="px-3 py-2 w-52">Product</div>
        <div className="px-3 py-2 w-20">Qty</div>
        <div className="px-3 py-2 w-44">Amount</div>
        <div className="px-3 py-2 w-28">Status</div>
      </div>

      {/* Rows */}
      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 py-2"
        >
          <div className="px-3 w-40">
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="px-3 w-52">{order.product.name}</div>
          <div className="px-3 w-20">{order.quantity}</div>
          <div className="px-3 w-44">${order.totalAmount.toFixed(2)}</div>
          <div className="px-3 w-28">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                order.status === "pending"
                  ? "bg-rose-50 text-rose-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
