import StatsCard from "../components/StatsCard";
import VendorChart from "../components/VendorChart";

export function VendorDashboard() {
  return (
    <div className="p-6 min-h-screen bg-neutral-50">
      <main className="space-y-6 max-w-7xl mx-auto ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Product Sold"
            value="$166,580"
            change="5%"
            sparklineColor="#E11D48"
            bgColor="bg-rose-50"
          />
          <StatsCard
            title="Total Revenue"
            value="$166,580"
            change="5%"
            sparklineColor="#18A0FB"
            bgColor="bg-blue-50"
          />
          <StatsCard
            title="Total Products"
            value="300"
            change="5%"
            sparklineColor="#AF52DE"
            bgColor="bg-purple-50"
          />
        </div>

        {/* Chart Section */}

        <VendorChart />
      </main>
    </div>
  );
}
