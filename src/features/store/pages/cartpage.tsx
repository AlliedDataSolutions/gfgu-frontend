import { useState } from "react";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { menuItems, storeMenuItems } from "@/core/data";
import { Minus, Plus } from "lucide-react";
import { useCartContext } from "../hooks/CartContext";
import { OrderLine } from "@/core/order";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import InlineLoader from "@/components/ui/inlineloading";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    loading,
    order,
    clearCart,
    removeOrderLine,
    updateQuantityOrderLine,
  } = useCartContext();
  const [orderLines, setOrderLines] = useState<OrderLine[] | undefined>(
    order?.orderLines
  );

  // Calculate totals
  const subtotal = orderLines?.reduce(
    (sum, line) => sum + line.quantity * Number.parseFloat(line.unitPrice),
    0
  );
  const shipping: number = 0; // Free shipping
  const total = subtotal;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setOrderLines(
      orderLines?.map((line) =>
        line.id === id ? { ...line, quantity: newQuantity } : line
      )
    );
    updateQuantityOrderLine(id, newQuantity);
  };

  if (loading) {
    return <InlineLoader loading={loading} children={undefined} />;
  }

  return (
    <div className="pt-14 md:pt-16">
      <Header menuItems={storeMenuItems} />

      {!order || order.orderLines.length < 1 ? (
        <div className="flex flex-col my-20 items-center justify-items-center">
          <h1 className="text-5xl font-medium">Order</h1>
          <h2 className="text-sm">You have no order</h2>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-8 py-6">
          {/* Cart Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            {/* Product List */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 text-sm text-neutral-600 bg-neutral-50 p-3 mb-4 md:grid">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>

              {/* Items */}
              {orderLines?.map((line) => (
                <div
                  key={line.id}
                  className="grid grid-cols-12 gap-4 py-4 items-center"
                >
                  {/* Product */}
                  <div className="col-span-12 md:col-span-6 flex gap-4">
                    <div className="w-20 h-20 bg-neutral-100 flex-shrink-0">
                      <img
                        src={
                          line.product.images[0]?.url ||
                          "/placeholder.svg?height=80&width=80"
                        }
                        alt={line.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-neutral-900">
                        {line.product.name}
                      </div>
                      <Button
                        variant={"link"}
                        className="text-rose-500 text-sm mt-1 p-0"
                        onClick={() => {
                          removeOrderLine(line.id);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Price - Mobile */}
                  <div className="col-span-4 md:hidden flex space-x-4">
                    <span className="text-neutral-500">Price:</span>
                    <span>${Number.parseFloat(line.unitPrice).toFixed(2)}</span>
                  </div>

                  {/* Qty - Mobile */}
                  <div className="col-span-4 md:hidden flex space-x-4">
                    <span className="text-neutral-500">Qty:</span>
                    <span>{line.quantity}</span>
                  </div>

                  {/* Amount - Mobile */}
                  <div className="col-span-4 md:hidden flex space-x-4">
                    <span className="text-neutral-500">Amount:</span>
                    <span>
                      $
                      {(
                        line.quantity * Number.parseFloat(line.unitPrice)
                      ).toFixed(2)}
                    </span>
                  </div>

                  {/* Price - Desktop */}
                  <div className="hidden md:block md:col-span-2 text-center">
                    ${Number.parseFloat(line.unitPrice).toFixed(2)}
                  </div>

                  {/* Quantity - Desktop */}
                  <div className="hidden md:flex md:col-span-2 justify-center items-center">
                    <div className="flex items-center border rounded">
                      <Button
                        variant={"link"}
                        className="px-2 py-1 border-r"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity - 1)
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-1">
                        {line.quantity.toString().padStart(2, "0")}
                      </span>
                      <Button
                        variant={"link"}
                        className="px-2 py-1 border-l"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity + 1)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Amount - Desktop */}
                  <div className="hidden md:block md:col-span-2 text-right">
                    $
                    {(
                      line.quantity * Number.parseFloat(line.unitPrice)
                    ).toFixed(2)}
                  </div>

                  {/* Quantity Controls - Mobile */}
                  <div className="col-span-12 md:hidden flex justify-center mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        className="px-3 py-1 border-r"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-1">
                        {line.quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        className="px-3 py-1 border-l"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 max-w-80 justify-self-end">
              <div className="border p-6 rounded">
                <h2 className="text-md mb-4">Cart Total</h2>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal:</span>
                    <span>${subtotal?.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping:</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-neutral-600">Total:</span>
                    <span>${total?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => navigate(paths.store.checkout.path)}
                    className="w-full"
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to clear the cart?"
                        )
                      ) {
                        clearCart(() => {
                          navigate(-1);
                        });
                      }
                    }}
                    variant={"secondary"}
                    className="w-full"
                  >
                    Cancel Order
                  </Button>

                  <Button
                    variant={"link"}
                    onClick={() => navigate(paths.store.home.path)}
                    className="w-full"
                  >
                    Return to store
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer menuItems={menuItems} />
    </div>
  );
}
