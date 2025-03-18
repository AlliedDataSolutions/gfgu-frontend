import { Button } from "@/components/ui/button";
import { Role } from "@/core/role";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { Menu } from "lucide-react";

interface AdminHeaderProps {
  name: string;
  role: Role;
  title: string;
  toggleSidebar: () => void;
}

export default function AdminHeader({
  name,
  role,
  title,
  toggleSidebar,
}: AdminHeaderProps) {
  const navigate = useNavigate();
  const navigateToStore = () => {
    navigate(paths.store.listing.path);
  };
  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2"
          aria-label="Toggle sidebar"
        >
          <Menu size={5} />
        </Button>
        <h1 className="text-lg">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="link" onClick={navigateToStore}>
          Store
        </Button>
        {/* <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell size={5} />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
            2
          </Badge>
        </div> */}

        <div className="flex items-center gap-3">
          {/* <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar> */}
          <div className="hidden md:block">
            <div className="font-medium">{name}</div>
            <div className="text-xs text-neutral-500">{role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
