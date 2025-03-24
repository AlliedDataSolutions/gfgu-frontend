import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface VendorOrderFilterData {
  status?: string;
  productSearch?: string;
  minQty?: number;
  maxQty?: number;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

interface VendorOrderFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterData: VendorOrderFilterData;
  setFilterData: (data: VendorOrderFilterData) => void;
}

export default function VendorOrderFilter({
  open,
  onOpenChange,
  filterData,
  setFilterData,
}: VendorOrderFilterDialogProps) {
  const [localFilter, setLocalFilter] =
    useState<VendorOrderFilterData>(filterData);

  const handleInputChange = (
    field: keyof VendorOrderFilterData,
    value: string | number
  ) => {
    setLocalFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    setFilterData(localFilter);
    onOpenChange(false);
  };

  const handleReset = () => {
    const resetData: VendorOrderFilterData = {};
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
              placeholder="e.g. pending"
              value={localFilter.status || ""}
              onChange={(e) =>
                handleInputChange("status", e.target.value)
              }
            />
          </div>
          {/* Product Search */}
          <div className="flex flex-col">
            <Label htmlFor="productSearch" className="text-sm font-medium">
              Product
            </Label>
            <Input
              id="productSearch"
              type="text"
              placeholder="Search product..."
              value={localFilter.productSearch || ""}
              onChange={(e) =>
                handleInputChange("productSearch", e.target.value)
              }
            />
          </div>
          {/* Quantity Range */}
          <div className="flex gap-2">
            <div className="flex flex-col">
              <Label htmlFor="minQty" className="text-sm font-medium">
                Min Qty
              </Label>
              <Input
                id="minQty"
                type="number"
                placeholder="0"
                value={localFilter.minQty || ""}
                onChange={(e) =>
                  handleInputChange("minQty", Number(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="maxQty" className="text-sm font-medium">
                Max Qty
              </Label>
              <Input
                id="maxQty"
                type="number"
                placeholder="999"
                value={localFilter.maxQty || ""}
                onChange={(e) =>
                  handleInputChange("maxQty", Number(e.target.value))
                }
              />
            </div>
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
                onChange={(e) =>
                  handleInputChange("startDate", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("endDate", e.target.value)
                }
              />
            </div>
          </div>
          {/* Amount Range */}
          <div className="flex gap-2">
            <div className="flex flex-col">
              <Label htmlFor="minAmount" className="text-sm font-medium">
                Min $
              </Label>
              <Input
                id="minAmount"
                type="number"
                step="0.01"
                placeholder="0"
                value={localFilter.minAmount || ""}
                onChange={(e) =>
                  handleInputChange("minAmount", Number(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="maxAmount" className="text-sm font-medium">
                Max $
              </Label>
              <Input
                id="maxAmount"
                type="number"
                step="0.01"
                placeholder="9999"
                value={localFilter.maxAmount || ""}
                onChange={(e) =>
                  handleInputChange("maxAmount", Number(e.target.value))
                }
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
