import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  onclearCart: () => void;
}

export function CartSummary({ subtotal, shipping, total, onCheckout, onclearCart }: CartSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-6 space-y-4">
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

      <Button className="w-full bg-green-500 hover:bg-green-800" onClick={onCheckout}>
        Proceed to Checkout
      </Button>

      <Button
        variant="outline"
        className="w-full border-green-200 text-green-600 bg-green-50 hover:bg-green-100"
        onClick={() => {
          if (window.confirm("Are you sure you want to clear the cart?")) {
            onclearCart();
          }
        }}
      >
        Clear Cart
      </Button>

      <Button
        variant="outline"
        className="w-full border-green-500 text-green-600 bg-green-300 hover:bg-green-200"
        onClick={() => navigate("/product")}
      >
        Continue Shopping
      </Button>
    </div>
  )
}