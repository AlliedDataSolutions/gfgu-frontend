import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/context/AuthContext";

interface VendorMenuProps {
  title: string;
}

export default function VendorMenu({ title }: VendorMenuProps) {
  const { user } = useAuth();

  return (
    <div className="relative w-full bg-white border-b border-neutral-100">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Dynamic Page Title */}
        <h2 className="text-2xl font-semibold text-black">{title}</h2>
        {/* Right: Vendor Info and Notification Icon */}
        <div className="flex items-center gap-4">
          {/* Profile Image wrapped in a Link */}
          <Link to={paths.landing.getHref()}>
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={(user as any)?.vendor?.profileImage || "/placeholder-profile.png"}
                alt="Vendor Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <span className="text-base font-medium text-black">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
          {/* Notification Icon */}
          <Button variant="link">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5.036"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
