import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent as FacetedFilterContent,
  SelectContext,
  SelectEmpty,
  SelectGroup,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectList as FacetedFilterList,
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
import { Checkbox, CheckboxIndicator } from "./checkbox/checkbox";
import { AddIcon } from "@usekeyhole/ui";

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
          className={cn("", className)}
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
}: FacetedFilterProps<TData, TValue>) => {
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  console.log("selectedV", selectedValues);

  return (
    <Select>
      <SelectTrigger className="border-2 border-neutral-100 rounded">
        <View className="flex-row items-center gap-2 px-3 py-2">
          <Text className="dark:text-neutral-100">{title}</Text>
          {selectedValues?.size > 0 && (
            <>
              <View className="w-px h-6 bg-neutral-600 dark:bg-neutral-100"></View>
              <View>
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
              </View>
              {/* <Separator orientation="vertical" className="mx-2 h-4" /> */}
            </>
          )}
        </View>
      </SelectTrigger>
      <FacetedFilterContent
        align="start"
        className="bg-white dark:bg-neutral-900"
      >
        <View className=" pl-2">
          <FacetedFilterInput placeholder="Status" className="ml-1" />
        </View>

        <FacetedFilterList>
          <SelectEmpty>No address found.</SelectEmpty>
          <FacetedFilterGroup className="flex-col justify-items-start p-2">
            {options.map((item) => {
              const isSelected = selectedValues.has(item.value);

              return (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    if (isSelected) {
                      selectedValues.delete(item.value);
                    } else {
                      selectedValues.add(item.value);
                    }
                    const filterValues = Array.from(selectedValues);

                    column?.setFilterValue(
                      filterValues.length ? filterValues : undefined
                    );
                  }}
                  className="p-0 dark:hover:bg-neutral-700"
                >
                  <View className="flex-row items-center gap-4 px-2 py-1.5 transition-colors rounded ">
                    <Text>{isSelected ? "True" : "False"}</Text>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => {}}
                      onHoverIn={() => {
                        console.log(
                          `Checkbox component -- isselected: ${isSelected}`
                        );
                      }}
                    >
                      <CheckboxIndicator />
                    </Checkbox>
                    <Text className="dark:text-neutral-100">{item.label}</Text>
                  </View>
                </CommandItem>
              );
            })}
          </FacetedFilterGroup>
          {selectedValues.size > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    column?.setFilterValue(undefined);
                  }}
                  className="p-2 justify-center text-center dark:text-neutral-100 dark:hover:bg-neutral-700"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </FacetedFilterList>
      </FacetedFilterContent>
    </Select>
  );
};
