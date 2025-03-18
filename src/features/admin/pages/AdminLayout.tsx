import { useState, useEffect } from "react";
import Sidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/features/context/AuthContext";
import { Role } from "@/core/role";

export function AdminLayout() {
  const [activeMenu, setActiveMenu] = useState("manage-users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const name = user?.firstName + " " + user?.lastName;
  const role = user?.role ?? Role.admin;

  // Initialize sidebar state based on screen size and update on resize
  useEffect(() => {
    const handleResize = () => {
      // On desktop, sidebar should be open by default
      // On mobile, sidebar should be closed by default
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader
          title={
            activeMenu === "manage-users"
              ? "Manage Users"
              : activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)
          }
          toggleSidebar={toggleSidebar}
          name={name}
          role={role}
        />
        <main className="flex-1 overflow-y-auto p-4 bg-neutral-100">
          {/* {activeMenu === "manage-users" && <ManageUsers />} */}
          {/* Add other components for different menu items */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
