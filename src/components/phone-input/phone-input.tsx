import React from "react";
import {
  CountryIso2,
  defaultCountries,
  parseCountry,
  usePhoneInput,
  UsePhoneInputConfig,
} from "react-international-phone";
import * as Crypto from "expo-crypto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectList,
  SelectTrigger,
  CountrySelectorFlag,
  SelectGroup,
  SelectInput,
} from "@usekeyhole/web";
import {
  Input,
  InputProps,
  InputStartAdornment,
  Text,
} from "@usekeyhole/nativewind";
import { cn } from "@usekeyhole/utils";

type PhoneInputProps = Omit<InputProps, "onChange"> &
  Pick<UsePhoneInputConfig, "countries" | "defaultCountry"> & {
    searchPlaceholder?: string;
    onChange?: (data: {
      phone: string;
      countryCode: string;
      inputValue: string;
    }) => void;
  };

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries = defaultCountries,
  defaultCountry = "en",
  onBlur,
  onFocus,
  onChangeText,
  searchPlaceholder = "Search for country...",
  size,
  value,
  variant,
  onChange,
  ...props
}) => {
  const [triggerFocus, setTriggerFocus] = React.useState(false);
  const [inputFocus, setInputFocus] = React.useState(false);
  const [triggerHover, setTriggerHover] = React.useState(false);
  const [inputHover, setInputHover] = React.useState(false);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry,
      countries,
      onChange: (data) => {
        const phoneWithoutCountryCode = data.phone.replace(
          `+${data.country.dialCode}`,
          ""
        );
        onChange?.({
          phone: phoneWithoutCountryCode,
          countryCode: "+" + data.country.dialCode,
          inputValue: data.inputValue,
        });
        onChangeText?.(data.phone);
      },
      value,
    });

  const handleCountryChange = React.useCallback(
    (value: string) => {
      setCountry(value as CountryIso2);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [handlePhoneValueChange, inputRef, setCountry]
  );

  return (
    <Select
      // This line of code is creating the problem
      // key={country.iso2} // to force re-render on country code change
      value={country.iso2}
      onValueChange={handleCountryChange}
    >
      <Input
        focused={inputFocus}
        hovered={inputHover || triggerHover}
        // @ts-ignore
        onChange={handlePhoneValueChange}
        onFocus={(event) => {
          onFocus?.(event);
          setInputFocus(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          setInputFocus(false);
        }}
        onHoverIn={() => setInputHover(true)}
        onHoverOut={() => setInputHover(false)}
        value={inputValue}
        size={size}
        startAdornment={
          <InputStartAdornment
            // @ts-ignore
            className="border-transparent p-0"
            variant="outlined"
          >
            <SelectTrigger
              className={cn("gap-0 rounded-r-none p-0", {
                "border-r-border": inputFocus,
              })}
              size={size}
              onFocus={() => setTriggerFocus(true)}
              onBlur={() => setTriggerFocus(false)}
              onHoverIn={() => setTriggerHover(true)}
              onHoverOut={() => setTriggerHover(false)}
              focused={triggerFocus || inputFocus}
              hovered={triggerHover || inputHover}
              disableFocus={!triggerFocus}
              variant={variant}
            >
              <CountrySelectorFlag
                code={country.iso2.toUpperCase()}
                className="mr-1"
              />
            </SelectTrigger>
          </InputStartAdornment>
        }
        variant={variant}
        {...props}
      />
      <SelectContent
        filter={(value, search, keywords) => {
          const extendValue = value + " " + keywords?.join(" ").toLowerCase();
          if (extendValue.includes(search.toLowerCase())) return 1;
          return 0;
        }}
      >
        <SelectInput placeholder={searchPlaceholder} />
        <SelectList>
          <SelectGroup>
            {countries.map((c) => {
              const country = parseCountry(c);
              return (
                <SelectItem
                  key={Crypto.randomUUID()}
                  className="gap-2"
                  value={country.iso2}
                  keywords={[country.name]}
                >
                  <CountrySelectorFlag code={country.iso2.toUpperCase()} />
                  <Text>{country.name}</Text>
                  {/* @ts-ignore ts not allowing classnames for some reason */}
                  <Text className="text-muted-foreground">
                    +{country.dialCode}
                  </Text>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectList>
      </SelectContent>
    </Select>
  );
};

PhoneInput.displayName = "PhoneInput";

export { PhoneInput, PhoneInputProps };
