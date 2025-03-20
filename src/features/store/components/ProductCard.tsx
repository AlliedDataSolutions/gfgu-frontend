import { useState } from "react";
import { Product } from "@/components/models/type";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Apple from "@/assets/apple.png";
import { paths } from "@/config/paths";

interface ProductCardProps {
  product: Product;
  onClickAddToCart?: () => void;
}

export default function ProductCard({
  product,
  onClickAddToCart,
}: ProductCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = () => {
    navigate(`${paths.store.productDetail.path}/${product.id}`);
  };

  return (
    <div
      className="overflow-hidden w-[160px] h-[350px] sm:w-[200px] sm:h-[370px] md:w-[230px]"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return; // Prevent navigation if a button is clicked
        }
        handleNavigation(); // Navigate only if it's not a button click
      }}
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
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (onClickAddToCart) {
                  onClickAddToCart(); // Ensure the function executes
                }
              }}
              className="w-full py-2 rounded-t-none bg-black hover:bg-black text-white"
            >
              Add to Cart
            </Button>
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
