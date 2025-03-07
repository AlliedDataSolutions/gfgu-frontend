
import { useState } from "react"
import { ProductType } from "@/components/models/type"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    product: ProductType
    featured?: boolean
  }

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false)

  const handleNavigation = () => {
    navigate(`/store/productView?ref=${product.id}`); 
  };

  return (
    <div
      className="rounded-lg overflow-hidden" 
      onClick={handleNavigation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-[#F6F6F6]">
        <img src={product.images ? product.images[0].url : "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
        {isHovered && (
          <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 transition-opacity">
            <Button className="w-full py-2 bg-black text-white rounded">
              Add to Cart
            </Button>
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

