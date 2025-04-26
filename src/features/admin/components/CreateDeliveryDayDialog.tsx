import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface CreateDeliveryDayDialogProps {
  createDeliveryDay: (city: string, deliveryday: string) => void;
}

const CreateDeliveryDayDialog: React.FC<CreateDeliveryDayDialogProps> = ({
  createDeliveryDay,
}) => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [deliveryday, setDeliveryday] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSubmit = () => {
    createDeliveryDay(city, deliveryday);
    setOpen(false);
    setCity("");
    setDeliveryday("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Delivery Day</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Delivery Day</DialogTitle>
          <DialogDescription>
            Add a new delivery day to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              value={city}
              className="min-w-max"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deliveryday" className="text-right">
              Delivery Day
            </Label>
            <Select onValueChange={setDeliveryday}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeliveryDayDialog;
