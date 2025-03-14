import { useState } from "react";
import { CartSummary } from "@/components/ui/cartsummary";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { menuItems, storeMenuItems } from "@/core/data";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Apples",
      price: 3.99,
      quantity: 4,
      image: "/images/apples.png",
      type: "Fresh",
    },
    {
      id: 2,
      name: "Fresh Carrots",
      price: 2.49,
      quantity: 2,
      image: "/images/carrots.png",
      type: "Fresh",
    },
    {
      id: 3,
      name: "Whole Milk",
      price: 3.99,
      quantity: 1,
      image: "/images/milk.png",
      type: "Fresh",
    },
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

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
            {cartItems.length > 0 ? (
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
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b text-sm">
                        <td className="p-3 flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md bg-gray-200" />
                          <div className="flex flex-col">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item.type}</p>
                            <button
                              className="text-xs text-red-500 hover:underline"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-center">${item.price.toFixed(2)}</td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="border rounded-md px-2 py-1"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              className="border rounded-md px-2 py-1"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">${(item.price * item.quantity).toFixed(2)}</td>
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
            <CartSummary subtotal={subtotal} shipping={shipping} total={total} onCheckout={() => alert("Proceeding to checkout...")} onclearCart={clearCart} />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer menuItems={menuItems} />
      </div>
    </div>
  );
}