import { cn } from "@usekeyhole/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {
  Text,
  View,
  Pressable,
  PressableProps,
  ViewProps,
  TextProps,
  TargetedEvent,
  NativeSyntheticEvent,
  MouseEvent,
  GestureResponderEvent,
} from "react-native";
import { Check } from "@usekeyhole/nativewind";

export type CheckboxProps = PressableProps &
  VariantProps<typeof checkboxIndicatorVariants> & {
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
  };

const CheckboxContext = React.createContext<{
  checked: boolean;
  disabled: boolean;
  hovered: boolean;
  onBlur?: PressableProps["onBlur"];
  onFocus?: PressableProps["onFocus"];
  onHoverIn?: PressableProps["onHoverIn"];
  onLongPress?: PressableProps["onLongPress"];
  onPress?: PressableProps["onPress"];
  onPressIn?: PressableProps["onPressIn"];
  onPressOut?: PressableProps["onPressOut"];
  pressed: boolean;
  variant: CheckboxProps["variant"];
}>({
  checked: false,
  disabled: false,
  hovered: false,
  onBlur: undefined,
  onFocus: undefined,
  onHoverIn: undefined,
  onLongPress: undefined,
  onPress: undefined,
  onPressIn: undefined,
  onPressOut: undefined,
  pressed: false,
  variant: "default",
});

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      className,
      defaultValue,
      onHoverIn,
      onHoverOut,
      onChange,
      onLongPress,
      onPressOut,
      onFocus,
      onBlur,
      checked: isChecked,
      hovered: isHovered,
      pressed: isPressed,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [internalChecked, setInternalChecked] = React.useState<boolean>(
      defaultValue || false
    );
    const [hovered, setHovered] = React.useState<boolean>(!!isHovered);
    const [pressed, setPressed] = React.useState<boolean>(!!isPressed);

    const checked = isChecked ?? internalChecked;

    const handleChange = (newValue: boolean) => {
      isChecked ?? setInternalChecked(newValue);
      onChange?.(newValue); // Still trigger onChange for external listeners
    };

    const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
      setHovered(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
      setHovered(false);
      onBlur?.(e);
    };

    const handleHoverIn = (e: MouseEvent) => {
      setHovered(true);
      onHoverIn?.(e);
    };

    const handleHoverOut = (e: MouseEvent) => {
      setHovered(false);
      onHoverOut?.(e);
    };

    const handleLongPressIn = (e: GestureResponderEvent) => {
      setPressed(true);
      onLongPress?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      setPressed(false);
      handleChange(!checked);
      onPressOut?.(e);
    };

    return (
      <CheckboxContext.Provider
        value={{
          disabled,
          hovered: isHovered ?? hovered,
          checked,
          pressed: isPressed ?? pressed,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onHoverIn: handleHoverIn,
          onLongPress: handleLongPressIn,
          onPressIn: props.onPressIn,
          onPress: props.onPress,
          onPressOut: handlePressOut,
          variant,
        }}
      >
        <Pressable
          ref={ref}
          className={cn("relative flex flex-row gap-4", className)}
          delayLongPress={200}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onLongPress={handleLongPressIn}
          onPressOut={handlePressOut}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          // Should be fixed. Propably expo/tsconfig.base should be used
          // @ts-ignore
          tabIndex={-1}
        />
      </CheckboxContext.Provider>
    );
  }
);

Checkbox.displayName = "Checkbox";

export const checkboxIndicatorVariants = cva(
  "bg-background size-6 items-center justify-center rounded border transition-colors",
  {
    variants: {
      variant: {
        default: "border-neutral-200 dark:border-neutral-500",
        destructive:
          "border-destructive-foreground dark:border-destructive-foreground",
      },
      checked: {
        false: undefined,
        true: "border-2",
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
      disabled: {
        false: undefined,
        true: undefined,
      },
      pressed: {
        false: undefined,
        true: "border-2",
      },
    },
    compoundVariants: [
      // Default hover
      {
        hovered: true,
        disabled: false,
        className: "border-neutral-400 dark:border-neutral-600",
      },
      //Pressed
      {
        pressed: true,
        disabled: false,
        className: "border-brand-200 bg-background dark:border-brand-600",
      },
      //Checked
      {
        checked: true,
        pressed: false,
        disabled: false,
        className:
          "border-brand-200 bg-brand-700 dark:border-brand-600 dark:bg-brand-700",
      },
      //Checked hover
      {
        checked: true,
        hovered: true,
        pressed: false,
        disabled: false,
        className:
          "border-brand-200 bg-brand-600 dark:border-brand-600 dark:bg-brand-800",
      },
      //Disabled
      {
        disabled: true,
        className: "bg-neutral-100 dark:bg-neutral-500",
      },
      //Disabled Checked
      {
        disabled: true,
        checked: true,
        className:
          "border-brand-200 bg-brand-700 dark:border-brand-600 dark:bg-brand-700 opacity-50",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  }
);

export type CheckboxIndicatorProps = ViewProps &
  VariantProps<typeof checkboxIndicatorVariants>;

export const CheckboxIndicator = React.forwardRef<View, CheckboxIndicatorProps>(
  ({ className, ...props }, ref) => {
    const {
      checked,
      hovered,
      disabled,
      pressed,
      onFocus,
      onBlur,
      onHoverIn,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      variant,
    } = React.useContext(CheckboxContext);
    return (
      <Pressable
        // @ts-ignore
        tabIndex={disabled ? -1 : 0}
        ref={ref}
        className={cn(
          checkboxIndicatorVariants({
            hovered,
            checked,
            disabled,
            pressed,
            variant,
          }),
          className
        )}
        onFocus={onFocus}
        onBlur={onBlur}
        onHoverIn={onHoverIn}
        onLongPress={onLongPress}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        {...props}
      >
        {(pressed || checked) && (
          <Check
            className={cn("size-4 stroke-2", {
              "stroke-white": checked,
              "stroke-brand-200 dark:stroke-brand-600": pressed,
            })}
          />
        )}
      </Pressable>
    );
  }
);

CheckboxIndicator.displayName = "CheckboxIndicator";

export type CheckboxLabelProps = TextProps;

export const CheckboxLabel = React.forwardRef<Text, CheckboxLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-sm font-semibold text-neutral-800 dark:text-neutral-100",
          className
        )}
        {...props}
      />
    );
  }
);
CheckboxLabel.displayName = "CheckboxLabel";

export type CheckboxDescriptionProps = TextProps;

export const CheckboxDescription = React.forwardRef<
  Text,
  CheckboxDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn(
        "text-accent-foreground text-sm font-normal text-neutral-600 dark:text-neutral-300",
        className
      )}
      {...props}
    />
  );
});
CheckboxDescription.displayName = "CheckboxDescription";

export type CheckboxContentProps = ViewProps;

export const CheckboxContent = React.forwardRef<View, CheckboxContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("gap-1 py-0.5", className)} {...props} />
    );
  }
);
