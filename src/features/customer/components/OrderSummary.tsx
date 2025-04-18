import { Order } from "@/core/order";

interface OrderSummaryProps {
  order: Order | undefined;
  totalAmount: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  totalAmount,
}) => {
  return (
    <div className="w-full md:w-[350px] lg:w-[400px] space-y-4">
      <div className="bg-neutral-50 p-4 md:p-6 rounded-md">
        <h2 className="text-lg text-brand-900 mb-4">Your Order</h2>
        {order?.orderLines.map((orderLine) => (
          <div
            key={orderLine.id}
            className="flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              {orderLine.product.images[0]?.url ? (
                <img
                  src={orderLine.product.images[0].url}
                  alt={orderLine.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-neutral-300 rounded" />
              )}
              <p>
                {orderLine.product.name} x {orderLine.quantity}
              </p>
            </div>
            <p>
              ${(Number(orderLine.unitPrice) * orderLine.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between py-1 text-sm">
          <span>Subtotal:</span>
          <span>${totalAmount}</span>
        </div>
        <div className="flex justify-between py-1  text-sm">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-medium  text-sm">
          <span>Total:</span>
          <span>${totalAmount}</span>
        </div>
      </div>
    </div>
  );
};
