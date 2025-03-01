// src/components/ui/switch.tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    // Base styling:
    // - Fixed dimensions: 48px x 28px (using arbitrary values)
    // - Rounded corners of 40px to match the Figma design.
    // - Transition and focus styles remain similar.
    // Background colors are set using data attribute variants:
    // - Enabled: On = #09DE13, Off = #D1D1D1.
    // - Disabled: On = #B0B0B0, Off = #E7E7E7.
    className={cn(
      "peer inline-flex w-[48px] h-[28px] shrink-0 items-center rounded-[40px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      // Enabled state colors:
      "data-[state=checked]:bg-[#09DE13] data-[state=unchecked]:bg-[#D1D1D1]",
      // Disabled state colors and pointer:
      "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-[#B0B0B0] disabled:data-[state=unchecked]:bg-[#E7E7E7]",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      // Thumb styling:
      // - Fixed size: 24px × 24px, white background with a subtle shadow.
      // - When off, it is positioned 2px from the left.
      // - When on, it translates to 22px (48 - 24 - 2) to sit 2px from the right.
      className={cn(
        "pointer-events-none block w-[24px] h-[24px] rounded-full bg-white shadow transition-transform",
        "data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
