// import { useState } from "react"
// import { ProductGrid } from "@/components/ui/productgrid"
// import { FilterSidebar } from "@/components/ui/filter"
// import { Pagination } from "@/components/ui/pagination"
// import { Button } from "@/components/ui/button"

// export default function ProductsPage() {
//   const [appliedFilters, setAppliedFilters] = useState<Filters>({
//     categories: [],
//     vendors: [],
//     priceRange: [0, 100],
//   })
//   const [pendingFilters, setPendingFilters] = useState<Filters>({
//     categories: [],
//     vendors: [],
//     priceRange: [0, 100],
//   })
//   const [sortBy, setSortBy] = useState("newest")

// interface Filters {
//     categories: string[];
//     vendors: string[];
//     priceRange: [number, number];
// }

// interface SortChangeEvent {
//     target: {
//         value: string;
//     };
// }

// interface FilterProps {
//   filters: {
//     categories: string[];
//     vendors: string[];
//     priceRange: [number, number];
//   };
//   onFilterChange: (filters: Partial<Filters>) => void;
// }

// const handleFilterChange = (newFilters: Partial<Filters>) => {
//     setPendingFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
// };

//   const applyFilters = () => {
//     setAppliedFilters(pendingFilters)
//   }

// const handleSortChange = (event: SortChangeEvent) => {
//     setSortBy(event.target.value)
// }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold">All Products</h1>
//           <p className="text-sm text-muted-foreground">Fresh from the farm to your table</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-sm">Sort by:</span>
//           <select className="border rounded-md px-2 py-1 text-sm" value={sortBy} onChange={handleSortChange}>
//             <option value="newest">Newest Products</option>
//             <option value="price-low-high">Price: Low to High</option>
//             <option value="price-high-low">Price: High to Low</option>
//             <option value="name-a-z">Name: A to Z</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-64 shrink-0">
//           {/* <FilterSidebar filters={pendingFilters} onFilterChange={handleFilterChange} /> */}
//           <Button onClick={applyFilters} className="w-full mt-4">
//             Apply Filters
//           </Button>
//         </div>
//         <div className="flex-1">
//           <ProductGrid filters={appliedFilters} sortBy={sortBy} />
//           <div className="mt-8">
//             <Pagination />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
