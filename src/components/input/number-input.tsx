import { UseNumberInputOptions, useNumberInput } from "@usekeyhole/hooks";
//import { useLocalizationContext } from "../../contexts/LocalizationContext";
//import { Input, InputProps } from "@usekeyhole/nativewind";
import React from "react";
import { useLocalizationContext } from "./mocks";
import { Input, InputProps } from "./input";

export type NumberInputProps = Omit<
  InputProps,
  "onChange" | "onChangeText" | "value"
> & {
  value: number;
  options?: Omit<UseNumberInputOptions, "value" | "onChange">;
  onChange: UseNumberInputOptions["onChange"];
  empty?: boolean;
};

export function NumberInput({
  value,
  options,
  onBlur,
  onFocus,
  onChange,
  empty = false,
  ...props
}: NumberInputProps) {
  const {
    inputValue,
    onBlur: numberInputOnBlur,
    onFocus: numberInputOnFocus,
    onChangeText,
  } = useNumberInput({
    locale: "DK",
    value,
    onChange,
  });

  return (
    <Input
      {...props}
      value={empty ? "" : inputValue}
      onChangeText={onChangeText}
      onBlur={(e) => {
        numberInputOnBlur();
        onBlur?.(e);
      }}
      onFocus={(e) => {
        if (!props.disabled) {
          numberInputOnFocus();
          onFocus?.(e);
        }
      }}
    />
  );
}
