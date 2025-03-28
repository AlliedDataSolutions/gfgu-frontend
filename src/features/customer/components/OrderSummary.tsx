import { OrderLine } from "@/core/order";
import { useCartContext } from "@/features/store/hooks/CartContext";

const total = (orderLines?: OrderLine[]) => {
  return orderLines
    ?.reduce(
      (sum, orderLine) =>
        sum + Number(orderLine.unitPrice) * orderLine.quantity,
      0
    )
    .toFixed(2);
};

export const OrderSummary = () => {
  const { order } = useCartContext();
  return (
    <div className="w-full md:w-[350px] lg:w-[400px] space-y-4">
      <div className="bg-neutral-50 p-4 md:p-6 rounded-md">
        <h2 className="text-xl font-medium text-brand-900 mb-4">Your Order</h2>
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
          <span>${total(order?.orderLines)}</span>
        </div>
        <div className="flex justify-between py-1  text-sm">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-medium  text-sm">
          <span>Total:</span>
          <span>${total(order?.orderLines)}</span>
        </div>
      </div>
    </div>
  );
};
