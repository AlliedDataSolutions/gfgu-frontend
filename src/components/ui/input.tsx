import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode; // Accepts any icon component
  onIconClick?: () => void; // Optional click handler for the icon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, onIconClick, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-neutral-100 bg-neutral-50 px-3 py-1 pr-10 text-base transition-colors placeholder:text-grey-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-brand-800 dark:placeholder:text-brand-400 dark:focus-visible:ring-brand-300",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            onClick={onIconClick}
          >
            {icon}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
