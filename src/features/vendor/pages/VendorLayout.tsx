import { useState, useEffect } from "react";
import VendorSidebar from "../components/VendorSidebar";
import VendorHeader from "../components/VendorHeader";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/features/context/AuthContext";
import { Role } from "@/core/role";

export function VendorLayout() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const name = user?.firstName + " " + user?.lastName;
  const role = user?.role ?? Role.vendor;

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      <VendorSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <VendorHeader
          title={
            activeMenu === "dashboard"
              ? "Dashboard"
              : activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)
          }
          toggleSidebar={toggleSidebar}
          name={name}
          role={role}
        />
        <main className="flex-1 overflow-y-auto p-4 bg-neutral-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
