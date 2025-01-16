import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@usekeyhole/utils";

import {
  GestureResponderEvent,
  NativeMouseEvent,
  NativeSyntheticEvent,
  Pressable,
  PressableProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { Check, CircleAlert, X } from "@usekeyhole/nativewind";

type StepperProps = ViewProps;

const Stepper = React.forwardRef<View, StepperProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn(className)} {...props} />
  )
);
Stepper.displayName = "Stepper";

const stepperItemVariants = cva("gap-2", {
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

type StepperItemProps = PressableProps &
  VariantProps<typeof stepperItemVariants>;

// Once group-{modifier} works on web the hovered and pressed classes can be changed to group-hover and group-active

const StepperItemContext = React.createContext<{
  hovered: boolean;
  pressed: boolean;
  state: StepperItemProps["state"];
}>({
  hovered: false,
  pressed: false,
  state: "default",
});

const StepperItem = React.forwardRef<View, StepperItemProps>(
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
      <StepperItemContext.Provider value={{ hovered, pressed, state }}>
        <Pressable
          ref={ref}
          className={cn(stepperItemVariants({ direction, state }), className)}
          disabled={disabled}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          {...props}
        />
      </StepperItemContext.Provider>
    );
  }
);
StepperItem.displayName = "StepperItem";

type StepperStatusProps = ViewProps;

const stepperStatusVariants = cva(
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

const StepperStatus = React.forwardRef<View, StepperStatusProps>(
  ({ children, className, ...props }, ref) => {
    const { hovered, pressed, state } = React.useContext(StepperItemContext);
    return (
      <View
        ref={ref}
        className={cn(
          stepperStatusVariants({ hovered, pressed, state }),
          className
        )}
        {...props}
      >
        {children ||
          (state === "default" && <StepperStatusCircle />) ||
          (state === "current" && <StepperStatusCircle />) ||
          (state === "partialComplete" && (
            <StepperStatusIcon>
              <CircleAlert />
            </StepperStatusIcon>
          )) ||
          (state === "completed" && (
            <StepperStatusIcon>
              <Check />
            </StepperStatusIcon>
          )) ||
          (state === "failed" && (
            <StepperStatusIcon>
              <X />
            </StepperStatusIcon>
          ))}
      </View>
    );
  }
);

StepperStatus.displayName = "StepperStatus";

type StepperContentProps = ViewProps;

const StepperContent = React.forwardRef<View, StepperContentProps>(
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

StepperContent.displayName = "StepperContent";

type StepperTextProps = TextProps;

const StepperText = React.forwardRef<Text, StepperTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-foreground text-sm", className)}
        {...props}
      />
    );
  }
);
StepperText.displayName = "StepperText";

type StepperStatusCircleProps = ViewProps;

const stepperStatusCircleVariants = cva(
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

const StepperStatusCircle = ({
  className,
  ...props
}: StepperStatusCircleProps) => {
  const { hovered, pressed, state } = React.useContext(StepperItemContext);
  return (
    <View
      className={cn(
        stepperStatusCircleVariants({ hovered, pressed, state }),
        className
      )}
      {...props}
    />
  );
};

StepperStatusCircle.displayName = "StepperStatusCircle";

type StepperStatusIconProps = ViewProps & {
  children: JSX.Element;
};

const StepperStatusIcon = ({
  children,
  className,
  ...props
}: StepperStatusIconProps) => {
  return React.cloneElement(children, {
    className: cn("size-4 stroke-white stroke-2", className),
    ...props,
  });
};

/* -------------------------------------------------------------------------------------------------
 * StepperSeparator
 * -----------------------------------------------------------------------------------------------*/

type Direction = "horizontal" | "vertical";

type StepperSeparatorProps = ViewProps & {
  direction?: Direction;
};

const StepperSeparator = React.forwardRef<View, StepperSeparatorProps>(
  ({ className, children, direction = "horizontal", ...props }, ref) => {
    const classNameChildren =
      direction == "vertical" ? "w-[1px] h-4" : "w-4 h-[1px]";
    return (
      <View
        className={cn("bg-neutral-200", classNameChildren, className)}
        {...props}
      />
    );
  }
);

export {
  Stepper,
  StepperContent,
  StepperContentProps,
  StepperProps,
  StepperStatus,
  StepperStatusCircle,
  StepperStatusCircleProps,
  StepperStatusIcon,
  StepperStatusIconProps,
  StepperStatusProps,
  StepperItem,
  StepperItemProps,
  StepperText,
  StepperTextProps,
  StepperSeparator,
  StepperSeparatorProps,
};
