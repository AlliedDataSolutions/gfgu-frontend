import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { X } from "lucide-react";
import VendorMenu from "@/features/vendor/components/VendorMenu"; // Importing the VendorMenu component

export function VendorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/auth/logout");
  };

  // Map page paths to their respective titles
  const pageTitles: Record<string, string> = {
    "/vendor": "Dashboard",
    "/vendor/orders": "Orders",
    "/vendor/products": "Products",
    "/vendor/payment": "Payment",
    "/vendor/profile": "Profile",
  };

  // Determine the title based on the current path
  const currentPageTitle = pageTitles[location.pathname] || "Vendor Panel";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 w-[352px] h-screen bg-[#0A7110] border-r border-gray-200">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-3 p-8">
              <div className="w-8 h-8 rounded-full bg-white" />
              <span className="text-white font-medium text-lg">Vendor</span>
            </div>
            <nav className="flex flex-col space-y-2 px-8">
              <NavLink
                to={paths.vendor.dashboard.getHref()}
                end
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to={paths.vendor.products.getHref()}
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                }
              >
                Products
              </NavLink>
              <NavLink
                to={paths.vendor.orders.getHref()}
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                }
              >
                Orders
              </NavLink>
              <NavLink
                to="/vendor/payment"
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                }
              >
                Payment
              </NavLink>
              <NavLink
                to="{paths.vendor.profile.getHref()}"
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                }
              >
                Profile
              </NavLink>
            </nav>
          </div>
          <div className="px-8 pb-8">
            <button
              onClick={handleLogout}
              className="block w-full py-3 text-white rounded-md hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <aside className="fixed top-0 left-0 w-64 h-full bg-[#0A7110] border-r border-gray-200 p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white" />
                    <span className="text-white font-medium text-lg">Vendor</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="text-white">
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col space-y-2">
                  <NavLink
                    to={paths.vendor.dashboard.getHref()}
                    end
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to={paths.vendor.products.getHref()}
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to={paths.vendor.orders.getHref()}
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="{paths.vendor.payment.getHref()}"
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Payment
                  </NavLink>
                  <NavLink
                    to="{paths.vendor.profile.getHref()}"
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-green-700 font-bold" : "hover:bg-green-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Profile
                  </NavLink>
                </nav>
              </div>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="block w-full py-3 text-white rounded-md hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[352px] flex flex-col">
        {/* Top Bar using VendorMenu */}
        <VendorMenu title={currentPageTitle} />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
