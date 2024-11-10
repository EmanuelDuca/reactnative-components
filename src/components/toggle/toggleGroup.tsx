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
  selectedValue: string[];
  setSelectedValue: (item: EditItemProp, values: string[]) => void;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  selectedValue: [""],
  setSelectedValue: () => {},
});

interface ToggleGroupProps extends ViewProps {
  type?: "single" | "multiple";
  value?: string[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string;
  disabled?: boolean;
}

interface EditItemProp {
  value: string;
  action: "add" | "delete";
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

  const handleChange = (item: EditItemProp, values: string[]) => {
    const list = [...values];
    if (item.action === "add") {
      list.push(item.value);
    } else if (item.action === "delete") {
      // Remove the specified value from the list
      const index = list.indexOf(item.value);
      if (index !== -1) {
        list.splice(index, 1); // Remove the item at the found index
      }
    }
    onValueChange(list);
  };

  return (
    <ToggleGroupContext.Provider
      value={{ selectedValue: value, setSelectedValue: handleChange }}
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

interface ToggleGroupItemProps extends PressableProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { selectedValue, setSelectedValue } =
      React.useContext(ToggleGroupContext);
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
