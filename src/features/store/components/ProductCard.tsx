import { useContext, useState } from "react";
import { Product } from "@/components/models/type";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Apple from "@/assets/apple.png";
import { paths } from "@/config/paths";
import { CartDataContext } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, removeFromCart, isItemInCart } = useContext(CartDataContext);

  const handleNavigation = () => {
    navigate(`${paths.store.productDetail.path}/${product.id}`);
  };

  return (
    <div
      className="overflow-hidden max-w-36 md:max-w-80"
      onClick={handleNavigation} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-lg placeholder:aspect-square bg-neutral-50">
        <img
          src={product.images?.length ? product.images[0].url : Apple}
          alt={product.name}
          className="object-cover w-full h-full p-6"
        />
        {isHovered && (
          <div className="w-full mt-2 absolute inset-0 flex items-end justify-center z-50 transition-opacity">
            {!isItemInCart(product.id) ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation(); 
                  addToCart({ ...product });
                }}
                className="w-full py-2 rounded-t-none bg-black hover:bg-black text-white"
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeFromCart({ ...product });
                }}
                className="w-full py-2 rounded-t-none bg-black hover:bg-black text-white"
              >
                Remove from Cart
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="p-1 flex flex-col items-center">
        <h3 className="font-normal mb-1">{product.name}</h3>
        <p className="text-sm text-center text-neutral-600 mb-1">
          Sold By Farmer {product.vendor.businessName}
        </p>
        <p className="text-red-500">${product.price}</p>
      </div>
    </div>
  );
}
