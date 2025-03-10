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
import {
  Text,
  TextProps,
  CircleAlertBold,
  XBold,
  CheckBold,
} from "@usekeyhole/nativewind";
import { useControllableState } from "@usekeyhole/hooks";

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
    card: {
      true: "p-4 rounded-lg bg-neutral-100",
      false: undefined,
    },
  },
  compoundVariants: [
    {
      card: true,
      state: "completed",
      className: "bg-transparent",
    },
    {
      card: true,
      state: "current",
      className: "bg-brand-50",
    },
  ],
  defaultVariants: {
    state: "default",
    direction: "horizontal",
    card: false,
  },
});

type StepProps = PressableProps &
  VariantProps<typeof stepVariants> & {
    pressed?: boolean;
    hovered?: boolean;
  };

// Once group-{modifier} works on web the hovered and pressed classes can be changed to group-hover and group-active

const StepContext = React.createContext<
  Pick<StepProps, "hovered" | "pressed" | "state">
>({
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
      hovered: isHovered,
      onHoverIn,
      onHoverOut,
      onPressIn,
      onPressOut,
      onPress,
      pressed: isPressed,
      state,
      card,
      ...props
    },
    ref
  ) => {
    const [pressed, setPressed] = useControllableState({
      prop: isPressed,
      defaultProp: false,
    });
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
    });

    const handleHoverIn = React.useCallback(
      (e: NativeSyntheticEvent<NativeMouseEvent>) => {
        if (!disabled && !!onPress) setHovered(true);
        onHoverIn?.(e);
      },
      [onPress, disabled, onHoverIn]
    );

    const handleHoverOut = React.useCallback(
      (e: NativeSyntheticEvent<NativeMouseEvent>) => {
        if (!disabled && !!onPress) setHovered(false);
        onHoverOut?.(e);
      },
      [onPress, disabled, onHoverOut]
    );

    const handlePressIn = React.useCallback(
      (e: GestureResponderEvent) => {
        if (!disabled && !!onPress) setPressed(true);
        onPressIn?.(e);
      },
      [onPress, disabled, onPressIn]
    );

    const handlePressOut = React.useCallback(
      (e: GestureResponderEvent) => {
        if (!disabled && !!onPress) setPressed(false);
        onPressOut?.(e);
      },
      [onPress, disabled, onPressOut]
    );

    return (
      <StepContext.Provider
        value={{
          hovered: !!hovered,
          pressed: !!pressed,
          state,
        }}
      >
        <Pressable
          ref={ref}
          className={cn(
            stepVariants({ direction, state, card }),
            { "cursor-default": !onPress && disabled },
            className
          )}
          disabled={disabled}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
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
  "size-5 items-center justify-center rounded-full border transition-colors",
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
              <CircleAlertBold />
            </StepStatusIcon>
          )) ||
          (state === "completed" && (
            <StepStatusIcon>
              <CheckBold />
            </StepStatusIcon>
          )) ||
          (state === "failed" && (
            <StepStatusIcon>
              <XBold />
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
    className: cn("size-3 stroke-white", className),
    ...props,
  });
};
StepStatusIcon.displayName = "StepStatusIcon";

/* -------------------------------------------------------------------------------------------------
 * StepStatusCircle
 * -----------------------------------------------------------------------------------------------*/

type StepStatusCircleProps = ViewProps;

const stepStatusCircleVariants = cva(
  "bg-border size-2 rounded-full transition-colors",
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

const StepText = React.forwardRef<React.ElementRef<typeof Text>, StepTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        className={cn("text-foreground text-sm", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
StepText.displayName = "StepText";

/* -------------------------------------------------------------------------------------------------
 * StepEndAdornment
 * -----------------------------------------------------------------------------------------------*/

type StepEndAdornmentProps = ViewProps;

const StepEndAdornment = React.forwardRef<View, StepEndAdornmentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("justify-center h-full", className)}
        {...props}
      />
    );
  }
);
StepEndAdornment.displayName = "StepEndAdornment";

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
  StepEndAdornment,
  StepEndAdornmentProps,
};
