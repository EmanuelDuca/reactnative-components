import { cn } from "@usekeyhole/utils";
import React from "react";
import { Text, TextProps, View, ViewProps } from "react-native";

/* -------------------------------------------------------------------------------------------------
 * Stat
 * -----------------------------------------------------------------------------------------------*/

type StatProps = ViewProps;

const Stat = React.forwardRef<View, StatProps>(
  ({ className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("flex-1 gap-1", className)} {...props} />
    );
  }
);
Stat.displayName = "Stat";

/* -------------------------------------------------------------------------------------------------
 * StatLabel
 * -----------------------------------------------------------------------------------------------*/

type StatLabelProps = TextProps;

const StatLabel = React.forwardRef<Text, TextProps>(
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
StatLabel.displayName = "StatLabel";

/* -------------------------------------------------------------------------------------------------
 * StatNumber
 * -----------------------------------------------------------------------------------------------*/

type StatNumberProps = TextProps;

const StatNumber = React.forwardRef<Text, TextProps>(
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
StatNumber.displayName = "StatNumber";

export {
  Stat,
  StatProps,
  StatLabel,
  StatLabelProps,
  StatNumber,
  StatNumberProps,
};
