import { useState } from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { ProductGrid } from "@/components/ui/productgrid";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { FilterSidebar } from "@/components/ui/filter"; // Import your filter sidebar
import { useProductFilter } from "../hooks/useProductFilter";
import { deliveryDays, menuItems, storeMenuItems } from "@/core/data";
import Marquee from "react-fast-marquee";
import { DeliveryDayComp } from "@/features/common/components/HeroSection";
import { useParams } from "react-router";

export default function ProductListing() {
  interface Filters {
    categories: string[];
    vendors: string[];
    priceRange: [number, number];
  }

  const [page, setPage] = useState<number>(0);
  const params = useParams();
  const limit = 10;
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    categories: [],
    vendors: [],
    priceRange: [0, 100],
  });
  const [pendingFilters, setPendingFilters] = useState<Filters>({
    categories: [],
    vendors: [],
    priceRange: [0, 100],
  });
  const [sortBy, setSortBy] = useState("newest");

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const { filterProducts } = useProductFilter(
    appliedFilters.categories.length > 0 ? appliedFilters.categories[0] : params.id && params.id != 'all' ? params.id : undefined,
    appliedFilters.vendors[0],
    page + 1,
    limit,
    appliedFilters.priceRange[0],
    appliedFilters.priceRange[1]
  );

  return (
    <>
      <Header menuItems={storeMenuItems} />

      {/* delivery days */}
      <div className="bg-black py-4 mt-16">
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

      <div className="container mx-auto py-8 px-4 mt-4 sm:mt-8">
        <div className="flex flex-col sm:flex-row space-y-4 sm:justify-between sm:items-center mb-6">
          <div>
            <h1 className="text-2xl">Showing all products</h1>
            <p className="text-sm text-muted-foreground">
              Fresh from the farm to your table
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest Products</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0 border px-6 pt-6 pb-20 rounded-md">
            <FilterSidebar
              filters={pendingFilters}
              onFilterChange={setPendingFilters}
            />
            <Button onClick={applyFilters} className="w-full mt-4">
              Apply Filters
            </Button>
          </div>
          <div className="flex-1">
            <ProductGrid
              filterProducts={filterProducts.records}
              filters={appliedFilters}
              sortBy={sortBy}
              onAddToCart={() => {
                /* Add your onAddToCart logic here */
              }}
            />
            <div className="mt-8">
              <Pagination
                pageCount={
                  filterProducts?.count
                    ? Math.ceil(filterProducts.count / limit)
                    : 1
                }
                handlePageClick={(selectedPage) => {
                  setPage(selectedPage.selected);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer menuItems={menuItems} />
    </>
  );
}
