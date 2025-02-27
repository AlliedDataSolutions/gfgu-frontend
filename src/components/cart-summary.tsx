import { Button } from "@/components/ui/button"

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  onCancelOrder: () => void;
}

export function CartSummary({ subtotal, shipping, total, onCheckout, onCancelOrder }: CartSummaryProps) {
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

      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onCheckout}>
        Proceed to Checkout
      </Button>

      <Button
        variant="outline"
        className="w-full border-green-200 text-green-600 bg-green-50 hover:bg-green-100"
        onClick={onCancelOrder}
      >
        Cancel Order
      </Button>
    </div>
  )
}

