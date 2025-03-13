import { useState } from "react"
import { CartSummary } from "@/components/ui/cartsummary"
import Footer from "@/components/ui/footer"
import Header from "@/components/ui/header" // Import the Header component

export default function CartPage() {
  console.log("CartPage rendered");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Apples",
      price: 3.99,
      quantity: 4,
      image: "/placeholder.svg?height=80&width=80",
      type: "Fresh",
    },
    {
      id: 2,
      name: "Fresh Carrots",
      price: 2.49,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
      type: "Fresh",
    },
    {
      id: 3,
      name: "Whole Milk",
      price: 3.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      type: "Fresh",
    },
  ])

  const removeItem = (id: number): void => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    type: string;
  }

  const updateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map((item: CartItem) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  }

  const cancelOrder = () => {
    setCartItems([])
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0  // Assuming free shipping
  const total = subtotal + shipping

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Delivery Days", href: "#deliveryDays" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <Header menuItems={[]} />
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li>Cart</li>
        </ul>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {cartItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Price</th>
                      <th className="text-center p-4">Qty</th>
                      <th className="text-right p-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-red-500">{item.type}</p>
                              <button
                                className="text-sm text-muted-foreground hover:text-red-500"
                                onClick={() => removeItem(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">${item.price.toFixed(2)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              className="w-10 h-8 text-center border-t border-b"
                              readOnly
                            />
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <p className="mb-4">Looks like you haven't added any items to your cart yet.</p>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={() => alert("Proceeding to checkout...")}
              onCancelOrder={cancelOrder}
            />
          </div>
        </div>
      </div>
      <Footer menuItems={menuItems} />
    </>
  );
}