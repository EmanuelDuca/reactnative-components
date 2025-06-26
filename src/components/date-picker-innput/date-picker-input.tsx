import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "@usekeyhole/web";
import {
  Calendar,
  Input,
  X,
  Text,
  Button,
  ButtonIcon,
  InputProps,
} from "@usekeyhole/nativewind";
import { DatePicker, DatePickerProps } from "@usekeyhole/nativewind";
import { useControllableState } from "@usekeyhole/hooks";
import { Pressable } from "react-native";
import { cn } from "@usekeyhole/utils";

const defaultSingleTexts = {
  placeholder: "Select a date",
};

const defaultRangeTexts = {
  placeholder: "Select a date range",
};

const defaultSingleFormatter = (value: Date) => {
  const formatter = new Intl.DateTimeFormat("da-DK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatter.format(value);
};

const defaultRangeFormatter = (value: [Date, Date]) => {
  const strings = value.map((d) => defaultSingleFormatter(d));
  return strings.join(" - ");
};

type SharedDatePickerInputProps = PopoverProps &
  DatePickerProps & {
    disabled?: boolean;
    inputProps?: InputProps;
    allowClear?: boolean;
    texts?: {
      placeholder?: string;
    };
  };

type DatePickerSingleInputProps = SharedDatePickerInputProps & {
  mode: "single";
  onChange?: (value?: Date) => void;
  formatter?: (value: Date) => string;
};

type DatePickerRangeInputProps = SharedDatePickerInputProps & {
  mode: "range";
  formatter?: (value: [Date, Date]) => string;
};

export type DatePickerInputProps =
  | DatePickerRangeInputProps
  | DatePickerSingleInputProps;

export const DatePickerInput: React.FC<DatePickerInputProps> = (props) => {
  if (props.mode === "single") {
    return <DatePickerSingleInput key={String(props.value)} {...props} />;
  }

  if (props.mode === "range") {
    return <DatePickerRangeInput key={String(props.value)} {...props} />;
  }

  throw new Error("Invalid mode");
};

const DatePickerSingleInput: React.FC<DatePickerSingleInputProps> = ({
  mode,
  value: valueProp,
  onChange,
  defaultValue,
  open: openProp,
  onOpenChange,
  defaultOpen,
  texts: textsProp,
  formatter = defaultSingleFormatter,
  allowClear = true,
  inputProps,
  disabled,
  ...props
}) => {
  const texts = { ...defaultSingleTexts, ...textsProp };

  const [hovered, setHovered] = React.useState(false);

  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange,
    defaultProp: defaultValue,
  });

  const [open, setOpen] = useControllableState({
    prop: openProp,
    onChange: onOpenChange,
    defaultProp: defaultOpen,
  });

  const valueString = React.useMemo(() => {
    if (!value) return "";
    return formatter(value);
  }, [value, formatter]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <DatePickerInputTrigger
          hovered={hovered}
          open={open}
          disabled={disabled}
          allowClear={allowClear}
          valueString={valueString}
          inputProps={inputProps}
          setHovered={setHovered}
          setOpen={setOpen}
          setValue={setValue}
          placeholder={texts.placeholder}
        />
      </PopoverTrigger>
      <PopoverContent
        className="-mr-[36px] flex w-auto border-0 p-0"
        align="end"
      >
        <DatePicker
          mode="single"
          value={value}
          onChange={(v) => {
            console.log("onChange", v);
            setValue(v);
            setOpen(false);
          }}
          texts={texts}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
};

const DatePickerRangeInput: React.FC<DatePickerRangeInputProps> = ({
  mode,
  value: valueProp,
  onChange,
  defaultValue,
  open: openProp,
  onOpenChange,
  defaultOpen,
  texts: textsProp,
  formatter = defaultRangeFormatter,
  inputProps,
  allowClear = true,
  disabled,
  ...props
}) => {
  const texts = { ...defaultRangeTexts, ...textsProp };

  const [hovered, setHovered] = React.useState(false);

  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange,
    defaultProp: defaultValue,
  });

  const [open, setOpen] = useControllableState({
    prop: openProp,
    onChange: onOpenChange,
    defaultProp: defaultOpen,
  });

  const rangeSelected = React.useMemo(() => {
    return value?.every((v) => !!v);
  }, [value]);

  const valueString = React.useMemo(() => {
    if (!value || !rangeSelected) return "";
    const dates = value as [Date, Date];
    return formatter(dates);
  }, [value, rangeSelected, formatter]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <DatePickerInputTrigger
          hovered={hovered}
          open={open}
          disabled={disabled}
          allowClear={allowClear}
          valueString={valueString}
          inputProps={inputProps}
          setHovered={setHovered}
          setOpen={setOpen}
          setValue={setValue}
          placeholder={texts.placeholder}
        />
      </PopoverTrigger>
      <PopoverContent className="-mr-[36px] w-auto border-0 p-0" align="end">
        <DatePicker
          mode="range"
          value={value}
          onChange={(v) => {
            setValue(v);
            setOpen(false);
          }}
          texts={texts}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
};

const DatePickerInputTrigger = React.forwardRef<
  React.ElementRef<typeof Input>,
  {
    hovered: boolean;
    open?: boolean;
    disabled?: boolean;
    inputProps?: InputProps;
    valueString?: string;
    setHovered: (hovered: boolean) => void;
    setOpen: (open: boolean) => void;
    setValue: (value: any) => void;
    allowClear?: boolean;
    placeholder?: string;
  }
>(
  (
    {
      hovered,
      open,
      disabled,
      allowClear,
      valueString,
      inputProps,
      setHovered,
      setOpen,
      placeholder,
      setValue,
    },
    ref
  ) => {
    const showClearButton = !!valueString && allowClear;
    return (
      <Input
        ref={ref}
        asChild
        hovered={hovered}
        // @ts-ignore
        focused={open}
        readOnly
        disabled={disabled}
        {...inputProps}
        className={cn(disabled && "cursor-not-allowed", inputProps?.className)}
      >
        <Pressable
          disabled={disabled}
          className="flex flex-row items-center justify-between"
          onHoverIn={() => setHovered(true)}
          onHoverOut={() => setHovered(false)}
          onPress={() => setOpen(true)}
        >
          <Text className={cn(!valueString && "text-muted-foreground")}>
            {!!valueString ? valueString : placeholder}
          </Text>

          {showClearButton ? (
            <Button
              variant="ghost"
              size="icon-sm"
              onPress={() => setValue(undefined)}
              disabled={disabled}
              className={cn(
                "-mr-[4px]",
                // the button padding makes the input too tall
                inputProps?.size === "sm" && "mr-0 p-0"
              )}
            >
              <ButtonIcon>
                <X />
              </ButtonIcon>
            </Button>
          ) : (
            <Calendar className="size-5" />
          )}
        </Pressable>
      </Input>
    );
  }
);
