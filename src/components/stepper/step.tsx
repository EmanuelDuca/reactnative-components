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

const stepVariants = cva("h-fit gap-2 transition-colors", {
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
      true: "bg-muted/25 rounded-lg p-4",
      false: undefined,
    },
    pressed: {
      true: undefined,
      false: undefined,
    },
    hovered: {
      true: undefined,
      false: undefined,
    },
  },
  compoundVariants: [
    {
      card: true,
      pressed: false,
      state: "completed",
      className: "bg-transparent",
    },
    {
      card: true,
      pressed: false,
      hovered: false,
      state: "current",
      className: "bg-primary-soft",
    },
    {
      card: true,
      pressed: true,
      state: "current",
      className: "bg-accent",
    },
    {
      card: true,
      hovered: true,
      state: "current",
      className: "bg-accent",
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
    weight?: "regular" | "semibold";
    disabled?: boolean;
    inactive?: boolean;
  };

// Once group-{modifier} works on web the hovered and pressed classes can be changed to group-hover and group-active

const StepContext = React.createContext<
  Pick<StepProps, "hovered" | "pressed" | "state" | "weight" | "disabled">
>({
  hovered: false,
  pressed: false,
  state: "default",
  weight: "semibold",
  disabled: false,
});

const Step = React.forwardRef<View, StepProps>(
  (
    {
      className,
      direction,
      hovered: isHovered,
      onHoverIn,
      onHoverOut,
      onPressIn,
      onPressOut,
      onPress,
      pressed: isPressed,
      state,
      card,
      weight,
      ...props
    },
    ref
  ) => {
    const isDisabled = !!props.disabled;
    const inactive = !!props.inactive;
    const disabled = isDisabled || inactive;

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
        if (!disabled) setHovered(true);
        onHoverIn?.(e);
      },
      [onPress, disabled, onHoverIn]
    );

    const handleHoverOut = React.useCallback(
      (e: NativeSyntheticEvent<NativeMouseEvent>) => {
        if (!disabled) setHovered(false);
        onHoverOut?.(e);
      },
      [onPress, disabled, onHoverOut]
    );

    const handlePressIn = React.useCallback(
      (e: GestureResponderEvent) => {
        if (!disabled) setPressed(true);
        onPressIn?.(e);
      },
      [onPress, disabled, onPressIn]
    );

    const handlePressOut = React.useCallback(
      (e: GestureResponderEvent) => {
        if (!disabled) setPressed(false);
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
          weight,
          disabled: isDisabled,
        }}
      >
        <Pressable
          ref={ref}
          className={cn(
            stepVariants({ direction, state, card, pressed, hovered }),
            !!onPress && !disabled ? "cursor-pointer" : "cursor-default",
            isDisabled && "opacity-50",
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
  "mt-[2px] size-5 items-center justify-center rounded-full border transition-colors",
  {
    variants: {
      state: {
        default: "border-border bg-background",
        current: "border-border bg-background",
        partialComplete: "border-warning bg-warning",
        completed: "border-success bg-success",
        failed: "border-destructive bg-destructive",
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
        default: "bg-accent",
        current: "bg-foreground",
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
 * StepTitle
 * -----------------------------------------------------------------------------------------------*/

const stepTitleVariants = cva("", {
  variants: {
    weight: {
      regular: "font-sans-regular",
      semibold: "font-sans-semibold",
    },
  },
  defaultVariants: {
    weight: "semibold",
  },
});

type StepTitleProps = TextProps & VariantProps<typeof stepTitleVariants>;

const StepTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  StepTitleProps
>(({ className, weight: propWeight, ...props }, ref) => {
  const { state, weight } = React.useContext(StepContext);
  return (
    <Text
      className={cn(
        stepTitleVariants({ weight: propWeight ?? weight }),
        {
          "text-muted-foreground": state === "default",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
StepTitle.displayName = "StepTitle";

/* -------------------------------------------------------------------------------------------------
 * StepDescription
 * -----------------------------------------------------------------------------------------------*/

type StepDescriptionProps = TextProps;

const StepDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  StepDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      className={cn("text-muted-foreground", className)}
      ref={ref}
      {...props}
    />
  );
});
StepDescription.displayName = "StepDescription";

/* -------------------------------------------------------------------------------------------------
 * StepEndAdornment
 * -----------------------------------------------------------------------------------------------*/

type StepEndAdornmentProps = ViewProps & {
  children: JSX.Element;
};

const StepEndAdornment = React.forwardRef<View, StepEndAdornmentProps>(
  ({ children, className, ...props }, ref) => {
    const { disabled, hovered, pressed } = React.useContext(StepContext);
    return React.cloneElement(children, {
      disabled: disabled,
      hovered: hovered,
      pressed: pressed,
      className: cn("my-auto", className),
      ...props,
      ref,
    });
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
  StepDescription,
  StepDescriptionProps,
  StepTitle,
  StepTitleProps,
  StepEndAdornment,
  StepEndAdornmentProps,
};
