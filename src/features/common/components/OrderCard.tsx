import { Link } from "react-router-dom";

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
    <div className="border rounded-md shadow-sm bg-white mb-6">
      {/* Top grey section */}
      <div className="bg-neutral-100 px-6 py-3 flex flex-wrap justify-between items-start text-sm text-neutral-600">
        <div className="flex flex-col">
          <span className="font-medium text-neutral-500">ORDER PLACED</span>
          <span>{orderDate}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-neutral-500">TOTAL</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-neutral-500">SHIP TO</span>
          <span>{shipTo}</span>
        </div>

        <div className="flex flex-col text-right ml-auto">
          <span className="font-medium text-neutral-500">
            ORDER # {orderId.slice(-10)}
          </span>
          <Link
            to={`/invoice/${orderId}`}
            className="text-blue-600 hover:underline"
          >
            Invoice
          </Link>
        </div>
      </div>

      {/* Items list */}
      <div className="divide-y divide-neutral-200">
        {items.map((item) => (
          <div key={item.productId} className="flex p-6 gap-6 items-start">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-32 h-32 object-cover rounded"
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
