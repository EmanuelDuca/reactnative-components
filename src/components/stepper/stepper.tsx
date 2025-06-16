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
  StepDescription as StepperDescription,
  StepDescriptionProps as StepperDescriptionProps,
  StepTitle as StepperTitle,
  StepTitleProps as StepperTitleProps,
  StepEndAdornment as StepperEndAdornment,
  StepEndAdornmentProps as StepperEndAdornmentProps,
} from "../step";
import { cva } from "class-variance-authority";

type Direction = "horizontal" | "vertical";

type StepperContextProps = {
  direction: Direction;
  card: boolean;
  weight?: StepProps["weight"];
};

const StepperContext = React.createContext<StepperContextProps>({
  direction: "horizontal",
  card: false,
  weight: undefined,
});

type StepperProps = ViewProps & Partial<StepperContextProps>;

const stepperVariants = cva("gap-4", {
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
  ({ className, direction = "horizontal", card, weight, ...props }, ref) => {
    return (
      <StepperContext.Provider value={{ direction, card: !!card, weight }}>
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

const stepperSeparatorVariants = cva("bg-accent-foreground/20", {
  variants: {
    direction: {
      horizontal: "mt-3 h-[1px] w-4",
      vertical: "h-4 w-[1px]",
    },
    card: {
      true: "my-[0px] ml-6",
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
    return (
      <View
        ref={ref}
        className={cn(stepperSeparatorVariants({ direction, card }), className)}
        {...props}
      />
    );
  }
);
StepperSeparator.displayName = "StepperSeparator";

/* -------------------------------------------------------------------------------------------------
 * StepperItem
 * -----------------------------------------------------------------------------------------------*/

type StepperItemProps = StepProps;

const StepperItem = React.forwardRef<View, StepperItemProps>(
  ({ className, weight: propWeight, ...props }, ref) => {
    const { card, weight } = React.useContext(StepperContext);
    return (
      <Step
        card={card}
        weight={propWeight ?? weight}
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);
StepperItem.displayName = "StepperItem";

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
  StepperDescription,
  StepperDescriptionProps,
  StepperTitle,
  StepperTitleProps,
  StepperEndAdornment,
  StepperEndAdornmentProps,
};
