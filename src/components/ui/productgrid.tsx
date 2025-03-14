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
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({
  sortBy,
  onAddToCart,
  filterProducts,
}: ProductGridProps) {
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 justify-items-center">
      {sortedProducts.map((product) => (
        <ProductCard
          onClickAddToCart={() => onAddToCart(product)}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
