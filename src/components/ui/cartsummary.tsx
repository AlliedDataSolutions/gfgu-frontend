import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  onclearCart: () => void;
}

export function CartSummary({
  subtotal,
  shipping,
  total,
  onCheckout,
  onclearCart,
}: CartSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-4lg border rounded-lg p-6 space-y-4"> {/* Set max width */}
      <h2 className="font-semibold text-lg mb-4">Cart Total</h2>

      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>

      <div className="flex justify-between py-2 font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Proceed to Checkout Button */}
      <Button
        className="w-full bg-green-700 text-white hover:bg-green-800 border-none"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>

      {/* Clear Cart Button */}
      <Button
        variant="outline"
        className="w-full bg-green-100 text-green-700 hover:bg-green-200 border-green-700"
        onClick={() => {
          if (window.confirm("Are you sure you want to clear the cart?")) {
            onclearCart();
          }
        }}
      >
        Cancel Order
      </Button>

      {/* Continue Shopping Button */}
      <Button
        variant="outline"
        className="w-full bg-green-100 text-green-700 hover:bg-green-200 border-green-700"
        onClick={() => navigate("/store/listing")}
      >
        Continue Shopping
      </Button>
    </div>
  );
}
