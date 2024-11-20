import { cn } from "@usekeyhole/utils";
import React from "react";
import { PressableProps, View, ViewProps } from "react-native";
import { useControllableState } from "@usekeyhole/hooks";
import { Toggle, ToggleProps } from "./toggle";

/* -------------------------------------------------------------------------------------------------
 * ToggleGroup
 * -----------------------------------------------------------------------------------------------*/

type ToggleGroupContextProps = PressableProps & {
  size: ToggleProps["size"];
  selectedValues: string | string[];
  toggle: (value: string) => void;
  disabled: boolean;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  size: "default",
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
  Pick<ToggleProps, "size">;

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type = "single", //Single is default
  size,
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
    } = React.useContext(ToggleGroupContext);
    const isSelected = selectedValue.includes(value);
    const isDisabled = disabled || disabledItem;
    return (
      <Toggle
        size={size}
        ref={ref}
        disabled={isDisabled}
        pressed={isSelected}
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
