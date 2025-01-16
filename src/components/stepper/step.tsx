import { Check, CircleAlert, Text, TextProps, X } from "@usekeyhole/nativewind";
import { cn } from "@usekeyhole/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import {
  GestureResponderEvent,
  NativeMouseEvent,
  NativeSyntheticEvent,
  Pressable,
  PressableProps,
  View,
  ViewProps,
} from "react-native";

/* -------------------------------------------------------------------------------------------------
 * Step
 * -----------------------------------------------------------------------------------------------*/

const stepVariants = cva("gap-2", {
  variants: {
    state: {
      default: undefined,
      current: undefined,
      partialComplete: undefined,
      completed: undefined,
      failed: undefined,
    },
    direction: {
      horizontal: "flex-row items-start justify-start",
      vertical: undefined,
    },
  },
  defaultVariants: {
    state: "default",
    direction: "horizontal",
  },
});

type StepProps = PressableProps & VariantProps<typeof stepVariants>;

// Once group-{modifier} works on web the hovered and pressed classes can be changed to group-hover and group-active

const StepContext = React.createContext<{
  hovered: boolean;
  pressed: boolean;
  state: StepProps["state"];
}>({
  hovered: false,
  pressed: false,
  state: "default",
});

const Step = React.forwardRef<View, StepProps>(
  (
    {
      className,
      direction,
      disabled,
      state,
      onHoverIn,
      onHoverOut,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);
    const [pressed, setPressed] = React.useState(false);

    const handleHoverIn = React.useCallback(
      (e: NativeSyntheticEvent<NativeMouseEvent>) => {
        if (!disabled) setHovered(true);
        onHoverIn?.(e);
      },
      []
    );

    const handleHoverOut = React.useCallback(
      (e: NativeSyntheticEvent<NativeMouseEvent>) => {
        if (!disabled) setHovered(false);
        onHoverOut?.(e);
      },
      []
    );

    const handlePressIn = React.useCallback((e: GestureResponderEvent) => {
      if (!disabled) setPressed(true);
      onPressIn?.(e);
    }, []);

    const handlePressOut = React.useCallback((e: GestureResponderEvent) => {
      if (!disabled) setPressed(false);
      onPressOut?.(e);
    }, []);

    return (
      <StepContext.Provider value={{ hovered, pressed, state }}>
        <Pressable
          ref={ref}
          className={cn(stepVariants({ direction, state }), className)}
          disabled={disabled}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          {...props}
        />
      </StepContext.Provider>
    );
  }
);
Step.displayName = "Step";

/* -------------------------------------------------------------------------------------------------
 * StepStatus
 * -----------------------------------------------------------------------------------------------*/

type StepStatusProps = ViewProps;

const stepStatusVariants = cva(
  "bg-bg h-6 w-6 items-center justify-center rounded-full border transition-colors",
  {
    variants: {
      state: {
        default: "border-border bg-background",
        current: "border-border bg-background",
        partialComplete: "border-yellow-600 bg-yellow-600",
        completed: "border-green-700 bg-green-700",
        failed: "border-red-700 bg-red-700",
      },
      hovered: {
        true: undefined,
        false: undefined,
      },
      pressed: {
        true: undefined,
        false: undefined,
      },
    },
    compoundVariants: [
      // Default
      {
        state: "default",
        hovered: true,
        className: "bg-accent",
      },
      {
        state: "default",
        pressed: true,
        className: "bg-background",
      },
      // Current
      {
        state: "current",
        hovered: true,
        className: "bg-brand-50 dark:bg-brand-900",
      },
      {
        state: "current",
        pressed: true,
        className: "bg-background dark:bg-background",
      },
      // Partial complete
      {
        state: "partialComplete",
        hovered: true,
        className:
          "border-yellow-500 bg-yellow-500 dark:border-yellow-700 dark:bg-yellow-700",
      },
      {
        state: "partialComplete",
        pressed: true,
        className:
          "border-yellow-400 bg-yellow-400 dark:border-yellow-800 dark:bg-yellow-800",
      },
      // Completed
      {
        state: "completed",
        hovered: true,
        className:
          "border-green-600 bg-green-600 dark:border-green-800 dark:bg-green-800",
      },
      {
        state: "completed",
        pressed: true,
        className:
          "border-green-500 bg-green-500 dark:border-green-900 dark:bg-green-900",
      },
      // Failed
      {
        state: "failed",
        hovered: true,
        className:
          "border-red-600 bg-red-600 dark:border-red-800 dark:bg-red-800",
      },
      {
        state: "failed",
        pressed: true,
        className:
          "border-red-500 bg-red-500 dark:border-red-900 dark:bg-red-900",
      },
    ],
    defaultVariants: {
      state: "default",
    },
  }
);

