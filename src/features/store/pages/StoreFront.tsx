import { ProductCategory } from "@/components/models/type";
import ProductGrid from "../components/ProductGrid";
import { DeliveryDayComp } from "@/features/common/components/HeroSection";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import Banner from "../components/Storebanner";
import Header from "@/components/ui/header";
import ProductCategoryGrid from "../components/ProductCategoryGrid";
import Footer from "@/components/ui/footer";
import { deliveryDays, menuItems, storeMenuItems } from "@/core/data";
import { useStore } from "../hooks/useStore";
import InlineLoader from "@/components/ui/inlineloading";
import useDeliveryLocations from "@/features/common/hooks/useDeliveryLocations";

export default function StoreFront() {
  const { loading, popularProducts, categories } = useStore();
  const navigate = useNavigate();
  const { data: deliveryLocations } = useDeliveryLocations();

  if (loading) {
    return <InlineLoader loading={loading} children={<div></div>} />;
  }

  return (
    <div className="pt-14 md:pt-16">
      <Header menuItems={storeMenuItems} />
      <div>
        <div className="bg-gradient-to-r from-[#24601F] to-[#53DE48]">
          <Banner />
        </div>

        {deliveryLocations && deliveryLocations.length > 0 && (
          <div className="bg-black py-4">
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
        )}
        <section className="bg-yellow-50 py-10">
          {!loading && (
            <ProductCategoryGrid
              categories={categories}
              selectCategory={function (category: ProductCategory): void {
                navigate(`${paths.store.listing.path}/${category.id}`);
              }}
            />
          )}
        </section>

        <main className="container mx-auto px-4 py-8">
          {!loading && (
            <section className="text-center mt-8 md:mt-16">
              <div className="text-brand-600 mb-2">Popular Choices</div>
              <h2 className="text-2xl font-semibold mb-8">Popular Products</h2>
              <ProductGrid products={popularProducts.records} />
              <div className="flex justify-center mt-12">
                <Button className="px-8 py-3 bg-brand-700 text-white rounded-md hover:bg-brand-600 transition-colors">
                  <Link to={paths.store.listing.path}>View all Products</Link>
                </Button>
              </div>
            </section>
          )}
        </main>

        <Footer menuItems={menuItems} />
      </div>
    </div>
  );
}
