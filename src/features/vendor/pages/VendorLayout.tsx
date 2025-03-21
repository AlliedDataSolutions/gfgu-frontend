import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { Menu, X } from "lucide-react";

export function VendorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/logout");
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 w-[352px] h-screen bg-[#0A7110] border-r border-neutral-200">
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
                  `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/vendor/products"
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/vendor/orders"
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                }
              >
                Orders
              </NavLink>
              <NavLink
                to="/vendor/payment"
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                }
              >
                Payment
              </NavLink>
              <NavLink
                to="/vendor/profile"
                className={({ isActive }) =>
                  `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
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
          <aside className="fixed top-0 left-0 w-64 h-full bg-[#0A7110] border-r border-neutral-200 p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white" />
                    <span className="text-white font-medium text-lg">Vendor</span>
                  </div>
                  {/* Close button */}
                  <button onClick={() => setSidebarOpen(false)} className="text-white">
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col space-y-2">
                  <NavLink
                    to={paths.vendor.dashboard.getHref()}
                    end
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/vendor/products"
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/vendor/orders"
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/vendor/payment"
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Payment
                  </NavLink>
                  <NavLink
                    to="/vendor/profile"
                    className={({ isActive }) =>
                      `block py-3 text-white rounded-md ${isActive ? "bg-brand-700 font-bold" : "hover:bg-brand-700"}`
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
        {/* Top Bar */}
        <header className="flex justify-between items-center bg-white border-b border-neutral-200 px-4 py-4 md:px-8">
          {/* If sidebar is open, show close (X) icon, otherwise show menu (☰) */}
          <button
            className="md:hidden text-neutral-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-300" />
          </div>
        </header>
        {/* Main content scrolls here */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
