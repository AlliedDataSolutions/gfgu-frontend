import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Minus, Plus, ShoppingCart } from "lucide-react"
import DeliveryBgImg from "../../../assets/DeliveryBgImg.png";
import { postCall } from "@/app.service";
import { ProductType } from "@/components/models/type";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ENDPOINTS } from "@/app_config";



export default function ProductView() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("ref");

  const [productDetails, setProductDetails] = useState<ProductType | null>(null);


  const productImages = [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ]

  const relatedProducts = [
    {
      id: 1,
      name: "Coffee Beans",
      seller: "Loan Farmer Limited",
      price: 200,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Coffee Beans",
      seller: "Loan Farmer Limited",
      price: 200,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Coffee Beans",
      seller: "Loan Farmer Limited",
      price: 200,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Coffee Beans",
      seller: "Loan Farmer Limited",
      price: 200,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  useEffect(() => {
    postCall<{ data: ProductType }>(ENDPOINTS.GETPRODUCTBYID, { id: productId }).then((resp) => {
      if (resp && resp.data) {
        setProductDetails(resp.data.data);
      }
    });
  }, []);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link to="/shop" className="text-gray-500 hover:text-gray-700">
          Shop
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/shop/beans" className="text-gray-500 hover:text-gray-700">
          Beans
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
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt="White Beans"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <Button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-green-500" : "border-transparent"
                  }`}
              >
                <img
                  src={DeliveryBgImg || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-auto object-contain"
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
            <span className="text-gray-600">Sold by Loan Farmer Limited</span>
            <span className="ml-4 text-green-600 text-sm font-medium">In Stock</span>
          </div>

          <div className="text-2xl font-bold mb-6">${productDetails?.price}</div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <p className="text-gray-700 mb-4">
              {productDetails?.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <Button onClick={decreaseQuantity} className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100">
                <Minus className="h-4 w-4" />
              </Button>
              <input
                type="text"
                id="quantity"
                value={quantity.toString().padStart(2, "0")}
                readOnly
                className="w-12 text-center border-t border-b border-gray-300 py-2"
              />
              <Button onClick={increaseQuantity} className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100">
                <Plus className="h-4 w-4" />
              </Button>

              <Button className="ml-4 text-white py-2 px-6 rounded-md flex-grow md:flex-grow-0 md:ml-6">
                Add to cart
              </Button>
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <span className="text-gray-600">Category: </span>
            <Link to="/category/food" className="text-gray-800 hover:text-green-600">
              Food
            </Link>
          </div>

          {/* Share */}
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Share:</span>
            <div className="flex space-x-2">
              <Link to="#" className="text-gray-500 hover:text-blue-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-blue-700">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-gray-100 rounded-lg overflow-hidden group">
              <div className="p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain mb-4"
                />
                <h3 className="text-lg font-medium text-center">{product.name}</h3>
                <p className="text-sm text-gray-500 text-center">Sold By {product.seller}</p>
                <p className="text-lg font-bold text-center text-red-500 mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

