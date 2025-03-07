import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  return (
    <div className="flex justify-center">
      <nav className="flex items-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border bg-primary text-primary-foreground">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">2</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">3</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">...</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">8</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}