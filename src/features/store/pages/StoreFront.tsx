import { CategoryType, ProductType } from "@/components/models/type"
import CategoryGrid from "../components/category-grid"
import ProductGrid from "../components/product-grid"
import { DeliveryDayComp } from "@/features/common/components/HeroSection"
import ShopBgImg from "../../../assets/ShopBgImg.png";


import Marquee from "react-fast-marquee";

import { deliveryDays } from "@/features/common"
import { useEffect, useState } from "react";
import { postCall } from "@/app.service";

export default function StoreFront() {

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setproducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

const selectCategory = (category: CategoryType) => {
  setSelectedCategory(category.id);
}
  useEffect(() => {

    postCall<{ data: CategoryType[] }>("http://localhost:5000/api/category/allCategory", {}).then((resp) => {
      if (resp && resp.data)
        setCategories(resp.data.data);
    });
  }, []);

  useEffect(() => {

    postCall<{ data: ProductType[] }>("http://localhost:5000/api/product/allProduct", {category:selectedCategory}).then((resp) => {
      if (resp && resp.data)
        setproducts(resp.data.data);
    });
  }, [selectedCategory]);

  return (
    <div>

      <section className="relative bg-gradient-to-r from-[#24601F] to-[#53DE48] overflow-hidden">
        {/* Image Container */}
        <div className="absolute right-0 h-full w-full md:w-1/2">
          <img
            className="h-full w-full object-right-buttom"
            src={ShopBgImg}
            alt="background hero"
          />
        </div>

        {/* Text Container */}
        <div className="relative container mx-auto flex items-center h-96 md:h-[calc(100vh-8rem)] px-6">
          <div className="max-w-lg md:max-w-xl text-left space-y-4">
            <small className="text-white">Always fresh product for you</small>
            <h1 className="text-2xl md:text-5xl font-bold text-white">
              Feast Your Senses,
            </h1>
            <h1 className="text-2xl md:text-5xl font-bold text-[#B6D73E]">
              Fast and Fresh
            </h1>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="bg-black py-5 relative z-10">
          <Marquee speed={50}>
            {deliveryDays.map((item) => (
              <DeliveryDayComp location={item.location} dayOfWeek={item.dayOfWeek} />
            ))}
          </Marquee>
        </div>
      </section>

      <section className="bg-[#FAFDEC] py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-[#04910C] mb-2">Category</div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Shop By Category</h2>
          </div>
          <CategoryGrid categories={categories} selectCategory={selectCategory}/>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">

        <section className="text-center mt-16">
          <div className="text-[#04910C] mb-2">Popular Choices</div>
          <h2 className="text-2xl font-semibold mb-8">Explore Products</h2>
          <ProductGrid products={products} />
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors">
              View all Products
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

