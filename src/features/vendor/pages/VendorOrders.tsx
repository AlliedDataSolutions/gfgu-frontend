import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter,Download } from "lucide-react";
import axiosInstance from "@/core/axiosInstance";
import VendorOrderTable, { VendorOrder } from "../components/VendorOrderTable";
import VendorOrderFilter, {
  VendorOrderFilterData,
} from "../components/VendorOrderFilter";
import { onExport } from "@/lib/utils";

const ITEMS_PER_PAGE = 8;

export function VendorOrders() {
  const [allOrders, setAllOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState<VendorOrderFilterData>({});
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch all orders from backend (no filtering here)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/order/vendor/orderline");
      // Backend returns an array of order lines.
      setAllOrders(response.data);
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search and filterData (client-side filtering)
  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      // Search filter on product name (adjust as needed)
      const matchesSearch = searchQuery
        ? order.product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      // Status filter
      const matchesStatus = filterData.status
        ? order.status.toLowerCase() === filterData.status.toLowerCase()
        : true;
      // Product search filter (if different from searchQuery, you can combine or separate)
      const matchesProduct = filterData.productSearch
        ? order.product.name
            .toLowerCase()
            .includes(filterData.productSearch.toLowerCase())
        : true;
      // Quantity filters
      const matchesMinQty =
        filterData.minQty !== undefined
          ? order.quantity >= filterData.minQty
          : true;
      const matchesMaxQty =
        filterData.maxQty !== undefined
          ? order.quantity <= filterData.maxQty
          : true;
      // Amount filters
      const totalAmount = order.unitPrice * order.quantity;
      const matchesMinAmount =
        filterData.minAmount !== undefined
          ? totalAmount >= filterData.minAmount
          : true;
      const matchesMaxAmount =
        filterData.maxAmount !== undefined
          ? totalAmount <= filterData.maxAmount
          : true;
      // Date filters: assuming order.orderDate exists as a valid date string.
      const orderDate = order.orderDate ? new Date(order.orderDate) : null;
      const matchesStartDate =
        filterData.startDate && orderDate
          ? orderDate >= new Date(filterData.startDate)
          : true;
      const matchesEndDate =
        filterData.endDate && orderDate
          ? orderDate <= new Date(filterData.endDate)
          : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProduct &&
        matchesMinQty &&
        matchesMaxQty &&
        matchesMinAmount &&
        matchesMaxAmount &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [allOrders, searchQuery, filterData]);

  // Pagination: determine orders for current page
  const paginatedOrders = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const pageCount = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Reset to first page on new search
      setCurrentPage(0);
    }
  };

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const columnMapping = {
    "id": "Order ID",
    "customerName": "Customer Name",
    "customerPhoneNumber": "Customer Phone Number",
    "productName": "Product Name",
    "productPrice": "Product Price",
    "qty": "Qty",
    "status": "Status",
  }

  return (
    <div className="p-4 bg-white h-full flex flex-col gap-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          type="search"
          placeholder="Search orders..."
          className="max-w-xs border border-neutral-500 px-3 py-2 rounded-md"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0);
          }}
          onKeyDown={handleKeyDown}
        />

        <Button variant={"outline"} className="flex gap-1 border-neutral-500"
          onClick={() => {
            const excelRecord: any[] = [];
            paginatedOrders.forEach((element: any) => {
              excelRecord.push({
                id: element.id,
                customerName: `${element.user.firstName} ${element.user.lastName}`,
                customerPhoneNumber: element.user.phoneNumber ? element.user.phoneNumber : "-",
                customerEmail: element.user.email,
                productName: element.product.name,
                productPrice: element.unitPrice,
                qty: element.quantity,
                status: element.status,
              });
            });

            onExport(columnMapping, excelRecord, "Vendor_Order_Report.xlsx");
          }}
        >
          <Download size={16} /> Export
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2"
        >
          Filter
          <Filter />
        </Button>
      </div>

      {/* Vendor Order Filter Dialog */}
      <VendorOrderFilter
        open={showFilter}
        onOpenChange={setShowFilter}
        filterData={filterData}
        setFilterData={(data) => {
          setFilterData(data);
          setCurrentPage(0);
        }}
      />

      {/* Orders Table */}
      {loading ? (
        <p>Loading orders...</p>
      ) : paginatedOrders.length === 0 ? (
        <p className="mt-4 text-center">No orders found.</p>
      ) : (
        <VendorOrderTable
          orders={paginatedOrders}
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
