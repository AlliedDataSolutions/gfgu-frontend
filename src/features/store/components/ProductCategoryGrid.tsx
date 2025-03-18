import { useEffect, useRef, useState } from "react";
import type { ProductCategory } from "@/components/models/type";
import { MoveLeft, MoveRight } from "lucide-react";
import Apple from "@/assets/apple.png";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  categories: ProductCategory[];
  selectCategory: (category: ProductCategory) => void;
}

export default function ProductCategoryGrid({
  categories,
}: //selectCategory,
CategoryGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Update scroll progress when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        const scrollableWidth = scrollWidth - clientWidth;

        // Calculate progress percentage (0 to 100)
        const progress =
          scrollableWidth > 0 ? (scrollLeft / scrollableWidth) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Initialize progress
      handleScroll();

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* {Title and arrow left and right} */}
      <div className="flex justify-between">
        <div className="flex flex-col space-y-2">
          <div className="mb-2 text-brand-700 font-medium">Category</div>
          <h2 className="text-2xl md:text-xl">Shop By Category</h2>
        </div>

        <div className="flex justify-between items-center">
          <div className="hidden md:flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white border-neutral-200 hover:bg-neutral-100 transition-colors"
              aria-label="Scroll left"
            >
              <MoveLeft size={14} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors"
              aria-label="Scroll right"
            >
              <MoveRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable categories */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide pb-4 mt-6 rounded-lg"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={cn(
              "w-[250px] flex-shrink-0 border-t border-b border-r border-brand-600",
              index === 0 && "border-l",
              index === 0 && "rounded-l-lg",
              index === categories.length - 1 && "rounded-r-lg"
            )}
          >
            <div className="p-4 flex flex-col items-center">
              <div className="relative w-28 h-28 mb-4">
                <img
                  src={category.imageUrl ?? Apple}
                  alt={category.type}
                  className="object-contain"
                />
              </div>
              <h3 className="text-center font-medium">{category.type}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator bar that progresses with scroll */}
      <div className="mt-6 w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-700 rounded-full transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
