import React from "react";
import { Text, View } from "react-native";
import { Column } from "@tanstack/react-table";
import {
  Badge,
  BadgeText,
  Checkbox,
  CheckboxIndicator,
} from "@usekeyhole/nativewind";
import {
  CommandItem,
  Select,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectInput,
  SelectList,
  SelectTrigger,
} from "@usekeyhole/web";

declare const ALIGN_OPTIONS: readonly ["start", "center", "end"];
type Align = (typeof ALIGN_OPTIONS)[number];

type FacetedFilterTexts = {
  title: React.ReactNode;
  clearFilterText: React.ReactNode;
  badgeText: React.ReactNode;
  emptyText: React.ReactNode;
  inputPlaceholder: React.ReactNode;
};

const defaultTexts: Partial<FacetedFilterTexts> = {
  title: "Filter",
  clearFilterText: "Clear filters",
  badgeText: "selected",
  emptyText: "No results found.",
};

export interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  texts?: Partial<FacetedFilterTexts>;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  align?: Align;
}

export const FacetedFilter = <TData, TValue>({
  column,
  texts,
  options,
  align = "start", // Default value for align
}: FacetedFilterProps<TData, TValue>) => {
  const combinedTexts = { ...defaultTexts, ...texts };
  const inputPlaceholder =
    combinedTexts.inputPlaceholder ?? combinedTexts.title;
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  return (
    <Select>
      <SelectTrigger size="md">
        <View className="flex-row items-center gap-2">
          <Text className="text-accent-foreground text-sm">
            {combinedTexts.title}
          </Text>
          {selectedValues?.size > 0 && (
            <>
              <View className="bg-border h-4 w-px"></View>
              <View className="flex-row">
                {/* @ts-ignore */}
                <Badge size="small" className="lg:hidden" variant="secondary">
                  <BadgeText>{selectedValues.size}</BadgeText>
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge size="small" variant="secondary">
                      <BadgeText>
                        {selectedValues.size} {combinedTexts.badgeText}
                      </BadgeText>
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
            </>
          )}
        </View>
      </SelectTrigger>
      <SelectContent align={align} className="bg-background w-fit">
        <SelectInput placeholder={inputPlaceholder?.toString()} />

        <SelectList>
          <SelectEmpty>{combinedTexts.emptyText}</SelectEmpty>
          <SelectGroup className="flex-col justify-items-start p-2">
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
                  className="p-0"
                >
                  <View className="flex-row items-center gap-4 rounded px-2 py-1.5 transition-colors">
                    <Checkbox checked={isSelected} onChange={onSelect}>
                      <CheckboxIndicator />
                    </Checkbox>
                    <Text className="text-foreground">{item.label}</Text>
                  </View>
                </CommandItem>
              );
            })}
          </SelectGroup>
        </SelectList>
        {selectedValues.size > 0 && (
          <SelectGroup>
            <CommandItem
              onSelect={() => {
                column?.setFilterValue(undefined);
              }}
              className="text-accent-foreground justify-center p-2 text-center"
            >
              <Text>{combinedTexts.clearFilterText}</Text>
            </CommandItem>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};
