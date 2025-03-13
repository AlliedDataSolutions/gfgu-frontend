import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pagination() {
  return (
    <div className="flex justify-center">
      <nav className="flex items-center gap-1">
        <Button className="w-8 h-8 flex items-center justify-center rounded-md border">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button className="w-8 h-8 flex items-center justify-center rounded-md border bg-primary text-primary-foreground">
          1
        </Button>
        <Button className="w-8 h-8 flex items-center justify-center rounded-md border">
          2
        </Button>
        <Button className="w-8 h-8 flex items-center justify-center rounded-md border">
          3
        </Button>
        <Button className="w-8 h-8 flex items-center justify-center rounded-md border">
          ...
        </Button>
        <Button className="w-8 h-8 flex items-center justify-center rounded-md border">
          8
        </Button>
        <Button className="w-8 h-8 flex items-center justify-center rounded-md border">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  )
}
