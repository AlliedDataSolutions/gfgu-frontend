"use client";
import {
  Package, // Icon for Orders
  MapPin, // Icon for Addresses
  Lock, // Icon for Login & Security
  LogOut,
  X,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuth } from "@/features/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CustomerSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(""); // State to track active menu
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { logout } = useAuth();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Update activeMenu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const menuItem = menuItems.find(item => currentPath.startsWith(item.path));
    if (menuItem) {
      setActiveMenu(menuItem.id);
    } else {
      // Default or fallback active menu item if needed
      // Example: Set the first item as active if no match
      // setActiveMenu(menuItems[0]?.id || '');
    }
  }, [location.pathname]); // Re-run effect when path changes

  const menuItems = [
    {
      id: "orders",
      label: "Orders",
      icon: <Package size={16} />,
      path: paths.account.orders.path,
    },
    {
      id: "addresses",
      label: "Your Addresses",
      icon: <MapPin size={16} />,
      path: paths.account.address.path, // Using account.address path
    },
    {
      id: "login-security",
      label: "Login & Security",
      icon: <Lock size={16} />,
      path: paths.account.personalInfo.path, // Using account.personalInfo path
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
              <div className="bg-white rounded-full h-8 w-8"></div> {/* Placeholder logo */}
              {isOpen && <span className="font-medium">Growing Ground</span>}
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
                    setActiveMenu(item.id); // Update active menu on click
                    if (isMobile) {
                      setIsOpen(false);
                    }
                  }}
                  className={({ isActive }) => // Use isActive from NavLink
                    cn(
                      "flex items-center mx-4 px-2 rounded-lg py-3 text-left transition-colors",
                      isActive // Use isActive to determine active state
                        ? "bg-brand-700"
                        : "hover:bg-brand-600"
                    )
                  }
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
            onClick={() => {
              logout();
              navigate(paths.landing.path, { replace: true });
            }}
            className="flex items-center text-white hover:text-neutral-300 transition-colors"
          >
            <LogOut size={14} />
            {isOpen && <span className="ml-3">Log Out</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
