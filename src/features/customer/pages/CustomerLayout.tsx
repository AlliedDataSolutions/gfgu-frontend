import { useState, useEffect } from "react";
import CustomerSidebar from "@/features/customer/components/CustomerSidebar"; // Using alias path
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/context/AuthContext";
import { Role } from "@/core/role";
import { Menu } from "lucide-react"; // Import Menu icon for toggle
import { Button } from "@/components/ui/button"; // Import Button for toggle
import { paths } from "@/config/paths"; // Import paths for title logic

// Helper function to get title from path
const getTitleFromPath = (pathname: string): string => {
  if (pathname.startsWith(paths.account.orders.path)) return "Your Orders";
  if (pathname.startsWith(paths.account.address.path)) return "Your Addresses";
  if (pathname.startsWith(paths.account.personalInfo.path)) return "Login & Security";
  // Add more mappings as needed
  return "Account"; // Default title
};


export function CustomerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation(); // Get current location

  const name = user ? `${user.firstName} ${user.lastName}` : "Customer";
  const role = user?.role ?? Role.customer; // Assuming customer role if not specified
  const title = getTitleFromPath(location.pathname); // Get title based on current path

  // Initialize sidebar state based on screen size and update on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Open on desktop, closed on mobile
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      <CustomerSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Simplified Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden" // Only show toggle on smaller screens where sidebar is collapsible
            >
              <Menu size={20} />
            </Button>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Basic user info - can be expanded later */}
            <span className="text-sm font-medium hidden sm:inline">{name}</span>
            {/* Add user avatar/icon if available */}
          </div>
        </header>
        {/* End Simplified Header */}

        <main className="flex-1 overflow-y-auto p-4 bg-neutral-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
