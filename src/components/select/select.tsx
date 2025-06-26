import * as React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  View,
  ViewProps,
} from "react-native";
import * as Slot from "@rn-primitives/slot";
import {
  Check,
  CheckProps,
  ChevronLeft,
  Input,
  InputProps,
  Text,
  TextProps,
} from "@usekeyhole/nativewind";
import { cn, ecn } from "@usekeyhole/utils";
import {
  Popover,
  PopoverProps,
  PopoverContent,
  PopoverContentProps,
  PopoverTrigger,
} from "./popover";

import {
  Command,
  CommandEmpty as SelectEmpty,
  CommandEmptyProps as SelectEmptyProps,
  CommandGroup as SelectGroup,
  CommandGroupProps as SelectGroupProps,
  CommandGroupHeading as SelectGroupHeading,
  CommandGroupHeadingProps as SelectGroupHeadingProps,
  CommandInput,
  CommandInputProps,
  CommandItem,
  CommandItemProps,
  CommandList as SelectList,
  CommandListProps as SelectListProps,
  CommandProps,
} from "./command";

// React context with value of type T
type SelectContextType = Pick<SelectItemProps, "allowDeselect"> & {
  currentOpen: PopoverProps["open"];
  currentValue: CommandProps["value"];

  onValueChange: CommandProps["onValueChange"];
  setCurrentOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Register the context
const SelectContext = React.createContext<SelectContextType>({
  currentOpen: false,
  currentValue: undefined,
  onValueChange: () => {},
  setCurrentOpen: () => false,
});

type SelectProps = PopoverProps &
  Pick<SelectItemProps, "allowDeselect"> &
  Pick<CommandProps, "onValueChange" | "value"> & {
    keepOpenOnSelect?: boolean;
    defaultValue?: string;
  };

const Select = ({
  allowDeselect,
  children,
  defaultValue,
  keepOpenOnSelect,
  onValueChange,
  onOpenChange,
  open,
  value,
  ...props
}: SelectProps) => {
  const [currentOpen, setCurrentOpen] = React.useState(open ?? false);
  const [selectedValue, setSelectedValue] = React.useState(
    value || defaultValue
  );

  const handleOnSelect = React.useCallback(
    (value: string) => {
      const valueControler = onValueChange || setSelectedValue;
      valueControler(value);

      if (!keepOpenOnSelect) {
        setCurrentOpen(false);
      }
    },
    [keepOpenOnSelect]
  );

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setCurrentOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange]
  );

  return (
    <SelectContext.Provider
      value={{
        allowDeselect,
        currentValue: value || selectedValue,
        onValueChange: handleOnSelect,
        currentOpen: open || currentOpen,
        setCurrentOpen,
      }}
    >
      <Popover
        open={open || currentOpen}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {children}
      </Popover>
    </SelectContext.Provider>
  );
};
Select.displayName = "Select";

type SelectTriggerProps = Omit<PressableProps, "children"> &
  Pick<
    InputProps,
    "disableFocus" | "focused" | "hovered" | "size" | "variant"
  > & {
    asChild?: boolean;
    children?: React.ReactNode;
    inputClassName?: string;
    iconClassName?: string;
  };

