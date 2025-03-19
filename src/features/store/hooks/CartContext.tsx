import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Product } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { Order } from "@/core/order";
import { handleAxiosError } from "@/lib/handleAxiosError";

// Create the context and initial state
interface CartContextType {
  order: Order | null;
  getOrder: () => Promise<void>;
  addOrderLine: (product: Product, quantity: number) => Promise<void>;
  removeOrderLine: (orderLineId: string) => Promise<void>;
  updateQuantityOrderLine: (
    orderLineId: string,
    quantity: number
  ) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    getOrder();
  }, []);

  // Get the current order from the API
  const getOrder = async () => {
    try {
      const response = await axiosInstance.get("/order");
      setOrder(response.data);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Add an order line
  const addOrderLine = async (product: Product, quantity: number) => {
    try {
      const response = await axiosInstance.post("/order/add", {
        productId: product.id,
        quantity,
      });
      setOrder(response.data); // Update order with the new line
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Remove an order line
  const removeOrderLine = async (orderLineId: string) => {
    try {
      const response = await axiosInstance.delete(
        `/order/remove/${orderLineId}`
      );
      setOrder(response.data); // Update order with the removed line
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Update the quantity of an order line
  const updateQuantityOrderLine = async (
    orderLineId: string,
    quantity: number
  ) => {
    try {
      const response = await axiosInstance.put(
        `order/update-quantity/${orderLineId}`,
        { quantity }
      );
      setOrder(response.data); // Update order with the new quantity
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const clearCart = () => {
    axiosInstance
      .delete("/order/delete")
      .then((_) => {
        setOrder(null);
      })
      .catch((err) => {
        handleAxiosError(err);
      });
  };

  return (
    <CartContext.Provider
      value={{
        order,
        getOrder,
        addOrderLine,
        removeOrderLine,
        updateQuantityOrderLine,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the CartContext
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
