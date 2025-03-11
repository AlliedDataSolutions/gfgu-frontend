import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "./productContext";
import { Product } from "@/components/models/type";

export const useProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Product>();
  //const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  //const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("ref");
  const { selectedProduct } = useProduct();

  useEffect(() => {
    if (selectedProduct != null) {
      setProductDetails(selectedProduct);
    }
    console.log(productId);
    // use the productId to fetchproduct details and set it again into
    // setProductDetails
  }, []);

  return {
    productDetails,
  };
};
