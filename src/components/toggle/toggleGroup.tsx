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
  selectedValues: string | string[];
  toggle: (value: string) => void;
  disabled: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  selectedValues: [],
  toggle: () => {},
  disabled: false,
});

type ToggleGroupSingleProps = ViewProps & {
  type: "single";
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
};

type ToggleGroupMultipleProps = ViewProps & {
  type: "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  disabled?: boolean;
};

// Union type
type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

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
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const toggle = (value: string) => {
    if (type === "multiple") {
      setValues((list: string[]) => {
        // @ts-ignore
        if (list.includes(value)) {
          // @ts-ignore
          return list.filter((item) => item !== value);
        } else {
          return [...list, value];
        }
      });
    } else {
      setValues(value);
    }
  };

  return (
    <ToggleGroupContext.Provider
      value={{ selectedValues: values, toggle, disabled }}
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
  children: React.ReactNode;
  disabled?: boolean;
}

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled: disabledItem, className, children, ...props }, ref) => {
    const {
      selectedValues: selectedValue,
      toggle: setSelectedValue,
      disabled,
    } = React.useContext(ToggleGroupContext);
    const isSelected = selectedValue.includes(value);
    const isDisabled = disabled || disabledItem;
    return (
      <Toggle
        ref={ref}
        disabled={isDisabled}
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
