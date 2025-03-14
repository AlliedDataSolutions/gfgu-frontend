import { useState, useEffect } from "react";
import { ChevronUp, Minus, Plus } from "lucide-react";
import { useStore } from "@/features/store/hooks/useStore";
import { Slider } from "@/components/ui/slider";

interface Filters {
  categories: string[];
  vendors: string[];
  priceRange: [number, number];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  const { categories, vendors } = useStore();

  const handleCategoryChange = (category: string) => {
    const updatedCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category];

    setLocalFilters((prev) => ({ ...prev, categories: updatedCategories }));
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleVendorChange = (vendor: string) => {
    const updatedVendors = localFilters.vendors.includes(vendor)
      ? localFilters.vendors.filter((v) => v !== vendor)
      : [...localFilters.vendors, vendor];

    setLocalFilters((prev) => ({ ...prev, vendors: updatedVendors }));
    onFilterChange({ ...filters, vendors: updatedVendors });
  };

  const handlePriceChange = (value: number[]) => {
    // const newPrice = Number.parseInt(event.target.value);
    setLocalFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }));
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
    setPriceRange(value);
  };

  const [priceRange, setPriceRange] = useState([0, 20]);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-normal">Filter Option</h3>
        </div>
        <hr className="bg-neutral-50" />
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium mb-2">Category</h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <label key={category?.type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={localFilters.categories.includes(category?.type)}
                  onChange={() => handleCategoryChange(category?.type)}
                />
                <span className="text-sm">{category?.type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Vendor</h3>
          <Minus className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          {vendors.map((vendor) => (
            <label
              key={vendor.businessName}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                className="rounded"
                checked={localFilters.vendors.includes(vendor.businessName)}
                onChange={() => handleVendorChange(vendor.businessName)}
              />
              <span className="text-sm">{vendor.businessName}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="font-medium">Filter by Price</h3>
          <ChevronUp
            className={`h-5 w-5 transition-transform ${
              isOpen ? "" : "rotate-180"
            }`}
          />
        </div>

        {isOpen && (
          <div className="mt-4 space-y-4">
            <div className="text-base">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </div>
            <Slider
              defaultValue={priceRange}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="py-4"
              thumbClassName="h-5 w-5 bg-black rounded-full border-2 border-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}