const SelectTrigger = React.forwardRef<View, SelectTriggerProps>(
  (
    {
      asChild,
      className,
      inputClassName,
      iconClassName,
      children,
      disableFocus,
      focused,
      hovered,
      onPress,
      size,
      variant,
      ...props
    },
    ref
  ) => {
    const { currentOpen, setCurrentOpen } = React.useContext(SelectContext);

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
        <Input
          asChild
          // @ts-ignore
          className={cn(inputClassName, ecn(className, ["rounded", "border"]))}
          variant={variant}
          size={size}
          disableFocus={disableFocus}
          focused={focused || currentOpen}
          hovered={hovered}
        >
          <Element
            className={cn("gap-3", className)}
            onPress={handleOnPress}
            ref={ref}
            {...props}
          >
            {children}
            <SelectIcon className={iconClassName} />
          </Element>
        </Input>
      </PopoverTrigger>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

type SelectInputProps = CommandInputProps;

const SelectInput = React.forwardRef<
  React.ElementRef<typeof CommandInput>,
  SelectInputProps
>(({ className, wrapperClassName, ...props }, ref) => {
  return (
    <CommandInput
      ref={ref}
      className={cn("ml-1 w-full", className)}
      wrapperClassName={cn("px-5", wrapperClassName)}
      {...props}
    />
  );
});
SelectInput.displayName = "SelectInput";

type SelectValueProps = TextProps & {
  asChild?: boolean;
  placeholder?: React.ReactNode;
};
const SelectValue = React.forwardRef<
  React.ElementRef<typeof Text>,
  SelectValueProps
>(({ asChild, children, className, placeholder, ...props }, ref) => {
  const { currentValue } = React.useContext(SelectContext);
  const Element = asChild ? Slot.Text : Text;
  return (
    <Element
      className={cn(
        "transistion-colors text-foreground",
        {
          "text-muted-foreground": !!placeholder && !children && !currentValue,
        },
        className
      )}
      numberOfLines={1}
      ellipsizeMode="tail"
      selectable={false}
      ref={ref}
      {...props}
    >
      {children || currentValue || placeholder}
    </Element>
  );
});
SelectValue.displayName = "SelectValue";

type SelectIconProps = ViewProps & {
  children?: JSX.Element;
  asChild?: boolean;
};

const SelectIcon = ({
  asChild,
  children,
  className,
  ...props
}: SelectIconProps) => {
  const { currentOpen } = React.useContext(SelectContext);
  const Element = asChild ? Slot.View : View;

  return (
    <Element className={cn("ml-auto h-5 w-5", className)} {...props}>
      <ChevronLeft className={cn(currentOpen ? "rotate-90" : "-rotate-90")} />
    </Element>
  );
};
SelectIcon.displayName = "SelectIcon";

type SelectContentProps = Omit<CommandProps, "onValueChange" | "value"> &
  PopoverContentProps;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof Command>,
  SelectContentProps
>(({ align = "start", alignOffset, children, className, ...props }, ref) => {
  return (
    <PopoverContent align={align} alignOffset={alignOffset} asChild>
      <Command className={cn("p-0", className)} ref={ref} {...props}>
        {children}
      </Command>
    </PopoverContent>
  );
});
SelectContent.displayName = "SelectContent";

type SelectItemProps = CommandItemProps & {
  allowDeselect?: boolean;
};
const SelectItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  SelectItemProps
>(
  (
    {
      allowDeselect: propAllowDeselect,
      children,
      className,
      value,
      onSelect,
      ...props
    },
    ref
  ) => {
    const { allowDeselect, currentValue, onValueChange } =
      React.useContext(SelectContext);
    const selected = currentValue === value;
    const isDeselectAllowed = propAllowDeselect ?? allowDeselect ?? true;

    const handleOnSelect = React.useCallback(
      (newValue: string) => {
        const v =
          isDeselectAllowed && currentValue === newValue ? "" : newValue;
        onValueChange?.(v);
        onSelect?.(v);
      },
      [onSelect, value, currentValue, isDeselectAllowed, onValueChange]
    );

    return (
      <CommandItem
        value={value}
        className={cn(
          "data-[selected=true]:bg-accent pl-3",
          { "bg-primary-soft": selected },
          className
        )}
        onSelect={handleOnSelect}
        ref={ref}
        {...props}
      >
        {children}
      </CommandItem>
    );
  }
);
SelectItem.displayName = "SelectItem";

type SelectCheckProps = CheckProps & {
  value: SelectProps["value"];
};
function SelectCheck({ className, value, ...props }: SelectCheckProps) {
  const { currentValue } = React.useContext(SelectContext);
  const selected = currentValue === value;

  return (
    <Check
      className={cn(
        "mr-1 size-5 transition-opacity",
        selected ? "opacity-100" : "opacity-0"
      )}
      {...props}
    />
  );
}
SelectCheck.displayName = "SelectCheck";

export {
  Select,
  SelectContent,
  SelectContentProps,
  SelectContext,
  SelectEmpty,
  SelectEmptyProps,
  SelectGroup,
  SelectGroupProps,
  SelectGroupHeading,
  SelectGroupHeadingProps,
  SelectIcon,
  SelectIconProps,
  SelectInput,
  SelectInputProps,
  SelectItem,
  SelectItemProps,
  SelectList,
  SelectListProps,
  SelectProps,
  SelectTrigger,
  SelectTriggerProps,
  SelectValue,
  SelectValueProps,
  SelectCheck,
  SelectCheckProps,
};
