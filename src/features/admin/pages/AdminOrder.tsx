import { Button } from "@/components/ui/button";
import {
  Filter,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";
import OrderTable from "../components/OrderTable";
import { Input } from "@/components/ui/input";
import OrderFilter from "../components/OrderFilter";
import useAdminOrder from "../hooks/useAdminOrder";
import { useState } from "react";

interface FilterOrders {
  page: number;
  limit: number;
  productName?: string;
  productDescription?: string;
  vendorId?: string;
  orderDate?: Date;
}

export function AdminOrder() {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterOrders>({
    page: 1,
    limit: 10,
    productName: "",
    productDescription: "",
    vendorId: "",
    orderDate: undefined,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { allOrdersData, loading, updateOrderLineStatus } = useAdminOrder(filters);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission (if inside a form)
      handleSearch(searchQuery);
    }
  };
  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, productName: query }));
  };

  const handleNextPages = () => {
    setFilters((prev) => ({
      ...prev,
      page: (prev.page ?? 1) + 1,
    }));
  };

  const handlePreviousPages = () => {
    setFilters((prev) => ({
      ...prev,
      page: (prev.page ?? 1) - 1,
    }));
  };

  return (
    <div className="flex flex-col p-3 bg-white gap-4 h-full min-h-screen">
      {/* Search and filter */}
      <div className="flex flex-col gap-4 sm:flex-row items-center">
        <Input
          className="max-w-72 border border-neutral-500 px-3 py-2 rounded-md"
          type="search"
          placeholder={"What are you looking for"}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === "") {
              handleSearch("");
            }
          }}
          onKeyDown={handleKeyDown}
        />

        <Button
          onClick={() => setShowFilter(true)}
          className="max-w-32 border-neutral-500"
          variant={"outline"}
        >
          <span>Filter</span>
          <Filter />
        </Button>
      </div>

      <OrderFilter
        open={showFilter}
        onOpenChange={setShowFilter}
        filterOptions={filters}
        setFilterOptions={setFilters}
      />

      {/* Table - list of users */}
      <div className="flex-1 overflow-x-auto">
        <OrderTable
          loading={loading}
          orders={allOrdersData.records}
          handleAction={updateOrderLineStatus}
        />
      </div>

      {/* Sticky Footer */}
      <div className="mt-auto w-full flex justify-between items-center p-4">
        <div className="text-sm text-neutral-500">
          {filters.page} of {Math.ceil(allOrdersData.count / filters.limit)}
        </div>
        <div className="flex gap-1">
          <Button
            variant={"ghost"}
            disabled={filters.page < 2}
            onClick={handlePreviousPages}
          >
            <SquareChevronLeft size={18} />
          </Button>
          <Button
            variant={"ghost"}
            disabled={filters.page >= Math.ceil(allOrdersData.count / filters.limit)}
            onClick={handleNextPages}
          >
            <SquareChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
