import { Pagination } from "@/components/ui/pagination";

export interface VendorOrder {
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
  orderDate?: string;
}

interface VendorOrderTableProps {
  orders: VendorOrder[];
  pageCount: number;
  currentPage: number;
  onPageChange: (data: { selected: number }) => void;
}

export default function VendorOrderTable({
  orders,
  pageCount,
  currentPage,
  onPageChange,
}: VendorOrderTableProps) {
  if (orders.length === 0) {
    return <p className="mt-4 text-sm text-neutral-600">No orders found.</p>;
  }

  return (
    <div className="mt-4">
      {/* Table header */}
      <div className="hidden md:flex bg-neutral-50 border-b border-neutral-200">
        <div className="px-3 py-2 w-40 text-sm text-neutral-600">Order</div>
        <div className="px-3 py-2 w-52 text-sm text-neutral-600">Product</div>
        <div className="px-3 py-2 w-20 text-sm text-neutral-600">Qty</div>
        <div className="px-3 py-2 w-44 text-sm text-neutral-600">Date</div>
        <div className="px-3 py-2 w-28 text-sm text-neutral-600">Amount</div>
        <div className="px-3 py-2 w-28 text-sm text-neutral-600">Status</div>
      </div>
      {/* Table rows */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 py-2"
        >
          <div className="px-3 w-40 text-sm text-neutral-600">{order.id}</div>
          <div className="px-3 w-52 text-sm text-neutral-600">{order.product.name}</div>
          <div className="px-3 w-20 text-sm text-neutral-600">{order.quantity}</div>
          <div className="px-3 w-44 text-sm text-neutral-600">{order.orderDate || "N/A"}</div>
          <div className="px-3 w-28 text-sm text-neutral-600">${order.totalAmount.toFixed(2)}</div>
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
      <Pagination pageCount={pageCount} handlePageClick={onPageChange} />
    </div>
  );
}
