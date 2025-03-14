import { useState } from "react"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import { ProductGrid } from "@/components/ui/productgrid"
import { Pagination } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { FilterSidebar } from "@/components/ui/filter" // Import your filter sidebar
import { useProductFilter } from "../hooks/useProductFilter"

export default function ProductListing() {
  interface Filters {
    categories: string[];
    vendors: string[];
    priceRange: [number, number];
  }

  const [page, setPage] = useState<number>(0)
  const limit = 10;
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    categories: [],
    vendors: [],
    priceRange: [0, 100],
  })
  const [pendingFilters, setPendingFilters] = useState<Filters>({
    categories: [],
    vendors: [],
    priceRange: [0, 100],
  })
  const [sortBy, setSortBy] = useState("newest")

  const applyFilters = () => {
    setAppliedFilters(pendingFilters)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Delivery Days", href: "#deliveryDays" },
    { name: "Contact", href: "#contact" },
  ];

  const { filterProducts } = useProductFilter(appliedFilters.categories[0], appliedFilters.vendors[0], page+1, limit, appliedFilters.priceRange[0], appliedFilters.priceRange[1])

  return (
    <>
      <Header menuItems={menuItems} />
      <div className="container mx-auto py-8 px-4 mt-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">All Products</h1>
            <p className="text-sm text-muted-foreground">Fresh from the farm to your table</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <select className="border rounded-md px-2 py-1 text-sm" value={sortBy} onChange={handleSortChange}>
              <option value="newest">Newest Products</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            <FilterSidebar 
              filters={pendingFilters} 
              onFilterChange={setPendingFilters}
            />
            <Button onClick={applyFilters} className="w-full mt-4">
              Apply Filters
            </Button>
          </div>
          <div className="flex-1">
            <ProductGrid filterProducts={filterProducts.records} filters={appliedFilters} sortBy={sortBy} onAddToCart={() => { /* Add your onAddToCart logic here */ }} />
            <div className="mt-8">
              <Pagination 
                pageCount={filterProducts?.count ? Math.ceil(filterProducts.count / limit) : 1} 
                handlePageClick={(selectedPage) => { setPage(selectedPage.selected) }} 
              />
            </div>
          </div>
        </div>
      </div>
      <Footer menuItems={menuItems} />
    </>
  )
}