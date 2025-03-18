import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data
const monthlyData = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 8000 },
  { name: "Mar", value: 32000 },
  { name: "Apr", value: 35000 },
  { name: "May", value: 58000 },
  { name: "Jun", value: 55000 },
  { name: "Jul", value: 58000 },
  { name: "Aug", value: 72000 },
  { name: "Sep", value: 62000 },
  { name: "Oct", value: 28000 },
  { name: "Nov", value: 98000 },
  { name: "Dec", value: 9000 },
];

export default function VendorChart() {
  return (
    <div className="bg-white  rounded-md">
      <div className="flex p-4 flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Select defaultValue="sales">
            <SelectTrigger className="w-[180px] border-0 bg-transparent">
              <SelectValue placeholder="Select report" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales Report</SelectItem>
              <SelectItem value="revenue">Revenue Report</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-2">
            <span className="text-2xl font-bold">$11,642</span>
            <span className="text-brand-500 ml-2 text-sm">
              +3.4% from last period
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto">
          <div className="flex gap-2 flex-wrap">
            <Button variant="ghost" size="sm">
              Day
            </Button>
            <Button variant="ghost" size="sm">
              Week
            </Button>
            <Button variant="ghost" size="sm">
              Month
            </Button>
            <Button variant="ghost" size="sm" className="text-brand-600">
              Year
            </Button>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-[300px] mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <XAxis
              dataKey="name"
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Bar dataKey="value" fill="#04910C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
