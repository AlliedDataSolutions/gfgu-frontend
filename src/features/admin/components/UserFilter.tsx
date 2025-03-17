import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterUsers } from "../hooks/useManageUser";
import { Role } from "@/core/role";

interface UserFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterOptions: FilterUsers;
  setFilterOptions: (options: FilterUsers) => void;
}

export default function UserFilter({
  open,
  onOpenChange,
  filterOptions,
  setFilterOptions,
}: UserFilterProps) {
  // Local state to track changes before applying
  const [localFilterOptions, setLocalFilterOptions] =
    useState<FilterUsers>(filterOptions);

  // Reset local state when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setLocalFilterOptions(filterOptions);
    }
    onOpenChange(newOpen);
  };

  const handleAccountChange = (value: Role) => {
    setLocalFilterOptions((prev) => {
      const accounts = prev.account.includes(value)
        ? prev.account.filter((a) => a !== value)
        : [...prev.account, value];

      return { ...prev, account: accounts };
    });
  };

  const handleStatusChange = (value: string) => {
    setLocalFilterOptions((prev) => {
      const statuses = prev.status.includes(value)
        ? prev.status.filter((s) => s !== value)
        : [...prev.status, value];

      return { ...prev, status: statuses };
    });
  };

  const handleApply = () => {
    setFilterOptions(localFilterOptions);
    onOpenChange(false);
  };

  const handleReset = () => {
    const resetOptions: FilterUsers = {
      account: [],
      status: [],
    };
    setLocalFilterOptions(resetOptions);
    setFilterOptions(resetOptions);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[305px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Users</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Account Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="account-vendor"
                  checked={localFilterOptions.account.includes(Role.vendor)}
                  onCheckedChange={() => handleAccountChange(Role.vendor)}
                />
                <Label htmlFor="account-vendor">Vendor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="account-customer"
                  checked={localFilterOptions.account.includes(Role.customer)}
                  onCheckedChange={() => handleAccountChange(Role.customer)}
                />
                <Label htmlFor="account-customer">Customer</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-sm font-medium">Status</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="status-active"
                  checked={localFilterOptions.status.includes("active")}
                  onCheckedChange={() => handleStatusChange("active")}
                />
                <Label htmlFor="status-active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="status-disabled"
                  checked={localFilterOptions.status.includes("disabled")}
                  onCheckedChange={() => handleStatusChange("disabled")}
                />
                <Label htmlFor="status-disabled">Disabled</Label>
              </div>
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
