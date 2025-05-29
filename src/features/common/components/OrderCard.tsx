import { baseURL } from "@/core/axiosInstance";

interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string;
}

interface OrderCardProps {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  shipTo: string;
  items: OrderItem[];
}

export default function OrderCard({
  orderId,
  orderDate,
  totalAmount,
  shipTo,
  items,
}: OrderCardProps) {
  return (
    <div className="border rounded-md shadow-md bg-white mb-6 max-w-screen-md mx-auto">
      {/* Top grey header */}
      <div className="bg-neutral-100 px-4 py-2 flex flex-wrap md:flex-nowrap justify-between items-end text-sm text-neutral-700 gap-3">
        <div className="flex-1 min-w-[80px]">
          <span className="block text-[10px] font-semibold text-neutral-600 uppercase mb-[2px]">
            Order Placed
          </span>
          <span className="block text-xs">{orderDate}</span>
        </div>

        <div className="flex-1 min-w-[80px]">
          <span className="block text-[10px] font-semibold text-neutral-600 uppercase mb-[2px]">
            Total
          </span>
          <span className="block text-xs">${totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex-1 min-w-[80px]">
          <span className="block text-[10px] font-semibold text-neutral-600 uppercase mb-[2px]">
            Ship To
          </span>
          <span className="block text-xs">{shipTo}</span>
        </div>

        <div className="flex flex-col text-right min-w-[160px] ml-auto">
          <span className="text-[10px] font-semibold text-neutral-600 uppercase mb-[2px]">
            Order # {orderId.slice(-10)}
          </span>
          <a
            href={`${baseURL}/order/${orderId}/invoice`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            Invoice
          </a>


        </div>
      </div>

      {/* Ordered items */}
      <div className="divide-y divide-neutral-200">
        {items.map((item) => (
          <div key={item.productId} className="flex px-4 py-3 gap-4 items-start">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
