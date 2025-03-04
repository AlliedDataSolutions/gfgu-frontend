import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-brand-300",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 text-brand-50 shadow hover:bg-brand-900/90 dark:bg-brand-50 dark:text-brand-900 dark:hover:bg-brand-50/90",
        destructive:
          "bg-rose-600 text-brand-50 shadow-sm hover:bg-rose-500/90 dark:bg-rose-900 dark:text-brand-50 dark:hover:bg-rose-900/90",
        outline:
          "border border-brand-200 bg-white shadow-sm hover:bg-brand-100 hover:text-brand-900 dark:border-brand-800 dark:bg-brand-950 dark:hover:bg-brand-800 dark:hover:text-brand-50",
        secondary:
          "bg-brand-50 text-brand-700 shadow-sm hover:bg-brand-50/80 border border-brand-700 dark:bg-brand-800 dark:text-brand-50 dark:hover:bg-brand-800/80",
        ghost:
          "hover:bg-brand-100 hover:text-brand-900 dark:hover:bg-brand-800 dark:hover:text-brand-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-brand-50",
        disabled:
          "bg-neutral-200 text-neutral-900 shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
