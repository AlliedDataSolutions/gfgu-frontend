import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

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

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number.parseInt(event.target.value);
    setLocalFilters((prev) => ({ ...prev, priceRange: [0, newPrice] }));
    onFilterChange({ ...filters, priceRange: [0, newPrice] });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Filter Option</h3>
          <Plus className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Category</h4>
          <div className="space-y-1">
            {["Fruits", "Vegetables", "Dairy", "Beans", "Grains"].map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={localFilters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="text-sm">{category}</span>
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
          {[
            "Green Valley Farm",
            "Organic Harvest Co.",
            "Sunrise Farms",
            "Local Farmer Limited",
            "Fresh Fields Co-op",
          ].map((vendor) => (
            <label key={vendor} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
                checked={localFilters.vendors.includes(vendor)}
                onChange={() => handleVendorChange(vendor)}
              />
              <span className="text-sm">{vendor}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Filter by Price</h3>
          <Plus className="h-4 w-4" />
        </div>
        <div className="px-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm">$0</span>
            <span className="text-sm">${localFilters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="w-full"
            value={localFilters.priceRange[1]}
            onChange={handlePriceChange}
          />
        </div>
      </div>
    </div>
  );
}
