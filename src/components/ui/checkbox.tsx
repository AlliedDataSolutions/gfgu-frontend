import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base styles for light mode
      "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-300 shadow",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked state for light mode
      "data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500 data-[state=checked]:text-white",
      // Dark mode base styles
      "dark:border-neutral-700 dark:bg-neutral-900 dark:focus-visible:ring-brand-400",
      // Checked state for dark mode
      "dark:data-[state=checked]:bg-brand-400 dark:data-[state=checked]:border-brand-400 dark:data-[state=checked]:text-white",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }