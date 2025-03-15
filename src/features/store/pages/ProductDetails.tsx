import { useContext } from "react";
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
import { CartDataContext } from "../hooks/useCart";
import { Product } from "@/components/models/type";

export default function ProductView() {
  const params = useParams();
  const { selectedImage, productDetails, setSelectedImage } = useProductDetails(
    params.id
  );
  const { realtedProducts } = useRelatedProduct(
    productDetails?.categories[0]?.type,
    params.id
  );

  const { cart, addToCart, removeFromCart } = useContext(CartDataContext);

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
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/store" className="text-neutral-500 hover:text-neutral-700">
            Shop
          </Link>
          <span className="mx-2 text-neutral-400">/</span>
          <Link
            to={`/shop/category/`}
            className="text-neutral-500 hover:text-neutral-700"
          >
            {productDetails?.categories[0]?.type}
          </Link>
          <span className="mx-2 text-neutral-400">/</span>
          <span className="text-neutral-700">{productDetails?.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="flex flex-col space-y-4 mx-w-[230px] md:mx-w-[320px]">
            {/* Main Image Container */}
            <div className=" bg-neutral-100 rounded-lg overflow-hidden mx-auto">
              <img
                src={selectedImage}
                alt={productDetails?.name || "Product Image"}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2">
              {productDetails?.images.map((image, index) => (
                <Button
                  variant="ghost"
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  className="w-20 h-20 p-0 border border-gray-200 rounded-lg"
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </Button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{productDetails?.name}</h1>
            <div className="flex items-center mb-2">
              <ShoppingCart className="h-5 w-5  mr-2" />
              <span className="text-neutral-700">
                Sold by {productDetails?.vendor?.businessName} |{" "}
              </span>
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

            <div className="text-2xl font-bold mb-1">
              ${productDetails?.price}
            </div>

            <hr className="bg-neutral-200" />

            <div className="py-6 mb-6">
              <p className="text-neutral-700 mb-4">
                {productDetails?.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Quantity
              </label>
              {productDetails && <div className="flex items-center">
                {/* Minus Button */}
                <Button
                  onClick={() => removeFromCart({ ...productDetails })}
                  className="p-2 border border-neutral-300 rounded-l-md hover:bg-neutral-100 text-neutral-700 bg-neutral-100"
                >
                  <Minus className="h-4 w-4 text-neutral-700" />
                </Button>

                {/* Quantity Input */}
                <input
                  type="text"
                  id="quantity"
                  value={(cart.product.find((ele: Product) => ele.id === productDetails?.id)?.quantity) ? (cart.product.find((ele: Product) => ele.id === productDetails?.id)?.quantity) : 0}
                  readOnly
                  className="w-12 text-center border-t border-b border-neutral-300 py-2 text-neutral-700"
                />

                {/* Plus Button */}
                <Button
                  onClick={() => addToCart({ ...productDetails })}
                  className="p-2 border border-neutral-300 rounded-r-md hover:bg-neutral-100 text-neutral-700 bg-neutral-100"
                >
                  <Plus className="h-4 w-4 text-neutral-700" />
                </Button>
                {/* </div>} */}

               <Button className="ml-4 text-white py-2 px-6 rounded-md flex-grow md:flex-grow-0 md:ml-6 w-full"
                onClick={() => addToCart({ ...productDetails })}
                >
                  Add to cart
                </Button>

              </div>}
            </div>

            {/* Category */}
            <div className="mb-4">
              <span className="text-neutral-600">Category: </span>
              {productDetails?.categories[0]?.type}
            </div>

            {/* Share */}
            <div className="flex items-center">
              <span className="text-neutral-600 mr-4">Share:</span>
              <div className="flex space-x-2">
                <Link to="#" className="text-neutral-500 hover:text-blue-500">
                  <Twitter className="h-5 w-5 fill-black" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link to="#" className="text-neutral-500 hover:text-blue-700">
                  <Linkedin className="h-5 w-5 fill-black" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link to="#" className="text-neutral-500 hover:text-blue-600">
                  <Facebook className="h-5 w-5 fill-black" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link to="#" className="text-neutral-500 hover:text-pink-600">
                  <Instagram className="h-5 w-5 fill-black" />
                  <span className="sr-only">Instagram</span>
                </Link>
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
