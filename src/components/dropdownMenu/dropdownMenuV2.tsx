"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import { cn } from "@usekeyhole/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Text, TextProps, View, ViewProps } from "react-native";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubTrigger
 * -----------------------------------------------------------------------------------------------*/

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "data-[state=open]:bg-accent flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-50 focus:dark:bg-neutral-800 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubContent
 * -----------------------------------------------------------------------------------------------*/

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 flex min-w-[8rem] flex-col gap-1 overflow-hidden rounded-md border p-1 shadow-md",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuContent
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuContentContextProps = {
  active: string | undefined;
  onChange: (value: string) => void;
};

const DropdownMenuContentContext =
  React.createContext<DropdownMenuContentContextProps>({
    active: undefined,
    onChange: () => {},
  });

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    onValueChange: (value: string) => void;
    active?: string;
  }
>(({ className, sideOffset = 4, onValueChange, active, ...props }, ref) => (
  <DropdownMenuContentContext.Provider
    value={{ active, onChange: onValueChange }}
  >
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 flex min-w-[8rem] flex-col gap-1 overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuContentContext.Provider>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItem
 * -----------------------------------------------------------------------------------------------*/

const dropdownMenuItemVariants = cva(
  "relative flex flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
  {
    variants: {
      hovered: {
        false: undefined,
        true: undefined,
      },
      active: {
        false: undefined,
        true: undefined,
      },
      disabled: {
        false: undefined,
        true: undefined,
      },
      pressed: {
        false: undefined,
        true: undefined,
      },
      validation: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      //Hovered
      { hovered: true, className: "bg-neutral-50 dark:bg-neutral-800" },
      //Active
      {
        active: true,
        className: "bg-brand-50 dark:bg-brand-800",
      },
      //Pressed
      {
        pressed: true,
        active: false,
        disabled: false,
        className: "bg-neutral-50 dark:bg-neutral-800",
      },
      //Disabled
      {
        disabled: true,
        className: "opacity-50",
      },
    ],
    defaultVariants: {
      pressed: false,
      hovered: false,
      active: false,
      disabled: false,
    },
  }
);

type DropdownMenuItemContextProps = Pick<
  VariantProps<typeof dropdownMenuItemVariants>,
  "active" | "disabled" | "hovered" | "pressed" | "validation"
>;

const DropdownMenuItemContext =
  React.createContext<DropdownMenuItemContextProps>({
    validation: false,
  });

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    value: string;
    inset?: boolean;
    validation?: boolean;
  }
>(({ className, inset, validation, value, ...props }, ref) => {
  const { active: activeItem, onChange } = React.useContext(
    DropdownMenuContentContext
  );
  const active = activeItem == value;
  return (
    <DropdownMenuItemContext.Provider value={{ validation }}>
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:dark:bg-neutral-800 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
          inset && "pl-8",
          active && "bg-brand-50 dark:bg-brand-800",
          className
        )}
        onSelect={() => onChange(value)}
        {...props}
      />
    </DropdownMenuItemContext.Provider>
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItemText
 * -----------------------------------------------------------------------------------------------*/

const dropdownMenuItemTextVariants = cva(
  "text-sm font-normal text-neutral-800 dark:text-neutral-100",
  {
    variants: {
      validation: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      // Validation
      {
        validation: true,
        className: "text-red-800 dark:text-red-100",
      },
    ],
    defaultVariants: {
      validation: false,
    },
  }
);

type DropdownMenuItemTextProps = TextProps &
  VariantProps<typeof dropdownMenuItemTextVariants>;

const DropdownMenuItemText = React.forwardRef<Text, DropdownMenuItemTextProps>(
  ({ className, ...props }, ref) => {
    const { validation } = React.useContext(DropdownMenuItemContext);
    return (
      <Text
        ref={ref}
        className={cn(dropdownMenuItemTextVariants({ validation }), className)}
        {...props}
      />
    );
  }
);
DropdownMenuItemText.displayName = "DropdownMenuItemText";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuLabel
 * -----------------------------------------------------------------------------------------------*/

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "text-foreground px-2.5 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSeparator
 * -----------------------------------------------------------------------------------------------*/

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("bg-muted -mx-1 my-0 h-px", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuEndAdornment
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuEndAdornmentProps = ViewProps;

const DropdownMenuEndAdornment = React.forwardRef<
  View,
  DropdownMenuEndAdornmentProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-1 flex-row items-center justify-end gap-2",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuEndAdornment.displayName = "DropdownMenuEndAdornment";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuIcon
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuIconProps = ViewProps & {
  children?: JSX.Element;
};

const DropdownMenuIcon = ({
  className,
  children,
  ...props
}: DropdownMenuIconProps) => {
  const { validation } = React.useContext(DropdownMenuItemContext);
  const styles = cn(
    "stroke-neutral-800 dark:stroke-neutral-100 ",
    validation && "stroke-red-700 dark:stroke-red-700 ",
    className
  );

  if (children) {
    return React.cloneElement(children, {
      className: styles,
      ...props,
    });
  } else {
    return null;
  }
};
DropdownMenuIcon.displayName = "DropdownMenuIcon";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuEndAdornment,
  DropdownMenuEndAdornmentProps,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuIcon,
  DropdownMenuIconProps,
  DropdownMenuItemText,
  DropdownMenuItemTextProps,
};
