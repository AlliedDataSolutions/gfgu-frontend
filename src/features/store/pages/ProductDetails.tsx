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
import { useParams } from 'react-router';
import { useProductDetails } from "../hooks/useProductDetail";
import { useRelatedProduct } from "../hooks/useRelatedProduct";
import Header from "@/components/ui/header";
import Marquee from "react-fast-marquee";
import { DeliveryDayComp } from "@/features/common/components/HeroSection";
import Footer from "@/components/ui/footer";
import { deliveryDays, menuItems, storeMenuItems } from "@/core/data";
import ProductGrid from "../components/ProductGrid";
import Apple from "@/assets/apple.png";

export default function ProductView() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const params = useParams();

  const { productDetails } = useProductDetails(params.id);

  const productImages = [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ];

  const { realtedProducts } = useRelatedProduct(productDetails?.categories[0]?.type);

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
      <div className="bg-black py-4 mt-16"> {/* Adjust margin as needed */}
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
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/store" className="text-gray-500 hover:text-gray-700">
            Shop
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/shop/category/`} className="text-gray-500 hover:text-gray-700">
            {productDetails?.categories[0]?.type}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">{productDetails?.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productDetails?.images && productDetails.images.length > 0 ? productDetails.images[0].url : Apple}
                alt={productDetails?.name}
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gray-100 rounded-lg overflow-hidden border-2 h-24 ${selectedImage === index
                    ? "border-green-500"
                    : "border-transparent"
                    }`}
                >
                  <img
                    src={productDetails?.images && productDetails.images.length > 0 ? productDetails.images[0].url : Apple}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-100 object-contain"
                  />
                </Button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{productDetails?.name}</h1>
            <div className="flex items-center mb-2">
              <ShoppingCart className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-600">Sold by {productDetails?.vendor?.businessName} | </span>
              <span
                className={`ml-2 text-sm font-medium ${(productDetails?.stockLevel ?? 0) > 1 ? "text-brand-600" : "text-rose-600"
                  }`}
              >
                {productDetails?.stockLevel ?? 0 > 1 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="text-2xl font-bold mb-6">
              ${productDetails?.price}
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <p className="text-gray-700 mb-4">{productDetails?.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity
              </label>
              <div className="flex items-center">
                {/* Minus Button */}
                <Button
                  onClick={decreaseQuantity}
                  className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100 text-gray-700 bg-gray-100"
                >
                  <Minus className="h-4 w-4 text-gray-700" />
                </Button>

                {/* Quantity Input */}
                <input
                  type="text"
                  id="quantity"
                  value={quantity.toString().padStart(2, "0")}
                  readOnly
                  className="w-12 text-center border-t border-b border-gray-300 py-2 text-gray-700"
                />

                {/* Plus Button */}
                <Button
                  onClick={increaseQuantity}
                  className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100 text-gray-700 bg-gray-100"
                >
                  <Plus className="h-4 w-4 text-gray-700" />
                </Button>

                {/* Add to Cart Button */}
                <Button className="ml-4 text-white py-2 px-6 rounded-md flex-grow md:flex-grow-0 md:ml-6 w-full">
                  Add to cart
                </Button>
              </div>

            </div>

            {/* Category */}
            <div className="mb-4">
              <span className="text-gray-600">Category: </span>
              {productDetails?.categories[0]?.type}
            </div>

            {/* Share */}
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Share:</span>
              <div className="flex space-x-2">
                <Link to="#" className="text-gray-500 hover:text-blue-500">
                  <Twitter className="h-5 w-5 fill-black" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-blue-700">
                  <Linkedin className="h-5 w-5 fill-black" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-blue-600">
                  <Facebook className="h-5 w-5 fill-black" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-pink-600">
                  <Instagram className="h-5 w-5 fill-black" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <main className="container mx-auto px-4 py-8">
          <section className="text-center mt-8 md:mt-16">

            <h2 className="text-2xl font-semibold mb-8">Related Products</h2>
            <ProductGrid products={realtedProducts.records} />
          </section>
        </main>
      </div>

      <Footer menuItems={menuItems} />

    </div>
  );
}
