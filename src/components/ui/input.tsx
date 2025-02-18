import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-slate-400 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-brand-950 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-brand-800 dark:file:text-brand-50 dark:placeholder:text-brand-400 dark:focus-visible:ring-brand-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
