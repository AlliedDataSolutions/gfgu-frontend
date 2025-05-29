import { useEffect, useState } from "react";
import axiosInstance from "@/core/axiosInstance";
import OrderCard from "@/features/common/components/OrderCard";

interface RawOrderLine {
  id: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  product?: {
    id: string;
    name: string;
    images?: { url: string }[];
  };
  order: {
    id: string;
    orderDate?: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

export function VendorOrders() {
  const [orders, setOrders] = useState<RawOrderLine[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosInstance.get("/order/vendor/orderline");
      console.log("Vendor OrderLine Response:", res.data);
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const grouped = orders.reduce((acc: Record<string, RawOrderLine[]>, item) => {
    const orderId = item.order?.id;
    if (!orderId) return acc;
    if (!acc[orderId]) acc[orderId] = [];
    acc[orderId].push(item);
    return acc;
  }, {});

  const groupedEntries = Object.entries(grouped);

  if (groupedEntries.length === 0) {
    return <p className="text-center text-neutral-500 mt-10">No vendor orders found.</p>;
  }

  return (
    <div className="p-4">
      {groupedEntries.map(([orderId, lines]) => {
        const firstLine = lines[0];
        if (!firstLine) return null;

        const orderDate = firstLine.order?.orderDate
          ? new Date(firstLine.order.orderDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "-";

        const shipTo = firstLine.order?.user
          ? `${firstLine.order.user.firstName} ${firstLine.order.user.lastName}`
          : "-";

        const totalAmount = lines.reduce((sum, l) => sum + l.totalAmount, 0);

        const items = lines.map((line) => ({
          productId: line.product?.id ?? "",
          name: line.product?.name ?? "Unknown product",
          imageUrl: line.product?.images?.[0]?.url ?? "",
        }));

        return (
          <OrderCard
            key={orderId}
            orderId={orderId}
            orderDate={orderDate}
            totalAmount={totalAmount}
            shipTo={shipTo}
            items={items}
          />
        );
      })}
    </div>
  );
}
