import { Button } from "@/components/ui/button"

const allProducts = [
  {
    id: 1,
    name: "Organic Apples",
    price: 3.99,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Green Valley Farm",
    category: "Fruits",
  },
  {
    id: 2,
    name: "Fresh Carrots",
    price: 2.49,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Organic Harvest Co.",
    category: "Vegetables",
  },
  {
    id: 3,
    name: "Whole Milk",
    price: 3.99,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Sunrise Farms",
    category: "Dairy",
  },
  {
    id: 4,
    name: "Organic Beans",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Local Farmer Limited",
    category: "Beans",
  },
  {
    id: 5,
    name: "Brown Rice",
    price: 5.99,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Fresh Fields Co-op",
    category: "Grains",
  },
  {
    id: 6,
    name: "Fresh Tomatoes",
    price: 2.99,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Green Valley Farm",
    category: "Vegetables",
  },
  {
    id: 7,
    name: "Organic Strawberries",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Organic Harvest Co.",
    category: "Fruits",
  },
  {
    id: 8,
    name: "Greek Yogurt",
    price: 3.49,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Sunrise Farms",
    category: "Dairy",
  },
  {
    id: 9,
    name: "Quinoa",
    price: 6.99,
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Fresh Fields Co-op",
    category: "Grains",
  },
]

interface Filters {
  categories: string[];
  vendors: string[];
  priceRange: [number, number];
}

interface ProductGridProps {
  filters: Filters;
  sortBy: string;
}

export function ProductGrid({ filters, sortBy }: ProductGridProps) {
  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
    const vendorMatch = filters.vendors.length === 0 || filters.vendors.includes(product.vendor)
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    return categoryMatch && vendorMatch && priceMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
              {/* <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" /> */}
            </div>
            <h3 className="font-medium text-center">{product.name}</h3>
            <p className="text-sm text-center text-muted-foreground">{product.vendor}</p>
            <p className="text-center font-semibold mt-2">${product.price.toFixed(2)}</p>
            <Button className="w-full mt-4">Add to Cart</Button>
          </div>
        </div>
      ))}
    </div>
  )
}