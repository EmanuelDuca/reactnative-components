import { cn } from "@usekeyhole/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useControllableState } from "@usekeyhole/hooks";
import React from "react";
import {
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
import { Text } from "../text/text";
import { Check } from "@usekeyhole/nativewind";

export type CheckboxProps = PressableProps &
  VariantProps<typeof checkboxIndicatorVariants> & {
    checked?: boolean;
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
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const disabled = !!props.disabled;
    const [checked, setChecked] = useControllableState({
      prop: isChecked,
      defaultProp: defaultValue,
      onChange,
    });
    const [hovered, setHovered] = React.useState<boolean>(!!isHovered);

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
      onLongPress?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      setChecked((v) => !v);
      onPressOut?.(e);
    };

    return (
      <CheckboxContext.Provider
        value={{
          disabled,
          hovered: isHovered ?? hovered,
          checked: !!checked,
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
          className={cn("relative flex flex-row gap-4 select-none", className)}
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
  },
);

Checkbox.displayName = "Checkbox";

export const checkboxIndicatorVariants = cva(
  "bg-background size-6 items-center justify-center rounded border transition-colors",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive",
      },
      checked: {
        false: undefined,
        true: undefined,
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
      disabled: {
        false: undefined,
        true: "opacity-50",
      },
    },
    compoundVariants: [
      // Default hover
      {
        hovered: true,
        disabled: false,
        className: "border-border/dark-70",
      },
      //Checked
      {
        checked: true,
        className: "bg-primary border-primary",
      },
      //Checked hover
      {
        checked: true,
        hovered: true,
        disabled: false,
        className: "bg-primary/dark-70 border-primary/dark-70",
      },
      //Disabled
      {
        disabled: true,
        checked: false,
        className: "bg-accent",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  },
);

export type CheckboxIndicatorProps = ViewProps &
  VariantProps<typeof checkboxIndicatorVariants>;

export const CheckboxIndicator = React.forwardRef<View, CheckboxIndicatorProps>(
  ({ className, ...props }, ref) => {
    const {
      checked,
      hovered,
      disabled,
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
            variant,
          }),
          className,
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
        {checked && (
          <Check
            className={cn("size-4 stroke-2", {
              "stroke-primary-foreground": checked,
            })}
          />
        )}
      </Pressable>
    );
  },
);

CheckboxIndicator.displayName = "CheckboxIndicator";

export type CheckboxLabelProps = TextProps;

export const CheckboxLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  CheckboxLabelProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-foreground text-sm font-semibold", className)}
      {...props}
    />
  );
});
CheckboxLabel.displayName = "CheckboxLabel";

export type CheckboxDescriptionProps = TextProps;

export const CheckboxDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  CheckboxDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-muted-foreground text-sm font-normal", className)}
      {...props}
    />
  );
});
CheckboxDescription.displayName = "CheckboxDescription";

export type CheckboxContentProps = ViewProps;

export const CheckboxContent = React.forwardRef<View, CheckboxContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-1 gap-1 py-0.5", className)}
        {...props}
      />
    );
  },
);
