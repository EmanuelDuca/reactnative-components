import { cn } from "@usekeyhole/utils";
import * as React from "react";
import { View, ViewProps } from "react-native";
import {
  Step as StepperItem,
  StepProps as StepperItemProps,
  StepStatus,
  StepStatusProps,
  StepContent,
  StepContentProps,
  StepText,
  StepTextProps,
} from "./step";
type Direction = "horizontal" | "vertical";

type StepperContextProps = {
  direction: Direction;
};

const StepperContext = React.createContext<StepperContextProps>({
  direction: "horizontal",
});

type StepperProps = ViewProps & {
  direction?: Direction;
};

const Stepper = React.forwardRef<View, StepperProps>(
  ({ className, direction = "horizontal", ...props }, ref) => {
    const classNameChildren = direction == "horizontal" && "flex flex-row";
    return (
      <StepperContext.Provider value={{ direction }}>
        <View
          ref={ref}
          className={cn("gap-4", classNameChildren, className)}
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

const StepperSeparator = React.forwardRef<View, StepperSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    const { direction } = React.useContext(StepperContext);
    const classNameChildren =
      direction == "vertical"
        ? "w-[1px] h-4 ml-[11px]"
        : "w-4 h-[1px] mt-[11px]";
    return (
      <View
        ref={ref}
        className={cn("bg-neutral-200", classNameChildren, className)}
        {...props}
      />
    );
  }
);

export {
  Stepper,
  StepperProps,
  StepperSeparator,
  StepperSeparatorProps,
  StepperItem,
  StepperItemProps,
  StepStatus,
  StepStatusProps,
  StepContent,
  StepContentProps,
  StepText,
  StepTextProps,
};
