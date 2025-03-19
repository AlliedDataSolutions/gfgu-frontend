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
import toast from "react-hot-toast";

type ClearCartCallback = () => void;
// Create the context and initial state
interface CartContextType {
  loading: boolean;
  order: Order | null;
  getOrder: () => Promise<void>;
  addOrderLine: (product: Product, quantity: number) => Promise<void>;
  removeOrderLine: (orderLineId: string) => Promise<void>;
  updateQuantityOrderLine: (
    orderLineId: string,
    quantity: number
  ) => Promise<void>;
  clearCart: (callback: ClearCartCallback) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrder();
  }, []);

  // Get the current order from the API
  const getOrder = async () => {
    axiosInstance
      .get("/order")
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        handleAxiosError(error);
      });
  };

  // Add an order line
  const addOrderLine = async (product: Product, quantity: number) => {
    try {
      setLoading(true);
      await axiosInstance.post("/order/add", {
        productId: product.id,
        quantity,
      });
      getOrder();
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const removeOrderLine = async (orderLineId: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/order/remove/${orderLineId}`);
      getOrder();
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update the quantity of an order line
  const updateQuantityOrderLine = async (
    orderLineId: string,
    quantity: number
  ) => {
    const data = {
      orderLineId: orderLineId,
      quantity: quantity,
    };
    try {
      setLoading(true);
      await axiosInstance.put(`order/update-quantity`, data);
      getOrder();
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = (callback: ClearCartCallback) => {
    setLoading(true);
    axiosInstance
      .delete("/order/clear")
      .then((response) => {
        toast.success(response.data.message);
        setOrder(null);
        callback();
      })
      .catch((err) => {
        handleAxiosError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CartContext.Provider
      value={{
        loading,
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
