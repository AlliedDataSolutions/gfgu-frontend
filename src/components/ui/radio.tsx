import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Set the unselected radio button dimensions and style
        "relative h-[20px] w-[20px] rounded-full border border-zinc-200 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="absolute inset-0">
        {/* Outer green circle with Figma border-radius of 16px */}
        <div className="absolute inset-0 rounded-[16px] bg-[#09DE13]" />
        {/* Inner white ellipse positioned using 30% offsets */}
        <div className="absolute left-[30%] right-[30%] top-[30%] bottom-[30%] rounded-full bg-white" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
