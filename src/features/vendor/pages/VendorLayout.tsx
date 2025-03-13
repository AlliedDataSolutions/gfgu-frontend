import { NavLink, Outlet } from "react-router-dom";
import { paths } from "@/config/paths";

export function VendorLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[352px] h-screen bg-[#0A7110] border-r border-gray-200">
        <div className="flex flex-col items-center py-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            {/* Replace with your actual logo */}
            <div className="w-8 h-8 rounded-full bg-white" />
            <span className="text-white font-medium text-lg">Vendor</span>
          </div>
          {/* Vendor Menu */}
          <nav className="mt-12 w-full">
            <NavLink
              to={paths.vendor.dashboard.getHref()}
              end
              className={({ isActive }) =>
                `block w-full px-6 py-3 text-white rounded-md mb-2 ${
                  isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to={paths.vendor.products.getHref()}
              className={({ isActive }) =>
                `block w-full px-6 py-3 text-white rounded-md mb-2 ${
                  isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"
                }`
              }
            >
              Manage Products
            </NavLink>
            <NavLink
              to={paths.vendor.addProduct.getHref()}
              className={({ isActive }) =>
                `block w-full px-6 py-3 text-white rounded-md mb-2 ${
                  isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"
                }`
              }
            >
              Add Product
            </NavLink>
            <NavLink
              to={paths.vendor.analytics.getHref()}
              className={({ isActive }) =>
                `block w-full px-6 py-3 text-white rounded-md ${
                  isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"
                }`
              }
            >
              Analytics
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* Place any notification/profile icons here */}
            <div className="w-10 h-10 rounded-full bg-gray-300" />
          </div>
        </header>
        {/* Outlet renders nested vendor pages */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
