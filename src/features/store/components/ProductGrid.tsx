import { Product } from "@/components/models/type";
import ProductCard from "./ProductCard";
import { useCartContext } from "../hooks/CartContext";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {

  const { addOrderLine } = useCartContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClickAddToCart={() => {
            addOrderLine(product, 1);
          }}
        />
      ))}
    </div>
  );
}
