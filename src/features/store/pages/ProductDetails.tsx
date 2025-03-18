import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useProductDetails } from "../hooks/useProductDetail";
import { useRelatedProduct } from "../hooks/useRelatedProduct";
import Header from "@/components/ui/header";
import Marquee from "react-fast-marquee";
import { DeliveryDayComp } from "@/features/common/components/HeroSection";
import Footer from "@/components/ui/footer";
import { deliveryDays, menuItems, storeMenuItems } from "@/core/data";
import ProductGrid from "../components/ProductGrid";
import { paths } from "@/config/paths";

export default function ProductView() {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { selectedImage, productDetails, setSelectedImage } = useProductDetails(
    params.id
  );
  const { realtedProducts } = useRelatedProduct(
    productDetails?.categories[0]?.type,
    params.id
  );

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <Header menuItems={storeMenuItems} />
      <div className="bg-black py-4 mt-16">
        {" "}
        {/* Adjust margin as needed */}
        <Marquee speed={50}>
          {deliveryDays.map((item, index) => (
            <DeliveryDayComp
              key={index}
              location={item.location}
              dayOfWeek={item.dayOfWeek}
            />
          ))}
        </Marquee>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Product Details */}

        <div className="mx-8">

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-neutral-100 rounded-md overflow-hidden ">
                <div className="relative aspect-square">
                  <img
                    src={selectedImage}
                    alt={selectedImage}
                    className="object-contain p-6"
                  />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {productDetails?.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(image.url)}
                    className={`border rounded-md overflow-hidden ${
                      selectedImage === image.url
                        ? "border-primary border-2"
                        : "border-neutral-200"
                    }`}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={image.url}
                        alt={"product"}
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Product Details */}
            <div className="space-y-6 sm:mt-4">
              <h1 className="text-3xl ">{productDetails?.name}</h1>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <ShoppingCart size={14} />
                  <span>Sold by {productDetails?.vendor?.businessName}</span>
                </div>
                <span className="text-neutral-300">|</span>
                <span
                  className={`ml-2 text-sm ${
                    (productDetails?.stockLevel ?? 0) > 1
                      ? "text-brand-600"
                      : "text-rose-600"
                  }`}
                >
                  {productDetails?.stockLevel ?? 0 > 1
                    ? "In Stock"
                    : "Out of Stock"}
                </span>
              </div>

              <div className="text-2xl">${productDetails?.price}</div>

              <hr className="bg-neutral-200" />

              <div className="text-neutral-700 text-sm">
                <p className="mb-4">{productDetails?.description}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      onClick={decreaseQuantity}
                      className="rounded-r-none h-10 w-10 border-input"
                    >
                      <Minus size={14} />
                    </Button>
                    <input
                      type="text"
                      id="quantity"
                      value={quantity.toString().padStart(2, "0")}
                      readOnly
                      className="h-10 w-16 text-center border-y border-input"
                    />
                    <Button
                      variant="outline"
                      onClick={increaseQuantity}
                      className="rounded-l-none h-10 w-10 border-input"
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>

                <Button className="w-full">Add to cart</Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Category:</span>
                  {productDetails?.categories.map((category) => (
                    <Link
                      to={`${paths.store.listing}/${category.id}`}
                      className="text-primary hover:underline"
                    >
                      {category.type}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-neutral-500">Share:</span>
                  <div className="flex items-center gap-2">
                    <Link to="#" className="hover:text-primary">
                      <Twitter size={14} />
                    </Link>
                    <Link to="#" className="hover:text-primary">
                      <Linkedin size={14} />
                    </Link>
                    <Link to="#" className="hover:text-primary">
                      <Facebook size={14} />
                    </Link>
                    <Link to="#" className="hover:text-primary">
                      <Instagram size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Related Products */}
        {realtedProducts.records.length > 0 && (
          <main className="container mx-auto px-4 py-8">
            <section className="text-center mt-8 md:mt-16">
              <h2 className="text-2xl font-semibold mb-8">Related Products</h2>
              <ProductGrid products={realtedProducts.records} />
            </section>
          </main>
        )}
      </div>

      <Footer menuItems={menuItems} />
    </div>
  );
}
