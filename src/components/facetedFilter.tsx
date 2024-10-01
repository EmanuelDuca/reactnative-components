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
} from "react-native";
import { cn, ecn } from "@usekeyhole/utils";
import { Badge } from "@usekeyhole/nativewind";
import { Checkbox, CheckboxIndicator } from "./checkbox/checkbox";

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
                  className="rounded-sm px-1 font-normal lg:hidden dark:text-neutral-100"
                >
                  <Text className="dark:text-neutral-100">
                    {selectedValues.size}
                  </Text>
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      <Text className="dark:text-neutral-100">
                        {selectedValues.size} selected
                      </Text>
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
                          <Text className="dark:text-neutral-100">
                            {option.label}
                          </Text>
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
          <FacetedFilterInput
            placeholder="Status"
            className="ml-1 dark:text-neutral-100"
          />
        </View>

        <FacetedFilterList>
          <SelectEmpty>No address found.</SelectEmpty>
          <FacetedFilterGroup className="flex-col justify-items-start p-2">
            {options.map((item) => {
              const isSelected = selectedValues.has(item.value);

              const onSelect = () => {
                if (isSelected) {
                  selectedValues.delete(item.value);
                } else {
                  selectedValues.add(item.value);
                }
                const filterValues = Array.from(selectedValues);

                column?.setFilterValue(
                  filterValues.length ? filterValues : undefined
                );
              };

              return (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={onSelect}
                  className="p-0 dark:hover:bg-neutral-700"
                >
                  <View className="flex-row items-center gap-4 px-2 py-1.5 transition-colors rounded ">
                    <Checkbox checked={isSelected} onChange={onSelect}>
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
                  <Text className="dark:text-neutral-100">Clear filters</Text>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </FacetedFilterList>
      </FacetedFilterContent>
    </Select>
  );
};