const StepStatus = React.forwardRef<View, StepStatusProps>(
  ({ children, className, ...props }, ref) => {
    const { hovered, pressed, state } = React.useContext(StepContext);
    return (
      <View
        ref={ref}
        className={cn(
          stepStatusVariants({ hovered, pressed, state }),
          className
        )}
        {...props}
      >
        {children ||
          (state === "default" && <StepStatusCircle />) ||
          (state === "current" && <StepStatusCircle />) ||
          (state === "partialComplete" && (
            <StepStatusIcon>
              <CircleAlert />
            </StepStatusIcon>
          )) ||
          (state === "completed" && (
            <StepStatusIcon>
              <Check />
            </StepStatusIcon>
          )) ||
          (state === "failed" && (
            <StepStatusIcon>
              <X />
            </StepStatusIcon>
          ))}
      </View>
    );
  }
);
StepStatus.displayName = "StepStatus";

/* -------------------------------------------------------------------------------------------------
 * StepStatusIcon
 * -----------------------------------------------------------------------------------------------*/

type StepStatusIconProps = ViewProps & {
  children: JSX.Element;
};

const StepStatusIcon = ({
  children,
  className,
  ...props
}: StepStatusIconProps) => {
  return React.cloneElement(children, {
    className: cn("size-4 stroke-white stroke-2", className),
    ...props,
  });
};
StepStatusIcon.displayName = "StepStatusIcon";

/* -------------------------------------------------------------------------------------------------
 * StepStatusCircle
 * -----------------------------------------------------------------------------------------------*/

type StepStatusCircleProps = ViewProps;

const stepStatusCircleVariants = cva(
  "bg-border h-2 w-2 rounded-full transition-colors",
  {
    variants: {
      state: {
        default: "bg-neutral-100 dark:bg-neutral-600",
        current: "bg-brand-700",
        partialComplete: "bg-white",
        completed: "bg-white",
        failed: "bg-white",
      },
      hovered: {
        true: undefined,
        false: undefined,
      },
      pressed: {
        true: undefined,
        false: undefined,
      },
    },
    compoundVariants: [
      // Default
      {
        state: "default",
        hovered: true,
        className: "bg-neutral-300 dark:bg-neutral-700",
      },
      {
        state: "default",
        pressed: true,
        className: "bg-neutral-400 dark:bg-neutral-800",
      },
      // Current
      {
        state: "current",
        hovered: true,
        className: "bg-brand-600 dark:bg-brand-800",
      },
      {
        state: "current",
        pressed: true,
        className: "bg-brand-500 dark:bg-brand-900",
      },
    ],
    defaultVariants: {
      state: "default",
    },
  }
);

const StepStatusCircle = ({ className, ...props }: StepStatusCircleProps) => {
  const { hovered, pressed, state } = React.useContext(StepContext);
  return (
    <View
      className={cn(
        stepStatusCircleVariants({ hovered, pressed, state }),
        className
      )}
      {...props}
    />
  );
};
StepStatusCircle.displayName = "StepStatusCircle";

/* -------------------------------------------------------------------------------------------------
 * StepContent
 * -----------------------------------------------------------------------------------------------*/

type StepContentProps = ViewProps;

const StepContent = React.forwardRef<View, StepContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("mt-0.5 flex-1 gap-2", className)}
        {...props}
      />
    );
  }
);
StepContent.displayName = "StepContent";

/* -------------------------------------------------------------------------------------------------
 * StepText
 * -----------------------------------------------------------------------------------------------*/

type StepTextProps = TextProps;

const StepText = React.forwardRef<Text, StepTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        //ref={ref} // There is an issue when trying to forward reference
        className={cn("text-foreground text-sm", className)}
        {...props}
      />
    );
  }
);
StepText.displayName = "StepText";

export {
  Step,
  StepProps,
  StepStatus,
  StepStatusProps,
  StepStatusCircle,
  StepStatusCircleProps,
  StepStatusIcon,
  StepStatusIconProps,
  StepContent,
  StepContentProps,
  StepText,
  StepTextProps,
};
