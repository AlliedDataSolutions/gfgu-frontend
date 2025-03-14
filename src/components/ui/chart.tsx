import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

export {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
};

interface SparkLineChartProps {
  data: any[];
  index?: string;
  categories?: string[];
  colors?: string[];
  className?: string;
  color?: string;
}

export function SparkLineChart({
  data,
  // index = "name",
  categories = ["value"],
  colors = ["hsl(var(--chart-1))"],
  className,
  color,
}: SparkLineChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={color || colors[i % colors.length]}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
