
import { useState } from "react"
import DeliveryBgImg from "../../../assets/DeliveryBgImg.png";

import { ProductType } from "@/components/models/type"

// interface ProductCardProps {
//   product: ProductType
// }

interface ProductCardProps {
    product: ProductType
    featured?: boolean
  }

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-[#F6F6F6]">
        <img src={DeliveryBgImg || "/placeholder.svg"} alt={product.name} className="object-cover" />
        {isHovered && (
          <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 transition-opacity">
            <button className="w-full py-2 bg-black text-white rounded">
              Add to Cart
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Sold By {product.vendor}</p>
        <p className="text-red-500">${product.price}</p>
      </div>
    </div>
  )
}

