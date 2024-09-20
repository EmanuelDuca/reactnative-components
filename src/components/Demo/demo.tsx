import {
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectContext,
  SelectEmpty,
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

import {
  SelectGroup as FacetedFilterGroup,
  SelectInput as FacetedFilterInput,
} from "@usekeyhole/web";
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
import { Checkbox, CheckboxIndicator } from "../checkbox";

interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const FactedTrigger = React.forwardRef<View, SelectTriggerProps>(
  ({ asChild, className, children, onPress, size, variant, ...props }, ref) => {
    const { setCurrentOpen } = React.useContext(SelectContext);

    const handleOnPress = React.useCallback(
      (event: GestureResponderEvent) => {
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

export const FacetedFilter = <TData, TValue>({
  column,
  title,
  options,
  ...props
}: FacetedFilterProps<TData, TValue>) => {
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  console.log("selectedV", selectedValues);

  return (
    <Select>
      <FactedTrigger asChild>
        <Button variant="" size="sm" className="h-8">
          {/* <PlusCircledIcon className="mr-2 h-4 w-4" /> */}
          {title}
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
                  options
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
        </Button>
      </FactedTrigger>
      <SelectContent align="start" className="w-[200px] bg-white">
        <FacetedFilterInput placeholder="Status" />
        <FacetedFilterList>
          <SelectEmpty>No address found.</SelectEmpty>
          <FacetedFilterGroup>
            {options.map((item) => {
              const isSelected = selectedValues.has(item.value);
              console.log("selectedValues", selectedValues);

              return (
                <CommandItem value={item.value}>
                  <FacetedFilterItem
                    key={item.value}
                    checked={isSelected}
                    onChange={(value) => {
                      if (isSelected) {
                        selectedValues.delete(item.value);
                      } else {
                        selectedValues.add(item.value);
                      }
                      const filterValues = Array.from(selectedValues);

                      console.log("filterValuse", filterValues);

                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <FacetedFilterIndicator />
                    <Badge
                    // size={item.BadgeInfo.size}
                    // variant={item.BadgeInfo.variant}
                    >
                      <BadgeText>{item.label}</BadgeText>
                    </Badge>
                  </FacetedFilterItem>
                </CommandItem>
              );
            })}
          </FacetedFilterGroup>
        </FacetedFilterList>
      </SelectContent>
    </Select>
  );
};

export const FacetedFilterTrigger = () => {
  return <View></View>;
};

export function FacetedFilterList({ children }) {
  return <SelectList>{children}</SelectList>;
}

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

export const FacetedFilterContext = React.createContext<{
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
      <FacetedFilterContext.Provider value={{ variant, checked, hovered }}>
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
      </FacetedFilterContext.Provider>
    );
  }
);

// The code bellow is for Indicator
export const FacetedFilterIndicator = () => {
  const { checked, hovered } = React.useContext(FacetedFilterContext);
  return <CheckboxIndicator checked={checked} hovered={hovered} />;
};
