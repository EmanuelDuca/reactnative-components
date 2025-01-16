import { cn } from "@usekeyhole/utils";
import React from "react";
import { Text, TextProps, View, ViewProps } from "react-native";

/* -------------------------------------------------------------------------------------------------
 * StatisticsHeader
 * -----------------------------------------------------------------------------------------------*/

type StatisticsHeaderProps = ViewProps;

const StatisticsHeader = React.forwardRef<View, StatisticsHeaderProps>(
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
StatisticsHeader.displayName = "StatisticsHeader";

/* -------------------------------------------------------------------------------------------------
 * StatisticsHeaderTitle
 * -----------------------------------------------------------------------------------------------*/

type StatisticsHeaderTitleProps = TextProps;

const StatisticsHeaderTitle = React.forwardRef<Text, TextProps>(
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

/* -------------------------------------------------------------------------------------------------
 * StatisticsHeaderContent
 * -----------------------------------------------------------------------------------------------*/

type StatisticsHeaderContentProps = ViewProps;

const StatisticsHeaderContent = React.forwardRef<
  View,
  StatisticsHeaderContentProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("flex flex-row gap-8", className)}
      {...props}
    />
  );
});
StatisticsHeaderContent.displayName = "StatisticsHeaderContent";

/* -------------------------------------------------------------------------------------------------
 * StatisticsHeaderItem
 * -----------------------------------------------------------------------------------------------*/

type StatisticsHeaderItemProps = ViewProps;

const StatisticsHeaderItem = React.forwardRef<View, StatisticsHeaderItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("flex-1 gap-1", className)} {...props} />
    );
  }
);
StatisticsHeaderItem.displayName = "StatisticsHeaderItem";

/* -------------------------------------------------------------------------------------------------
 * StatisticsHeaderLabel
 * -----------------------------------------------------------------------------------------------*/

type StatisticsHeaderLabelProps = TextProps;

const StatisticsHeaderLabel = React.forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-sm font-semibold text-neutral-500 dark:text-neutral-400",
          className
        )}
        {...props}
      />
    );
  }
);
StatisticsHeaderLabel.displayName = "StatisticsHeaderLabel";

/* -------------------------------------------------------------------------------------------------
 * StatisticsHeaderNumber
 * -----------------------------------------------------------------------------------------------*/

type StatisticsHeaderNumberProps = TextProps;

const StatisticsHeaderNumber = React.forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-3xl font-extrabold uppercase italic text-neutral-800 dark:text-neutral-100",
          className
        )}
        {...props}
      />
    );
  }
);
StatisticsHeaderNumber.displayName = "StatisticsHeaderNumber";

export {
  StatisticsHeader,
  StatisticsHeaderProps,
  StatisticsHeaderTitle,
  StatisticsHeaderTitleProps,
  StatisticsHeaderContent,
  StatisticsHeaderContentProps,
  StatisticsHeaderItem,
  StatisticsHeaderItemProps,
  StatisticsHeaderLabel,
  StatisticsHeaderLabelProps,
  StatisticsHeaderNumber,
  StatisticsHeaderNumberProps,
};
