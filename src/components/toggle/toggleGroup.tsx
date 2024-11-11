import { cn } from "@usekeyhole/utils";
import { cva } from "class-variance-authority";
import React from "react";
import { Pressable, PressableProps, View, ViewProps } from "react-native";
import { Toggle } from "./toggle";
import { useControllableState } from "@usekeyhole/hooks";

/* -------------------------------------------------------------------------------------------------
 * ToggleGroup
 * -----------------------------------------------------------------------------------------------*/

interface ToggleGroupContextProps extends PressableProps {
  selectedValues: string[];
  toggle: (value: string) => void;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  selectedValues: [],
  toggle: () => {},
});

interface ToggleGroupProps extends ViewProps {
  type?: "single" | "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type = "single", //Single is default
  value,
  onValueChange,
  defaultValue,
  className,
  children,
  ...props
}) => {
  const disabled = !!props.disabled;
  const [values, setValues] = useControllableState({
    prop: value,
    defaultProp: defaultValue ? [defaultValue] : [],
    onChange: onValueChange,
  });

  const toggle = (value: string) => {
    setValues((prev = []) => {
      if (type === "multiple") {
        // Handle multiple selection
        if (prev.includes(value)) {
          // Remove the value if it already exists
          return prev.filter((item) => item !== value);
        } else {
          // Add the value if it doesn't exist
          return [...prev, value];
        }
      } else {
        // Handle single selection
        return [value];
      }
    });
  };

  return (
    <ToggleGroupContext.Provider value={{ selectedValues: values, toggle }}>
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

interface ToggleGroupItemProps extends PressableProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { selectedValues: selectedValue, toggle: setSelectedValue } =
      React.useContext(ToggleGroupContext);
    console.log(selectedValue);
    const isSelected = selectedValue.includes(value);
    return (
      <Toggle
        ref={ref}
        disabled={disabled}
        selected={isSelected}
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
