import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@usekeyhole/utils";

type PopoverProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Root
>;
const Popover = PopoverPrimitive.Root;

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>;
const PopoverTrigger = PopoverPrimitive.Trigger;

type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border border-border p-4 shadow-md outline-none",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow asChild>
    <div
      ref={ref}
      className={cn(
        "border-border bg-popover relative -top-2 h-4 w-4 rotate-45 border-b border-r",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Arrow>
));
PopoverArrow.displayName = "PopoverArrow";

export {
  Popover,
  PopoverProps,
  PopoverTrigger,
  PopoverTriggerProps,
  PopoverContent,
  PopoverContentProps,
  PopoverArrow,
};
