import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface OrderFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterOptions: {
    productName?: string;
    productDescription?: string;
    vendorId?: string;
    orderDate?: Date | undefined;
  };
  setFilterOptions: (filterOptions: any) => void;
}

const OrderFilter = ({
  open,
  onOpenChange,
  filterOptions,
  setFilterOptions,
}: OrderFilterProps) => {
  const [date, setDate] = useState<Date | undefined>(filterOptions.orderDate);

  const handleApplyFilters = () => {
    setFilterOptions({
      orderDate: date,
    });
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setDate(undefined);
    setFilterOptions({
      orderDate: undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-full">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>Apply filters to the orders.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="orderDate" className="text-right">
              Order Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date("2020-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={handleResetFilters}>
            Reset
          </Button>
          <Button type="submit" onClick={handleApplyFilters}>
            Apply filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFilter;
