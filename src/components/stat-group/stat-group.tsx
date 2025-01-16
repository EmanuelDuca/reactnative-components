import { cn } from "@usekeyhole/utils";
import React from "react";
import { Text, TextProps, View, ViewProps } from "react-native";
import { Stat as StatGroupItem, StatProps as StatGroupItemProp } from "./stat";

/* -------------------------------------------------------------------------------------------------
 * StatGroup
 * -----------------------------------------------------------------------------------------------*/

type StatGroupProps = ViewProps;

const StatGroup = React.forwardRef<View, StatGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-col w-full gap-4", className)}
        {...props}
      />
    );
  }
);
StatGroup.displayName = "StatGroup";

/* -------------------------------------------------------------------------------------------------
 * StatGroupTitle
 * -----------------------------------------------------------------------------------------------*/

type StatGroupTitleProps = TextProps;

const StatGroupTitle = React.forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-xl font-extrabold uppercase italic text-neutral-800 dark:text-neutral-100",
          className
        )}
        {...props}
      />
    );
  }
);
StatGroupTitle.displayName = "StatGroupTitle";

/* -------------------------------------------------------------------------------------------------
 * StatGroupContent
 * -----------------------------------------------------------------------------------------------*/

type StatGroupContentProps = ViewProps;

const StatGroupContent = React.forwardRef<View, StatGroupContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("flex gap-4", className)} {...props} />
    );
  }
);
StatGroupContent.displayName = "StatGroupContent";

/* -------------------------------------------------------------------------------------------------
 * StatGroupRow
 * -----------------------------------------------------------------------------------------------*/

type StatGroupRowProps = ViewProps;

const StatGroupRow = React.forwardRef<View, StatGroupRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-row gap-8", className)}
        {...props}
      />
    );
  }
);
StatGroupRow.displayName = "StatGroupRow";

export {
  StatGroup,
  StatGroupProps,
  StatGroupTitle,
  StatGroupTitleProps,
  StatGroupContent,
  StatGroupContentProps,
  StatGroupRow,
  StatGroupRowProps,
  StatGroupItem,
  StatGroupItemProp,
};
