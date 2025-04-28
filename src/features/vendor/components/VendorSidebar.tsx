"use client";
import {
  // LayoutDashboard,
  Box,
  ShoppingCart,
  CreditCard,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuth } from "@/features/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function VendorSidebar({
  activeMenu,
  setActiveMenu,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const menuItems = [
    // {
    //   id: "dashboard",
    //   label: "Dashboard",
    //   icon: <LayoutDashboard size={16} />,
    //   path: paths.vendor.dashboard.path,
    // },
    {
      id: "product",
      label: "Product",
      icon: <Box size={16} />,
      path: paths.vendor.products.path,
    },
    {
      id: "order",
      label: "Order",
      icon: <ShoppingCart size={16} />,
      path: paths.vendor.orders.path,
    },
    {
      id: "payment",
      label: "Payment",
      icon: <CreditCard size={16} />,
      path: paths.vendor.payment.path,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={16} />,
      path: paths.vendor.profile.path,
    },
  ];

  const handleCollapse = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "bg-brand-800 text-white transition-all duration-300 flex flex-col fixed md:relative z-20",
          isOpen
            ? "w-64 translate-x-0"
            : isMobile
            ? "w-64 -translate-x-full"
            : "w-20 translate-x-0",
          "h-full"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <Link to={paths.landing.path}>
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full h-8 w-8"></div>
              {isOpen && <span className="font-medium">Vendor Portal</span>}
            </div>
          </Link>
          {isOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCollapse}
              className="text-white hover:bg-brand-700"
            >
              {isMobile ? <X size={14} /> : <ChevronLeft size={14} />}
            </Button>
          )}
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (isMobile) setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center mx-4 px-2 rounded-lg py-3 text-left transition-colors",
                    activeMenu === item.id
                      ? "bg-brand-700"
                      : "hover:bg-brand-600"
                  )}
                >
                  <span className="flex items-center">
                    {item.icon}
                    {isOpen && (
                      <span className="ml-3 text-sm">{item.label}</span>
                    )}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <Button
            variant={"link"}
            className="flex items-center text-white hover:text-neutral-300 transition-colors"
            onClick={() => {
              logout();
              navigate(paths.landing.path, { replace: true });
            }}
          >
            <LogOut size={14} />
            {isOpen && <span className="ml-3">Log Out</span>}
          </Button>
        </div>

        {/* Collapse toggle button for desktop */}
        {!isMobile && (
          <div className="p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center text-white hover:bg-brand-700 rounded"
            >
              {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
