import { Button } from "@/components/ui/button"
import { Apple } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  // add any additional properties as needed
}

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

export function ProductGrid({ sortBy, onAddToCart, filterProducts }: ProductGridProps) {

  const sortedProducts = [...filterProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "name-a-z":
        return a.name.localeCompare(b.name)
      default: // 'newest'
        return b.id - a.id
    }
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg overflow-hidden border">
          <div className="p-4">
            <div className="aspect-square relative mb-4">
              {/* <img src={product.images?.length ? product.images?.url : Apple} alt={product.name} className="object-cover" /> */}
            </div>
            <h3 className="font-medium text-center">{product.name}</h3>
            <p className="text-sm text-center text-muted-foreground">{product.name}</p>
            <p className="text-center font-semibold mt-2">${product?.price}</p>
            <Button className="w-full mt-4" onClick={() => onAddToCart(product)}>Add to Cart</Button>
          </div>
        </div>
      ))}
    </div>
  )
}