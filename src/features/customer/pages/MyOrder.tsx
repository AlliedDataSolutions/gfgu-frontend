import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import axiosInstance from "@/core/axiosInstance";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Constants
const ITEMS_PER_PAGE = 5;

// Interfaces
interface OrderLine {
  id: string;
  quantity: number;
  unitPrice: string;
  product: {
    id: string;
    name: string;
    description: string;
    images?: any[];
  };
  vendor: {
    id: string;
    businessName: string;
  };
}

interface CustomerOrder {
  id: string;
  orderDate: string;
  requiredDate: string | null;
  shippedDate: string | null;
  status: string;
  orderLines: OrderLine[];
  orderAddress?: {
    addressLine1: string;
    city: string;
  };
  payment?: {
    amount: number;
    paymentDate: string;
  };
}

interface OrderFilterData {
  status?: string;
  startDate?: string;
  endDate?: string;
}

interface OrderFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterData: OrderFilterData;
  setFilterData: (data: OrderFilterData) => void;
}

// Order Filter Component
function OrderFilter({ open, onOpenChange, filterData, setFilterData }: OrderFilterProps) {
  const [localFilter, setLocalFilter] = useState<OrderFilterData>(filterData);

  const handleInputChange = (
    field: keyof OrderFilterData,
    value: string
  ) => {
    setLocalFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    setFilterData(localFilter);
    onOpenChange(false);
  };

  const handleReset = () => {
    const resetData: OrderFilterData = {};
    setLocalFilter(resetData);
    setFilterData(resetData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[305px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Orders</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Status Filter */}
          <div className="flex flex-col">
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Input
              id="status"
              type="text"
              placeholder="e.g. pending, confirmed, shipped, delivered"
              value={localFilter.status || ""}
              onChange={(e) => handleInputChange("status", e.target.value)}
            />
          </div>
          
          {/* Date Range */}
          <div className="flex gap-2">
            <div className="flex flex-col">
              <Label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={localFilter.startDate || ""}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={localFilter.endDate || ""}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Component
export const MyOrder = () => {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState<OrderFilterData>({});
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/order/history", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search and filterData
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search filter on order ID or product names
      const matchesSearch = searchQuery
        ? order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderLines.some(line => 
            line.product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;
      
      // Status filter
      const matchesStatus = filterData.status
        ? order.status.toLowerCase() === filterData.status.toLowerCase()
        : true;
      
      // Date filters
      const orderDate = new Date(order.orderDate);
      const matchesStartDate = filterData.startDate
        ? orderDate >= new Date(filterData.startDate)
        : true;
      const matchesEndDate = filterData.endDate
        ? orderDate <= new Date(filterData.endDate)
        : true;

      return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [orders, searchQuery, filterData]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const pageCount = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return "bg-blue-50 text-blue-600";
      case 'shipped':
        return "bg-amber-50 text-amber-600";
      case 'delivered':
        return "bg-green-50 text-green-600";
      case 'canceled':
        return "bg-red-50 text-red-600";
      case 'pending':
        return "bg-neutral-50 text-neutral-600";
      default:
        return "bg-neutral-50 text-neutral-600";
    }
  };

  // Get status message based on status
  const getStatusMessage = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return "Your order has been confirmed";
      case 'shipped':
        return "Your order has been shipped";
      case 'delivered':
        return "Your product has been delivered";
      case 'canceled':
        return "Your order has been canceled";
      case 'pending':
        return "Your order is pending";
      default:
        return "Order status: " + status;
    }
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input
            type="search"
            placeholder="Search orders..."
            className="max-w-xs border border-neutral-300 px-3 py-2 rounded-md"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white"
        >
          Filter Orders
          <Filter size={16} />
        </Button>
      </div>

      {/* Order Filter Dialog */}
      <OrderFilter
        open={showFilter}
        onOpenChange={setShowFilter}
        filterData={filterData}
        setFilterData={(data) => {
          setFilterData(data);
          setCurrentPage(0);
        }}
      />

      {/* Orders Cards */}
      {loading ? (
        <p className="text-center py-8">Loading orders...</p>
      ) : paginatedOrders.length === 0 ? (
        <p className="text-center py-8">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {paginatedOrders.map((order) => (
            <div key={order.id} className="border rounded-md overflow-hidden">
              {order.orderLines.map((line, index) => (
                <div key={index} className="p-4 border-b last:border-b-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image (if available) */}
                    <div className="w-20 h-20 bg-neutral-100 rounded flex items-center justify-center">
                      {line.product.images && line.product.images.length > 0 ? (
                        <img 
                          src={line.product.images[0].url} 
                          alt={line.product.name}
                          className="max-w-full max-h-full object-contain" 
                        />
                      ) : (
                        <div className="w-12 h-12 bg-neutral-200 rounded"></div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium">{line.product.name}</h3>
                      <p className="text-sm text-neutral-500">
                        Sold by {line.vendor.businessName}
                      </p>
                      
                      {/* Status Badge and Message */}
                      <div className="mt-2">
                        <span 
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <p className="mt-1 text-sm">{getStatusMessage(order.status)}</p>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold">${(Number(line.unitPrice) * line.quantity).toFixed(2)}</p>
                      {line.quantity > 1 && (
                        <p className="text-xs text-neutral-500">
                          {line.quantity} x ${Number(line.unitPrice).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-6">
              <Pagination 
                pageCount={pageCount} 
                handlePageClick={handlePageChange} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
