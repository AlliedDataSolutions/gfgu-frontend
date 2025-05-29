import { useEffect, useState, useMemo } from "react";
import axiosInstance from "@/core/axiosInstance";
import OrderCard from "@/features/common/components/OrderCard";
import VendorOrderFilter, {
  VendorOrderFilterData,
} from "../components/VendorOrderFilter";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface RawOrderLine {
  id: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  product?: {
    id: string;
    name: string;
    images?: { url: string }[];
  };
  order: {
    id: string;
    orderDate?: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

const ITEMS_PER_PAGE = 5;

export function VendorOrders() {
  const [orders, setOrders] = useState<RawOrderLine[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState<VendorOrderFilterData>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/order/vendor/orderline");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const groupedOrders = useMemo(() => {
    const groups = orders.reduce((acc: Record<string, RawOrderLine[]>, item) => {
      const orderId = item.order?.id;
      if (!orderId) return acc;
      if (!acc[orderId]) acc[orderId] = [];
      acc[orderId].push(item);
      return acc;
    }, {});
    return Object.entries(groups);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return groupedOrders.filter(([_, lines]) => {
      const productMatches = searchQuery
        ? lines.some((line) =>
            line.product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;

      const statusMatches = filterData.status
        ? lines.some((line) =>
            line.status.toLowerCase() === filterData.status?.toLowerCase()
          )
        : true;

      const amountMatches = lines.every((line) => {
        const amount = line.unitPrice * line.quantity;
        return (
          (!filterData.minAmount || amount >= filterData.minAmount) &&
          (!filterData.maxAmount || amount <= filterData.maxAmount)
        );
      });

      const qtyMatches = lines.every((line) => {
        return (
          (!filterData.minQty || line.quantity >= filterData.minQty) &&
          (!filterData.maxQty || line.quantity <= filterData.maxQty)
        );
      });

      const dateMatches = lines.every((line) => {
        const orderDate = new Date(line.order?.orderDate ?? "");
        return (
          (!filterData.startDate || orderDate >= new Date(filterData.startDate)) &&
          (!filterData.endDate || orderDate <= new Date(filterData.endDate))
        );
      });

      return productMatches && statusMatches && amountMatches && qtyMatches && dateMatches;
    });
  }, [groupedOrders, searchQuery, filterData]);

  const paginatedOrders = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const pageCount = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="search"
          placeholder="Search orders"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0);
          }}
          className="max-w-xs border border-neutral-300 px-3 py-2 rounded-md"
        />
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
      <VendorOrderFilter
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
        <div className="space-y-6">
          {paginatedOrders.map(([orderId, lines]) => {
            const firstLine = lines[0];
            if (!firstLine) return null;

            const orderDate = firstLine.order?.orderDate
              ? new Date(firstLine.order.orderDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "-";

            const shipTo = `${firstLine.order.user.firstName} ${firstLine.order.user.lastName}`;
            const totalAmount = lines.reduce((sum, l) => sum + l.totalAmount, 0);

            const items = lines.map((line) => ({
              productId: line.product?.id ?? "",
              name: line.product?.name ?? "Unknown product",
              imageUrl: line.product?.images?.[0]?.url ?? "",
            }));

            return (
              <OrderCard
                key={orderId}
                orderId={orderId}
                orderDate={orderDate}
                totalAmount={totalAmount}
                shipTo={shipTo}
                items={items}
              />
            );
          })}
          {pageCount > 1 && (
            <div className="mt-6">
              <Pagination pageCount={pageCount} handlePageClick={handlePageChange} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
