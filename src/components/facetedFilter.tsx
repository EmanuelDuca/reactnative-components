import {
  CommandItem,
  CommandSeparator,
  Select,
  SelectContent as FacetedFilterContent,
  SelectEmpty,
  SelectList as FacetedFilterList,
  SelectTrigger,
} from "@usekeyhole/web";

import {
  SelectGroup as FacetedFilterGroup,
  SelectInput as FacetedFilterInput,
} from "@usekeyhole/web";
import { Column } from "@tanstack/react-table";

import React from "react";
import { Text, View } from "react-native";
import { Badge, BadgeText } from "@usekeyhole/nativewind";
import { Checkbox, CheckboxIndicator } from "./checkbox/checkbox";

export interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  localization: {
    title: string;
    clearFilterText?: string;
  };
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export const FacetedFilter = <TData, TValue>({
  column,
  localization,
  options,
}: FacetedFilterProps<TData, TValue>) => {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Select>
      <SelectTrigger size="md">
        <View className=" flex-row items-center gap-2">
          <Text className="text-sm text-neutral-900 dark:text-neutral-100">
            {localization.title}
          </Text>
          {selectedValues?.size > 0 && (
            <>
              <View className="h-4 w-px bg-neutral-600 dark:bg-neutral-100"></View>
              <View className="flex-row">
                {/* @ts-ignore */}
                <Badge size="small" className="lg:hidden" variant="secondary">
                  <BadgeText>{selectedValues.size}</BadgeText>
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge size="small" variant="secondary">
                      <BadgeText>{selectedValues.size} selected</BadgeText>
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          size="small"
                          variant="secondary"
                          key={option.value}
                        >
                          <BadgeText>{option.label}</BadgeText>
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
        className="w-fit bg-white dark:bg-neutral-900"
      >
        <View className="pl-2">
          <FacetedFilterInput
            placeholder="Status"
            className="ml-1 w-fit dark:text-neutral-100"
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
                  <View className="flex-row items-center gap-4 rounded px-2 py-1.5 transition-colors ">
                    <Checkbox checked={isSelected} onChange={onSelect}>
                      <CheckboxIndicator />
                    </Checkbox>
                    <Text className="text-neutral-900 dark:text-neutral-100">
                      {item.label}
                    </Text>
                  </View>
                </CommandItem>
              );
            })}
          </FacetedFilterGroup>
          {selectedValues.size > 0 && (
            <>
              <CommandSeparator />
              <FacetedFilterGroup>
                <CommandItem
                  onSelect={() => {
                    column?.setFilterValue(undefined);
                  }}
                  className="justify-center p-2 text-center dark:text-neutral-100 dark:hover:bg-neutral-700"
                >
                  <Text>{localization.clearFilterText ?? "Clear filters"}</Text>
                </CommandItem>
              </FacetedFilterGroup>
            </>
          )}
        </FacetedFilterList>
      </FacetedFilterContent>
    </Select>
  );
};
