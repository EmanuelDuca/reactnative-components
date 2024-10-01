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
import { Check } from "@usekeyhole/nativewind/dist/index";
import { useColorScheme } from "react-native";

export type CheckboxProps = PressableProps & {
  checked?: boolean;
  hovered?: boolean;
  destructive?: boolean;
  onChange?: (checked: boolean) => void;
};

const CheckboxContext = React.createContext<{
  checked: boolean;
  hovered: boolean;
  disabled: boolean;
  destructive: boolean;
  pressed: boolean;
  onFocus: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onHoverIn: (e: MouseEvent) => void;
  onPressIn: (e: GestureResponderEvent) => void;
  onPressOut: (e: GestureResponderEvent) => void;
}>({
  checked: false,
  hovered: false,
  disabled: false,
  destructive: false,
  pressed: false,
  onFocus: undefined,
  onBlur: undefined,
  onHoverIn: undefined,
  onPressIn: undefined,
  onPressOut: undefined,
});

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      className,
      onHoverIn,
      onHoverOut,
      onChange,
      onPressIn,
      onPressOut,
      onFocus,
      onBlur,
      checked: selected,
      destructive: isDestructive,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const isHovered = !!props.hovered;
    const destructive = !!isDestructive;
    const [checked, setChecked] = React.useState<boolean>(!!selected);
    const [hovered, setHovered] = React.useState<boolean>(!!isHovered);
    const [pressed, setPressed] = React.useState<boolean>(false);

    const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
      if (!disabled) setHovered(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
      if (!disabled) setHovered(false);
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

    const handlePressIn = (e: GestureResponderEvent) => {
      if (!disabled) {
        setPressed(true);
      }
      onPressIn?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      if (!disabled) {
        setPressed(false);
        setChecked(!checked);
        onChange(!checked);
      }
      onPressOut?.(e);
    };

    return (
      <CheckboxContext.Provider
        value={{
          disabled,
          hovered,
          checked,
          destructive,
          pressed,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onHoverIn: handleHoverIn,
          onPressIn: handlePressIn,
          onPressOut: handlePressOut,
        }}
      >
        <Pressable
          ref={ref}
          className={cn("relative flex flex-row gap-4", className)}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onPressIn={handlePressIn}
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
  "size-6 items-center justify-center rounded border-2 p-1 transition-colors ",
  {
    variants: {
      variant: {
        default: "border-neutral-200 dark:border-neutral-500",
        disabled: "border-neutral-100 bg-green-500",
        destructive:
          "bg-background border-destructive-foreground dark:border-destructive-foreground",
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
        true: undefined,
      },
      destructive: {
        false: undefined,
        true: undefined,
      },
      pressed: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      // Default hover
      {
        variant: "default",
        hovered: true,
        className: "border-neutral-400 dark:border-neutral-500",
      },
      //Pressed
      {
        pressed: true,
        className: "border-brand-200 bg-background dark:border-brand-600",
      },
      //Checked
      {
        checked: true,
        pressed: false,
        className:
          "bg-brand-700 border-brand-200 dark:border-brand-600 dark:bg-brand-700",
      },
      //Checked hover
      {
        checked: true,
        hovered: true,
        pressed: false,
        className:
          "bg-brand-600 border-brand-200 dark:border-brand-600 dark:bg-brand-800",
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
          "opacity-50 bg-brand-700 border-brand-200 dark:border-brand-600 dark:bg-brand-700",
      },
      //Validation / Destructive
      {
        checked: false,
        destructive: true,
        pressed: false,
        className:
          "bg-background border-destructive-foreground dark:border-destructive-foreground",
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
  ({ className, variant, ...props }, ref) => {
    const {
      checked,
      hovered,
      disabled,
      destructive,
      pressed,
      onFocus,
      onBlur,
      onHoverIn,
      onPressIn,
      onPressOut,
    } = React.useContext(CheckboxContext);

    const colorScheme = useColorScheme(); // Detect if the theme is dark or light
    const checkColor = colorScheme === "dark" ? "#039393" : "#bce0e0"; // brand-600 dark mode, brand-200 for light mode
    return (
      <Pressable
        tabIndex={disabled ? -1 : 0}
        ref={ref}
        className={cn(
          checkboxIndicatorVariants({
            hovered,
            checked,
            disabled,
            variant,
            destructive,
            pressed,
          })
        )}
        onFocus={onFocus}
        onBlur={onBlur}
        onHoverIn={onHoverIn}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        {...props}
      >
        {pressed ? (
          <Check color={checkColor} width={16} height={16} />
        ) : (
          checked && <Check color={"#ffffff"} width={16} height={16} />
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
          "text-neutral-800 dark:text-neutral-100 text-sm font-semibold",
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
        "text-neutral-600 dark:text-neutral-300 text-accent-foreground text-sm font-normal",
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
