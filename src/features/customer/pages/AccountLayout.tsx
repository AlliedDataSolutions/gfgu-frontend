import { Link, Outlet } from "react-router-dom";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { menuItems } from "@/core/data";

export default function AccountLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <Header menuItems={[]} />

      {/* Main Content */}
      <div className="flex-grow bg-neutral-50 py-4">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-4">
            <Link to="/">Shop</Link>
            <span className="mx-1">/</span>
            <span className="text-gray-600">Account</span>
          </nav>

          {/* Layout with Side Panel and Main Content */}
          <div className="flex gap-6">
            {/* Side Panel */}
            <aside className="w-64 min-h-[524px] bg-green-800 text-white rounded p-4">
              {/* Profile Section */}
              <div className="bg-green-900 rounded p-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white overflow-hidden" />
                  <div>
                    <p className="text-sm">Welcome 👋</p>
                    <p className="text-lg font-medium">John Doe</p>
                  </div>
                </div>
              </div>

              {/* Side Panel Menu */}
              <Link
                to="/account/address"
                className="block px-4 py-2 rounded mb-2 hover:bg-green-700"
              >
                Account Settings
              </Link>
              <Link
                to="/account/orders"
                className="block px-4 py-2 rounded hover:bg-green-700"
              >
                My Orders
              </Link>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-white p-4 rounded shadow-sm">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      {/* Common Footer */}
      <Footer menuItems={menuItems} />
    </div>
  );
}
