import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export interface VendorOrderFilterData {
  status?: string;
  productSearch?: string;
  minQty?: number;
  maxQty?: number;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  keyword?: string;
}

interface VendorOrderFilterProps {
  onFilter: (data: VendorOrderFilterData) => void;
}

export default function VendorOrderFilter({ onFilter }: VendorOrderFilterProps) {
  const { register, handleSubmit, reset } = useForm<VendorOrderFilterData>({
    defaultValues: {},
  });

  const onSubmit = (data: VendorOrderFilterData) => {
    onFilter(data);
  };

  const handleReset = () => {
    reset();
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border border-neutral-200 rounded-lg">
      <div className="flex flex-wrap gap-4">
        {/* Status Filter */}
        <div className="w-40">
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select onValueChange={(value) => onFilter({ status: value === "all" ? "" : value })}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Product Search */}
        <div className="w-48">
          <label className="block text-sm font-medium mb-1">Product</label>
          <Input type="text" {...register("productSearch")} placeholder="Search product..." />
        </div>
        {/* Quantity Range */}
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Min Qty</label>
            <Input type="number" {...register("minQty")} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Qty</label>
            <Input type="number" {...register("maxQty")} placeholder="999" />
          </div>
        </div>
        {/* Date Range */}
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input type="date" {...register("startDate")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input type="date" {...register("endDate")} />
          </div>
        </div>
        {/* Amount Range */}
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Min $</label>
            <Input type="number" step="0.01" {...register("minAmount")} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max $</label>
            <Input type="number" step="0.01" {...register("maxAmount")} placeholder="9999" />
          </div>
        </div>
      </div>
      {/* Keyword Search */}
      <div className="w-64">
        <label className="block text-sm font-medium mb-1">Keyword</label>
        <Input type="text" {...register("keyword")} placeholder="Search..." />
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Button type="submit" variant="default">
          Filter
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
