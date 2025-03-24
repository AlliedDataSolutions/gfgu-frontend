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
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (data: { selected: number }) => void;
}

export default function VendorOrderTable({
  orders,
  pageCount,
  currentPage,
  onPageChange,
}: VendorOrderTableProps) {
  if (orders.length === 0) {
    return <p className="mt-4 text-center">No orders found.</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "pending"
                        ? "bg-rose-50 text-rose-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageCount && currentPage !== undefined && onPageChange && (
        <div className="mt-4">
          
      {/* Pagination */}
      <Pagination pageCount={pageCount} handlePageClick={onPageChange} />
    </div>
      )}
    </div>
  );



}
