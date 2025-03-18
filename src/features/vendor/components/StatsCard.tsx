import { SparkLineChart } from "@/components/ui/chart"

const sparklineData = [{ value: 40 }, { value: 60 }, { value: 45 }, { value: 65 }, { value: 55 }, { value: 50 }]

interface StatsCardProps {
  title: string
  value: string
  change: string
  sparklineColor: string
  bgColor: string
}

export default function StatsCard({ title, value, change, sparklineColor, bgColor }: StatsCardProps) {
  return (
    <div className={`p-6 ${bgColor} rounded-md`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-neutral-600">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Since last week <span className="text-red-500">{change} ▼</span>
          </p>
        </div>
        <div className="w-24 h-12">
          <SparkLineChart
            data={sparklineData}
            index="value"
            categories={["value"]}
            colors={[sparklineColor]}
            className="h-12"
          />
        </div>
      </div>
    </div>
  )
}

