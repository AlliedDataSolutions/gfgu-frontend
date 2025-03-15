// @ts-nocheck
import { CartType, Product } from "@/components/models/type";
import { ReactNode, createContext, useState, FC } from "react";


const initialValue: {cartId: string, product: Product[]} = {
  cartId: "",
  product: [],
};

const initialConext = {
  cart: initialValue,
  addToCart: (value: Product): void => { },
  removeFromCart: (value: Product): void => { },
  isItemInCart: (productId: string): boolean => false,
  clearCart: (): void => { },
};

interface CartDataProviderProps {
  children: ReactNode;
}

const CartDataContext = createContext(initialConext);
const CartDataProvider: FC<CartDataProviderProps> = ({ children }) => {

  const [cart, setCart] = useState<CartType>({ ...initialValue });
  const addToCart = (value: Product) => {
    const newCart = [...cart.product];
    const index = newCart.findIndex((item) => item.id === value.id);
    if (index === -1) {
      newCart.push({...value, quantity: 1});
    } else {
      newCart[index].quantity += 1;
    }
    setCart({ ...cart, product: newCart });
  }

  const removeFromCart = (value: Product) => {
    const newCart = [...cart.product];
    const index = newCart.findIndex((item) => item.id === value.id);
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    else {
      newCart.splice(index, 1);
    }
    setCart({ ...cart, product: newCart });
  }

  const isItemInCart = (productId: string) => {
    return cart.product.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCart(initialValue);
  };


  return (
    <CartDataContext.Provider
      value= {{ cart, addToCart, removeFromCart, isItemInCart, clearCart }}
    >
  { children }
  </CartDataContext.Provider>
  );
};

export { CartDataProvider, CartDataContext };
