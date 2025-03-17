import { cn } from "@usekeyhole/utils";
import * as React from "react";
import { View, ViewProps } from "react-native";
import {
  Step,
  StepProps,
  StepStatus as StepperStatus,
  StepStatusProps as StepperStatusProps,
  StepContent as StepperContent,
  StepContentProps as StepperContentProps,
  StepText as StepperText,
  StepTextProps as StepperTextProps,
  StepEndAdornment as StepperEndAdornment,
  StepEndAdornmentProps as StepperEndAdornmentProps,
} from "./step";
import { cva } from "class-variance-authority";

type Direction = "horizontal" | "vertical";

type StepperContextProps = {
  direction: Direction;
  card: boolean;
};

const StepperContext = React.createContext<StepperContextProps>({
  direction: "horizontal",
  card: false,
});

type StepperProps = ViewProps & {
  direction?: Direction;
  card?: boolean;
};

const stepperVariants = cva("gap-4 ", {
  variants: {
    direction: {
      horizontal: "flex flex-row",
      vertical: "",
    },
    card: {
      true: "gap-0",
      false: undefined,
    },
  },
  defaultVariants: {
    direction: "horizontal",
    card: false,
  },
});

const Stepper = React.forwardRef<View, StepperProps>(
  ({ className, direction = "horizontal", card, ...props }, ref) => {
    const classNameChildren = direction == "horizontal" && "flex flex-row";
    return (
      <StepperContext.Provider value={{ direction, card: !!card }}>
        <View
          ref={ref}
          className={cn(stepperVariants({ direction, card }), className)}
          {...props}
        />
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = "Stepper";

/* -------------------------------------------------------------------------------------------------
 * StepperSeparator
 * -----------------------------------------------------------------------------------------------*/

type StepperSeparatorProps = ViewProps;

const stepperSeparatorVariants = cva("bg-neutral-200", {
  variants: {
    direction: {
      horizontal: "w-4 h-[1px] mt-[11px]",
      vertical: "w-[1px] h-4 ml-[11px]",
    },
    card: {
      true: "my-[0px] ml-[25px]",
      false: undefined,
    },
  },
  defaultVariants: {
    direction: "horizontal",
    card: false,
  },
});

const StepperSeparator = React.forwardRef<View, StepperSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    const { direction, card } = React.useContext(StepperContext);

    const classNameChildren =
      direction == "vertical"
        ? "w-[1px] h-4 ml-[11px]"
        : "w-4 h-[1px] mt-[11px]";

    return (
      <View
        ref={ref}
        className={cn(stepperSeparatorVariants({ direction, card }), className)}
        {...props}
      />
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * StepperItem
 * -----------------------------------------------------------------------------------------------*/

type StepperItemProps = StepProps;

const StepperItem = React.forwardRef<View, StepperItemProps>(
  ({ className, ...props }, ref) => {
    const { card } = React.useContext(StepperContext);
    return <Step card={card} ref={ref} className={className} {...props} />;
  }
);

export {
  Stepper,
  StepperProps,
  StepperSeparator,
  StepperSeparatorProps,
  StepperItem,
  StepperItemProps,
  StepperStatus,
  StepperStatusProps,
  StepperContent,
  StepperContentProps,
  StepperText,
  StepperTextProps,
  StepperEndAdornment,
  StepperEndAdornmentProps,
};
