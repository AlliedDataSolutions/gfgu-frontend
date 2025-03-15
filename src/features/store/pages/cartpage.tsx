import { useContext, useEffect, useState } from "react";
import { CartSummary } from "@/components/ui/cartsummary";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { menuItems, storeMenuItems } from "@/core/data";
import { CartDataContext } from "../hooks/useCart";
import { Apple } from "lucide-react";
import { Product } from "@/components/models/type";

export default function CartPage() {
const { cart, addToCart, removeFromCart, clearCart} = useContext(CartDataContext)


const [subtotal, setSubtotal] = useState(0);
const [total, setTotal] = useState(0);
const [shipping, setShipping] = useState(0);

useEffect(() => {
  const subtotal = cart.product.reduce((sum, item:Product) => sum + Number(item.price) * Number(item.quantity), 0);
  setSubtotal(subtotal)
  setShipping(0)
  setTotal(subtotal + shipping)
},[cart])

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuItems={storeMenuItems} />
      <div className="flex-1 pt-10 px-6">
        <div className="text-sm breadcrumbs mb-4">
          <ul className="flex gap-2">
            <li className="text-gray-500">Shop</li>
            <li className="text-black font-bold">Cart</li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {cart.product.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 text-sm">
                    <tr>
                      <th className="text-left p-3 w-1/3">Product</th>
                      <th className="text-center p-3 w-1/6">Price</th>
                      <th className="text-center p-3 w-1/6">Qty</th>
                      <th className="text-right p-3 w-1/6">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.product.map((item: Product) => (
                      <tr key={item?.id } className="border-b text-sm">
                        <td className="p-3 flex items-center gap-4">
                          <img src={item?.images?.length ? item?.images[0]?.url : Apple} alt={item.name} className="w-16 h-16 rounded-md bg-gray-200" />
                          <div className="flex flex-col">
                            <h3 className="font-medium">{item?.name}</h3>
                            <p className="text-xs text-gray-500">{item.categories[0]?.type}</p>
                            <button
                              className="text-xs text-red-500 hover:underline"
                              onClick={() => removeFromCart(item)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-center">${Number(item?.price)}</td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="border rounded-md px-2 py-1"
                              onClick={() => removeFromCart(item)}
                            >
                              -
                            </button>
                            <span className="text-sm">{item?.quantity}</span>
                            <button
                              className="border rounded-md px-2 py-1"
                              onClick={() => addToCart(item)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6">
                <h2 className="text-xl font-semibold mb-3">Your cart is empty</h2>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80">
            <CartSummary subtotal={subtotal} shipping={shipping} total={total} onCheckout={() => alert("Proceeding to checkout...")} 
            onclearCart={clearCart} 
            />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer menuItems={menuItems} />
      </div>
    </div>
  );
}