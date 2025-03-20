import { useCartContext } from "@/features/store/hooks/CartContext";
import { Product } from "../models/type";
import ProductCard from "@/features/store/components/ProductCard";

interface Filters {
  categories: string[];
  vendors: string[];
  priceRange: [number, number];
}

export interface ProductGridProps {
  filters: Filters;
  sortBy: string;
  filterProducts: Product[];
}

export function ProductGrid({ sortBy, filterProducts }: ProductGridProps) {
  const { addOrderLine } = useCartContext();

  const sortedProducts = [...filterProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      default: // 'newest'
        return parseInt(b.id) - parseInt(a.id);
    }
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-4 justify-items-center items-center">
      {sortedProducts.map((product) => (
        <ProductCard
          onClickAddToCart={() => {
            addOrderLine(product, 1);
          }}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
