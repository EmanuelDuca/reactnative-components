import {
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent as FacetedFilterContent,
  SelectContext,
  SelectEmpty as FacetedFilterEmpty,
  SelectGroup,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectList,
  SelectProps,
  SelectTrigger,
  SelectTriggerProps,
  SelectValue,
} from "@usekeyhole/web";

import { SelectInput as FacetedFilterInput } from "@usekeyhole/web";
import * as Slot from "@rn-primitives/slot";
import { Column } from "@tanstack/react-table";

import React, { Children } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
  View,
  ViewProps,
} from "react-native";
import { cn, ecn } from "@usekeyhole/utils";
import { cva, VariantProps } from "class-variance-authority";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  ButtonText,
  Input,
  Plus,
  Star,
} from "@usekeyhole/nativewind";
import { Checkbox, CheckboxIndicator } from "../checkbox/checkbox";

interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  children?: React.ReactNode;
  selectedValues: Set<string>;
}

export const FactedTrigger = React.forwardRef<View, SelectTriggerProps>(
  ({ asChild, className, children, onPress, size, variant, ...props }, ref) => {
    const { setCurrentOpen, currentOpen } = React.useContext(SelectContext);

    const handleOnPress = React.useCallback(
      (event: GestureResponderEvent) => {
        console.log("Button was pressed");
        setCurrentOpen((x) => !x);
        if (onPress) onPress(event);
      },
      [onPress]
    );

    const Element = asChild ? Slot.Pressable : Pressable;
    return (
      <PopoverTrigger asChild>
        <Element
          className={cn("gap-3", className)}
          onPress={handleOnPress}
          ref={ref}
          {...props}
        >
          {children}
        </Element>
      </PopoverTrigger>
    );
  }
);

const FacetedContext = React.createContext<{
  data: FacetedFilterProps<any, any>;
  selectedValues: Set<string>;
}>({ data: null, selectedValues: new Set() });

export const FacetedFilter = <TData, TValue>({
  column,
  title,
  options,
  selectedValues,
  ...props
}: FacetedFilterProps<TData, TValue>) => {
  const [data, setData] = React.useState<FacetedFilterProps<any, any>>({
    column: column,
    title: title,
    options: options,
    selectedValues,
  });

  return (
    <FacetedContext.Provider value={{ data, selectedValues }}>
      <Select {...props}></Select>
    </FacetedContext.Provider>
  );
};

export const FacetedTriggerValue = ({ ...props }) => {
  const { data, selectedValues } = React.useContext(FacetedContext);

  return (
    <View className="h-10 border-2 rounded bg-brand-200 border-neutral-300  flex-row gap-3 items-center justify-center ">
      {/* <PlusCircledIcon className="mr-2 h-4 w-4" /> */}
      <Text className="p-3">{data.title}</Text>
      {selectedValues?.size > 0 && (
        <>
          {/* <Separator orientation="vertical" className="mx-2 h-4" /> */}
          <Badge
            variant="secondary"
            className="rounded-sm px-1 font-normal lg:hidden"
          >
            {selectedValues.size}
          </Badge>
          <div className="hidden space-x-1 lg:flex">
            {selectedValues.size > 2 ? (
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                <Text>{selectedValues.size} selected</Text>
              </Badge>
            ) : (
              data.options
                .filter((option) => selectedValues.has(option.value))
                .map((option) => (
                  <Badge
                    variant="secondary"
                    key={option.value}
                    className="rounded-sm px-1 font-normal"
                  >
                    <Text>{option.label}</Text>
                  </Badge>
                ))
            )}
          </div>
        </>
      )}
    </View>
  );
};

const FacetedFilterGroup = ({ children }) => {
  return <SelectGroup>{children}</SelectGroup>;
};

const FacetedFilterList = ({ children, onClearFilters }) => {
  const { data, selectedValues } = React.useContext(FacetedContext);
  return (
    <SelectList>
      {children}
      {selectedValues?.size > 0 && (
        <>
          <View className="bg-white p-2 items-center justify-center">
            <Button
              variant="brand"
              className="w-full"
              onPress={() => {
                console.log("The button for clear was pressed");
                onClearFilters();
                console.log(
                  "The next line will be displayed Selected values after the clear function was called "
                );
                console.log(selectedValues);
              }}
            >
              Clear Filters
            </Button>
          </View>
        </>
      )}
    </SelectList>
  );
};

/// The code Bellow is for Item
const facetedFilterItemVariants = cva(
  "relative flex flex-row gap-4 m-1 p-2 transition-colors rounded",
  {
    variants: {
      variant: {
        default: "",
      },
      checked: {
        true: undefined,
        false: undefined,
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      { hovered: true, className: "bg-neutral-100 border-brand-200" },
      {
        checked: true,
        className: "",
      },
    ],

    defaultVariants: {
      variant: "default",
    },
  }
);

export type FacetedFilterItemProps = PressableProps &
  VariantProps<typeof facetedFilterItemVariants> & {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    value?: string;
  };

export const FacetedFilterItemContext = React.createContext<{
  variant: FacetedFilterItemProps["variant"];
  checked: boolean;
  hovered: boolean;
}>({
  variant: "default",
  checked: false,
  hovered: false,
});

export const FacetedFilterItem = React.forwardRef<View, FacetedFilterItemProps>(
  (
    {
      variant,
      className,
      onHoverIn,
      onHoverOut,
      onChange,
      checked: selected,
      ...props
    },
    ref
  ) => {
    const [checked, setChecked] = React.useState<boolean>(!!selected);
    const [hovered, setHovered] = React.useState(false);

    return (
      <FacetedFilterItemContext.Provider value={{ variant, checked, hovered }}>
        <CommandItem>
          <Pressable
            ref={ref}
            className={cn(
              facetedFilterItemVariants({ hovered, checked, variant }),
              className
            )}
            onHoverIn={() => {
              setHovered(true);
            }}
            onHoverOut={() => {
              setHovered(false);
            }}
            onPress={() => {
              onChange?.(!checked);
              setChecked(!checked);
            }}
            {...props}
          />
        </CommandItem>
      </FacetedFilterItemContext.Provider>
    );
  }
);

// The code bellow is for Indicator
export const FacetedFilterIndicator = () => {
  const { checked, hovered } = React.useContext(FacetedFilterItemContext);
  return <CheckboxIndicator checked={checked} hovered={hovered} />;
};

export {
  FacetedFilterGroup,
  FacetedFilterInput,
  FacetedFilterContent,
  FacetedFilterList,
  FacetedFilterEmpty,
};
