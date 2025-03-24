import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/core/axiosInstance";
import { paths } from "@/config/paths";
import VendorOrderTable, { VendorOrder } from "./VendorOrderTable";

const MAX_RECENT = 4; // Display 3-4 recent orders

export default function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/order/vendor/orderline/", {
        withCredentials: true,
      });
      // Assume the backend returns an array of VendorOrder
      setRecentOrders(res.data.slice(0, MAX_RECENT));
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
      {/* Header row with title and show all button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <button
          onClick={handleShowAll}
          className="text-sm underline hover:text-blue-600"
        >
          Show all
        </button>
      </div>
      {/* Reuse the VendorOrderTable component for consistent layout.
          Pagination props are omitted so all recent orders appear on one page. */}
      <VendorOrderTable orders={recentOrders} />
    </div>
  );
}
