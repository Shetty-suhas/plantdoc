import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      side="right"
      align="start"
      className={cn(
        "z-[9999] max-w-sm overflow-hidden rounded-lg border-2 border-black bg-white px-3 py-2 text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] duration-200 animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      <TooltipPrimitive.Arrow
        className="fill-white stroke-black stroke-2"
        width={11}
        height={5}
      />
      {props.children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
