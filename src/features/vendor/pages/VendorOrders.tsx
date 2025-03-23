import { useState, useEffect } from "react";
import axiosInstance from "@/core/axiosInstance";
import VendorOrderFilter, { VendorOrderFilterData } from "../components/VendorOrderFilter";
import VendorOrderTable, { VendorOrder } from "../components/VendorOrderTable";
import { useAuth } from "@/features/context/AuthContext";
import { Button } from "@/components/ui/button";

export function VendorOrders() {
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(0);
  const ITEMS_PER_PAGE = 5;
  const pageCount = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/order/vendor/orderline/");
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleFilter = (data: VendorOrderFilterData) => {
    let result = [...orders];

    if (data.status) {
      result = result.filter((ord) => ord.status === data.status);
    }
    if (data.productSearch) {
      const searchTerm = data.productSearch.toLowerCase();
      result = result.filter((ord) =>
        ord.product.name.toLowerCase().includes(searchTerm)
      );
    }
    if (data.minQty !== undefined) {
      result = result.filter((ord) => ord.quantity >= (data.minQty ?? 0));
    }
    if (data.maxQty !== undefined) {
        result = result.filter((ord) => ord.quantity <= (data.maxQty ?? Number.MAX_VALUE));
    }
    if (data.minAmount !== undefined) {
        result = result.filter((ord) => ord.totalAmount >= (data.minAmount ?? 0));
    }
    if (data.maxAmount !== undefined) {
        result = result.filter((ord) => ord.totalAmount <= (data.maxAmount ?? Number.MAX_VALUE));
    }
    if (data.keyword) {
      const keyword = data.keyword.toLowerCase();
      result = result.filter(
        (ord) =>
          ord.id.toLowerCase().includes(keyword) ||
          ord.product.name.toLowerCase().includes(keyword)
      );
    }

    setFilteredOrders(result);
    setCurrentPage(0);
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="p-4 bg-white border border-neutral-50 rounded-lg">
      <h2 className="text-xl text-neutral-600 mb-4">Vendor Orders</h2>
      <div className="flex justify-between items-center mb-4">
        <Button variant="default" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      {showFilters && (
        <div className="mb-4">
          <VendorOrderFilter onFilter={handleFilter} />
        </div>
      )}
      {loading ? (
        <p className="mt-4">Loading orders...</p>
      ) : (
        <VendorOrderTable
          orders={currentOrders}
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageClick}
        />
      )}
    </div>
  );
}
