import React from "react";
import { cn } from "@usekeyhole/utils";
import { useControllableState } from "@usekeyhole/hooks";
import { GestureResponderEvent, View } from "react-native";
import {
  Button,
  ButtonIcon as ToggleIcon,
  ButtonIconProps as ToggleIconProps,
  ButtonProps,
  ButtonText as ToggleText,
  ButtonTextProps as ToggleTextProps,
} from "@usekeyhole/nativewind";

/* -------------------------------------------------------------------------------------------------
 * Toggle
 * -----------------------------------------------------------------------------------------------*/

type ToggleProps = Omit<ButtonProps, "pressed"> & {
  defaultPressed?: boolean;
  onChange?: (state: boolean) => void;
  pressed?: boolean;
};

const Toggle = React.forwardRef<View, ToggleProps>(
  (
    {
      className,
      pressed: isPressed,
      defaultPressed,
      onChange,
      onPress,
      ...props
    },
    ref
  ) => {
    const [pressed, setPressed] = useControllableState({
      prop: isPressed,
      defaultProp: defaultPressed,
      onChange,
    });

    const handleOnPress = React.useCallback(
      (e: GestureResponderEvent) => {
        setPressed(!pressed);
        onPress?.(e);
      },
      [pressed, onPress]
    );

    return (
      <Button
        pressed={pressed}
        ref={ref}
        className={cn(className)}
        onPress={handleOnPress}
        {...props}
      />
    );
  }
);
Toggle.displayName = "Toggle";

export {
  Toggle,
  ToggleProps,
  ToggleIcon,
  ToggleIconProps,
  ToggleText,
  ToggleTextProps,
};
