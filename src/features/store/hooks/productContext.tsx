import { Product } from "@/components/models/type";
import { createContext, ReactNode, useContext, useState } from "react";

type ProductContextType = {
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
  };
  
  const ProductContext = createContext<ProductContextType | undefined>(undefined);
  
  export function ProductProvider({ children }: { children: ReactNode }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
    return (
      <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
        {children}
      </ProductContext.Provider>
    );
  }
  
  export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
      throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
  }
