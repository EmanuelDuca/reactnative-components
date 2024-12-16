import { cn } from "@usekeyhole/utils";
import React from "react";
import { PressableProps, View, ViewProps } from "react-native";
import { useControllableState } from "@usekeyhole/hooks";
import { Toggle, ToggleProps } from "@usekeyhole/nativewind";

/* -------------------------------------------------------------------------------------------------
 * ToggleGroup
 * -----------------------------------------------------------------------------------------------*/

type ToggleGroupContextProps = PressableProps & {
  size: ToggleProps["size"];
  color: ToggleProps["color"];
  variant: ToggleProps["variant"];
  selectedValues: string | string[];
  toggle: (value: string) => void;
  disabled: boolean;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  size: "default",
  color: "default",
  variant: "default",
  selectedValues: [],
  toggle: () => {},
  disabled: false,
});

type ToggleGroupSingleProps = ViewProps & {
  type?: "single";
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
};

type ToggleGroupMultipleProps = ViewProps & {
  type?: "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  disabled?: boolean;
};

// Union type
type ToggleGroupProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) &
  Pick<ToggleProps, "size" | "color" | "variant">;

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type = "single", //Single is default
  size,
  color,
  variant,
  value,
  onValueChange,
  defaultValue,
  className,
  children,
  ...props
}) => {
  const disabled = !!props.disabled;
  const [values, setValues] = useControllableState<string | string[]>({
    prop: value,
    defaultProp: defaultValue ?? (type === "multiple" ? [] : ""),
    onChange: (updatedValue) => {
      if (onValueChange) {
        // Call `onValueChange` only if it is provided
        if (type === "multiple" && Array.isArray(updatedValue)) {
          (onValueChange as (value: string[]) => void)(updatedValue);
        } else if (type === "single" && typeof updatedValue === "string") {
          (onValueChange as (value: string) => void)(updatedValue);
        }
      }
    },
  });

  const toggle = (value: string) => {
    if (type === "multiple" && Array.isArray(values)) {
      setValues((prevState) => {
        if (Array.isArray(prevState)) {
          if (prevState.includes(value)) {
            return prevState.filter((item) => item !== value);
          } else {
            return [...prevState, value];
          }
        }
        return [value]; // Fallback to a new array with the value
      });
    } else if (type === "single") {
      setValues(value);
    }
  };

  return (
    <ToggleGroupContext.Provider
      value={{
        selectedValues: values ?? (type === "multiple" ? [] : ""),
        toggle,
        disabled,
        size,
        color,
        variant,
      }}
    >
      <View className={cn("flex flex-row gap-2", className)} {...props}>
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
};
ToggleGroup.displayName = "ToggleGroup";

/* -------------------------------------------------------------------------------------------------
 * ToggleGroupItem
 * -----------------------------------------------------------------------------------------------*/

type ToggleGroupItemProps = ToggleProps & {
  value: string;
};

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled: disabledItem, className, children, ...props }, ref) => {
    const {
      selectedValues: selectedValue,
      toggle: setSelectedValue,
      disabled,
      size,
      color,
      variant,
    } = React.useContext(ToggleGroupContext);
    // Check based on type
    const isSelected =
      typeof selectedValue === "string"
        ? selectedValue === value // Single mode check
        : selectedValue.includes(value); // Multiple mode check

    const isDisabled = disabled || disabledItem;
    return (
      <Toggle
        size={size}
        color={color}
        variant={variant}
        ref={ref}
        disabled={isDisabled}
        pressed={isSelected}
        className={className}
        {...props}
        onPress={() => {
          setSelectedValue(value);
        }}
      >
        {children}
      </Toggle>
    );
  }
);

export { ToggleGroup, ToggleGroupProps, ToggleGroupItem, ToggleGroupItemProps };
