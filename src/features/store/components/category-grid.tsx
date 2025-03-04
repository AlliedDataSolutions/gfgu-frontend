import { useRef } from "react"
import type { CategoryType } from "@/components/models/type"

interface CategoryGridProps {
  categories: CategoryType[],
  selectCategory: (category: CategoryType) => void
}

export default function CategoryGrid({ categories, selectCategory }: CategoryGridProps) {

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = current.clientWidth * 0.8

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (

    <div className="relative">
      {/* Scrollable Category Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-200"
      >
        {categories?.map((category) => (
          <div
            key={category.id}
            onClick={() => selectCategory(category)}
            className="flex-shrink-0 w-48 h-48 relative border border-gray-200 rounded-lg group cursor-pointer flex items-center justify-center bg-gray-100"
          >
            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Centered Category Type */}
            <span className="text-xl font-bold text-black group-hover:text-black transition-colors">
              {category.type}
            </span>
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white shadow-md hover:bg-green-600 transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white shadow-md hover:bg-green-600 transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>

  )
}
