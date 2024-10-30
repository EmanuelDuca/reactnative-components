import React from "react";
import {
  PressableProps,
  View,
  ViewProps,
  useWindowDimensions,
} from "react-native";
import { Menu } from "./navigation-menu";
import { cn } from "@usekeyhole/utils";

/* -------------------------------------------------------------------------------------------------
 * Sidebar
 * -----------------------------------------------------------------------------------------------*/

type SidebarProps = ViewProps & {
  selectedValue: string;
  onChange: (value: string) => void;
  displayBorder?: boolean;
};

const Sidebar = React.forwardRef<ViewProps, SidebarProps>(
  (
    { className, selectedValue, onChange, displayBorder = true, ...props },
    ref
  ) => {
    return (
      <View className="h-full w-full flex flex-row">
        <Menu
          value={selectedValue}
          onChange={onChange}
          className={cn("gap-0 flex flex-col h-full w-full ", className)}
          {...props}
        />
        {displayBorder && <View className="w-px h-full bg-neutral-200" />}
      </View>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * SidebarHeader
 * -----------------------------------------------------------------------------------------------*/

type SidebarHeaderProps = ViewProps;

const SidebarHeader = React.forwardRef<View, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("px-6 py-8 pb-0", className)} {...props}>
        <View className="px-3">{children}</View>
      </View>
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

/* -------------------------------------------------------------------------------------------------
 * SidebarFooter
 * -----------------------------------------------------------------------------------------------*/

type SidebarFooterProps = ViewProps;

const SidebarFooter = React.forwardRef<View, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} className={cn("p-4", className)} {...props} />;
  }
);
SidebarFooter.displayName = "SidebarFooter";

/* -------------------------------------------------------------------------------------------------
 * SidebarContent
 * -----------------------------------------------------------------------------------------------*/

type SidebarContentProps = ViewProps;

const SidebarContent = React.forwardRef<View, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex grow px-6 py-8 gap-2", className)}
        {...props}
      />
    );
  }
);
SidebarContent.displayName = "SidebarContent";

/* -------------------------------------------------------------------------------------------------
 * SidebarGroup
 * -----------------------------------------------------------------------------------------------*/

type AlignProps = "start" | "end";

type SidebarGroupProps = ViewProps & {
  align?: AlignProps;
};

const SidebarGroup = React.forwardRef<View, SidebarGroupProps>(
  ({ className, align = "start", ...props }, ref) => {
    const alignmentClass = align === "start" ? "" : "grow justify-end";

    return (
      <View
        ref={ref}
        className={cn(`gap-2 ${alignmentClass}`, className)}
        {...props}
      />
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";

/* -------------------------------------------------------------------------------------------------
 * SidebarSeparator
 * -----------------------------------------------------------------------------------------------*/

type SidebarSeparatorProps = ViewProps & {
  color?: string;
};

const SidebarSeparator = React.forwardRef<View, SidebarSeparatorProps>(
  ({ className, children, color, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("h-px w-full bg-neutral-200", className)}
        {...props}
      />
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";

export {
  Sidebar,
  SidebarProps,
  SidebarHeader,
  SidebarHeaderProps,
  SidebarContent,
  SidebarContentProps,
  SidebarFooter,
  SidebarFooterProps,
  SidebarGroup,
  SidebarGroupProps,
  SidebarSeparator,
  SidebarSeparatorProps,
};
