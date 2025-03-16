import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface AdminHeaderProps {
  title: string
  toggleSidebar: () => void
}

export default function AdminHeader({ title, toggleSidebar }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2" aria-label="Toggle sidebar">
          <Menu size={5} />
        </Button>
        <h1 className="text-xl">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell size={5} />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">2</Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar> */}
          <div className="hidden md:block">
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-neutral-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}

