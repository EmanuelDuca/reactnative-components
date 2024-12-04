import { Input, InputProps } from "@usekeyhole/nativewind";
import {
  Command,
  CommandProps,
  CommandSeparator as DropdownMenuSeparator,
  CommandSeparatorProps as DropdownMenuSeparatorProps,
  Popover,
  PopoverContent,
  PopoverContentProps,
  PopoverProps,
  PopoverTrigger,
} from "@usekeyhole/web";
import React, { Children } from "react";
import * as Slot from "@rn-primitives/slot";
import {
  GestureResponderEvent,
  GestureResponderHandlers,
  MouseEvent,
  NativeSyntheticEvent,
  Pressable,
  PressableProps,
  TargetedEvent,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { cn, ecn } from "@usekeyhole/utils";
import { cva, VariantProps } from "class-variance-authority";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuContextProps = {
  active: string;
  onChange: (value: string) => void;
  currentOpen: PopoverProps["open"];
  setCurrentOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextProps>({
  active: undefined,
  onChange: () => {},
  currentOpen: false,
  setCurrentOpen: () => false,
});

type Direction = "ltr" | "rtl";

type DropdownMenuProps = ViewProps &
  PopoverProps & {
    dir?: Direction;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onValueChange: (value: string) => void;
    active?: string; // The root that we are right know
  };

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  open,
  defaultOpen,
  onValueChange,
  onOpenChange,
  active,
  ...props
}) => {
  const [currentOpen, setCurrentOpen] = React.useState(open ?? false); // This line of code should be changed to use our keuhole hook

  const handleOnChange = React.useCallback(
    (isOpen: boolean) => {
      setCurrentOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange]
  );

  return (
    <DropdownMenuContext.Provider
      value={{
        active,
        onChange: onValueChange,
        currentOpen: true,
        setCurrentOpen,
      }}
    >
      <Popover
        open={open || currentOpen}
        onOpenChange={handleOnChange}
        {...props}
      />
    </DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = "DropdownMenu";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuTrigger
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuTriggerProps = Pick<
  InputProps,
  "disableFocus" | "focused" | "hovered" | "size" | "variant"
> &
  Omit<PressableProps, "children"> & {
    children?: React.ReactNode;
    asChild?: boolean;
  };

const DropdownMenuTrigger = React.forwardRef<View, DropdownMenuTriggerProps>(
  (
    {
      asChild,
      children,
      className,
      disableFocus,
      focused,
      hovered,
      size,
      variant,
      onPress,
      ...props
    },
    ref
  ) => {
    const { setCurrentOpen } = React.useContext(DropdownMenuContext);

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
          className={cn(ecn(className, ["rounded", "border"]))} // !!! Can not overwrite styles with ClassName
          variant={variant}
          size={size}
          disableFocus={disableFocus}
          focused={focused}
          hovered={hovered}
        >
          <Element onPress={handleOnPress} ref={ref} {...props}>
            {children}
          </Element>
        </Input>
      </PopoverTrigger>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuContent
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuContentProps = Omit<CommandProps, "onValueChange" | "value"> &
  PopoverContentProps;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Command>,
  DropdownMenuContentProps
>(({ align = "start", alignOffset, children, className, ...props }, ref) => {
  return (
    <PopoverContent align={align} alignOffset={alignOffset} {...props} asChild>
      <Command className={cn("p-2 gap-1", className)} ref={ref} {...props}>
        {children}
      </Command>
    </PopoverContent>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuLabel
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuLabelProps = TextProps;

const DropdownMenuLabel = React.forwardRef<Text, DropdownMenuLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "px-2.5 py-1 text-sm font-bold text-neutral-800 dark:text-neutral-100",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItem
 * -----------------------------------------------------------------------------------------------*/

const dropdownMenuItemVariants = cva(
  "relative flex flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
  {
    variants: {
      hovered: {
        false: undefined,
        true: undefined,
      },
      active: {
        false: undefined,
        true: undefined,
      },
      disabled: {
        false: undefined,
        true: undefined,
      },
      pressed: {
        false: undefined,
        true: undefined,
      },
      validation: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      //Hovered
      { hovered: true, className: "bg-neutral-50 dark:bg-neutral-800" },
      //Active
      {
        active: true,
        className: "bg-brand-50 dark:bg-brand-800",
      },
      //Pressed
      {
        pressed: true,
        active: false,
        disabled: false,
        className: "bg-neutral-50 dark:bg-neutral-800",
      },
      //Disabled
      {
        disabled: true,
        className: "opacity-50",
      },
    ],
    defaultVariants: {
      pressed: false,
      hovered: false,
      active: false,
      disabled: false,
    },
  }
);

type DropdownMenuItemContextProps = Pick<
  VariantProps<typeof dropdownMenuItemVariants>,
  "active" | "disabled" | "hovered" | "pressed" | "validation"
> & {
  onBlur?: PressableProps["onBlur"];
  onFocus?: PressableProps["onFocus"];
  onPress?: PressableProps["onPress"];
};

const DropdownMenuItemContext =
  React.createContext<DropdownMenuItemContextProps>({
    active: false,
    disabled: false,
    hovered: false,
    validation: false,
    onBlur: undefined,
    onFocus: undefined,
    onPress: undefined,
  });

type DropdownMenuItemProps = PressableProps &
  VariantProps<typeof dropdownMenuItemVariants> & {
    value: string; //Maybe we can change to url
  };

const DropdownMenuItem = React.forwardRef<View, DropdownMenuItemProps>(
  (
    {
      className,
      active: providedSelected,
      hovered: isHovered,
      pressed: isPressed,
      value,
      validation,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [hovered, setHovered] = React.useState<boolean>(!!isHovered);
    const [pressed, setPressed] = React.useState<boolean>(!!isPressed);
    const { active: contextActive, onChange } =
      React.useContext(DropdownMenuContext);

    const active = value === contextActive;

    const handleChange = (value: string) => {
      onChange(value);
    };

    const handleLongPressIn = (e: GestureResponderEvent) => {
      setPressed(true);
      onLongPress?.(e);
    };

    const handlePress = (e: GestureResponderEvent) => {
      handleChange(value);
      onPress?.(e);
    };
    const handlePressOut = (e: GestureResponderEvent) => {
      setPressed(false);
      onPressOut?.(e);
    };

    const handleHoverIn = (e: MouseEvent) => {
      setHovered(true);
      onHoverIn?.(e);
    };

    const handleHoverOut = (e: MouseEvent) => {
      setHovered(false);
      onHoverOut?.(e);
    };

    const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
      if (!disabled) {
        setHovered(true);
        onFocus?.(e);
      }
    };

    const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
      if (!disabled) {
        setHovered(false);
        onBlur?.(e);
      }
    };

    return (
      <DropdownMenuItemContext.Provider
        value={{ active, pressed, hovered, disabled, validation }}
      >
        <Pressable
          ref={ref}
          className={cn(
            dropdownMenuItemVariants({ active, hovered, disabled, pressed }),
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onLongPress={handleLongPressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          {...props}
        />
      </DropdownMenuItemContext.Provider>
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuIcon
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuIconProps = ViewProps & {
  children?: JSX.Element;
};

const DropdownMenuIcon = ({
  className,
  children,
  ...props
}: DropdownMenuIconProps) => {
  const { validation } = React.useContext(DropdownMenuItemContext);
  const styles = cn(
    validation
      ? "stroke-red-700 dark:stroke-red-700 "
      : "stroke-neutral-800 dark:stroke-neutral-100",
    className
  );

  if (children) {
    return React.cloneElement(children, {
      className: styles,
      ...props,
    });
  } else {
    return null;
  }
};
DropdownMenuIcon.displayName = "DropdownMenuIcon";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItemText
 * -----------------------------------------------------------------------------------------------*/

const dropdownMenuItemTextVariants = cva(
  "text-sm outline-none transition-colors font-normal text-neutral-800 dark:text-neutral-100 text-for",
  {
    variants: {
      validation: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      // Validation
      {
        validation: true,
        className: "text-red-800 dark:text-red-100",
      },
    ],
    defaultVariants: {
      validation: false,
    },
  }
);

type DropdownMenuItemTextProps = TextProps &
  VariantProps<typeof dropdownMenuItemTextVariants>;

const DropdownMenuItemText = React.forwardRef<Text, DropdownMenuItemTextProps>(
  ({ className, ...props }, ref) => {
    const { validation } = React.useContext(DropdownMenuItemContext);
    return (
      <Text
        ref={ref}
        className={cn(dropdownMenuItemTextVariants({ validation }), className)}
        {...props}
      />
    );
  }
);
DropdownMenuItemText.displayName = "DropdownMenuItemText";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuEndAdornment
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuEndAdornmentProps = ViewProps;

const DropdownMenuEndAdornment = React.forwardRef<
  View,
  DropdownMenuEndAdornmentProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-1 flex-row items-center justify-end gap-2",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuEndAdornment.displayName = "DropdownMenuEndAdornment";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSub
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuSubContextProps = {
  active: string;
  onChange: (value: string) => void;
  currentOpen: PopoverProps["open"];
  setCurrentOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownMenuSubContext = React.createContext<DropdownMenuSubContextProps>(
  {
    active: undefined,
    onChange: () => {},
    currentOpen: false,
    setCurrentOpen: () => false,
  }
);

type DropdownMenuSubProps = ViewProps &
  PopoverProps & {
    dir?: Direction;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onValueChange: (value: string) => void;
    active?: string;
  };

const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({
  className,
  open,
  defaultOpen,
  onValueChange,
  onOpenChange,
  active,
  ...props
}) => {
  const [currentOpen, setCurrentOpen] = React.useState(open ?? false); // This line of code should be changed to use our keuhole hook
  const [hoveredItem, setHoveredItem] = React.useState<string>();

  const handleOnChange = React.useCallback(
    (isOpen: boolean) => {
      setCurrentOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange]
  );

  return (
    <DropdownMenuContext.Provider
      value={{
        active,
        onChange: onValueChange,
        currentOpen: true,
        setCurrentOpen,
      }}
    >
      <Popover
        open={open || currentOpen}
        onOpenChange={handleOnChange}
        {...props}
      />
    </DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = "DropdownMenu";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubTrigger
 * -----------------------------------------------------------------------------------------------*/

const dropdownMenuSubTriggerVariants = cva(
  "relative flex flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
  {
    variants: {
      hovered: {
        false: undefined,
        true: undefined,
      },
      active: {
        false: undefined,
        true: undefined,
      },
      disabled: {
        false: undefined,
        true: undefined,
      },
      pressed: {
        false: undefined,
        true: undefined,
      },
      validation: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      //Hovered
      { hovered: true, className: "bg-neutral-50 dark:bg-neutral-800" },
      //Active
      {
        active: true,
        className: "bg-brand-50 dark:bg-brand-800",
      },
      //Pressed
      {
        pressed: true,
        active: false,
        disabled: false,
        className: "bg-neutral-50 dark:bg-neutral-800",
      },
      //Disabled
      {
        disabled: true,
        className: "opacity-50",
      },
    ],
    defaultVariants: {
      pressed: false,
      hovered: false,
      active: false,
      disabled: false,
    },
  }
);

type DropdownMenuSubTriggerProps = PressableProps &
  VariantProps<typeof dropdownMenuSubTriggerVariants> & {};

const DropdownMenuSubTrigger = React.forwardRef<
  View,
  DropdownMenuSubTriggerProps
>(
  (
    {
      className,
      active: providedSelected,
      pressed: isPressed,
      hovered: isHovered,
      validation,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [hovered, setHovered] = React.useState<boolean>(!!isHovered);
    const [pressed, setPressed] = React.useState<boolean>(!!isPressed);
    const { setCurrentOpen } = React.useContext(DropdownMenuContext);

    const handleOnPress = React.useCallback(
      (event: GestureResponderEvent) => {
        setCurrentOpen((x) => !x);
        if (onPress) onPress(event);
      },
      [onPress]
    );

    const handleHoverIn = (e: MouseEvent) => {
      setHovered(true);
      onHoverIn?.(e);
    };

    const handleHoverOut = (e: MouseEvent) => {
      setHovered(false);
      onHoverOut?.(e);
    };

    const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
      if (!disabled) {
        setHovered(true);
        onFocus?.(e);
      }
    };

    const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
      if (!disabled) {
        setHovered(false);
        onBlur?.(e);
      }
    };
    const handleLongPressIn = (e: GestureResponderEvent) => {
      setPressed(true);
      onLongPress?.(e);
    };
    const handlePressOut = (e: GestureResponderEvent) => {
      setPressed(false);
      onPressOut?.(e);
    };

    const active = providedSelected;

    return (
      <DropdownMenuItemContext.Provider
        value={{
          active,
          pressed,
          hovered,
          disabled,
          validation,
        }}
      >
        <PopoverTrigger asChild>
          <Pressable
            ref={ref}
            className={cn(
              dropdownMenuItemVariants({ active, hovered, disabled, pressed }),
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onHoverIn={handleHoverIn}
            onHoverOut={handleHoverOut}
            onLongPress={handleLongPressIn}
            onPressOut={handlePressOut}
            onPress={handleOnPress}
            {...props}
          />
        </PopoverTrigger>
      </DropdownMenuItemContext.Provider>
    );
  }
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubContent
 * -----------------------------------------------------------------------------------------------*/

type DropdownMenuSubContentProps = Omit<
  CommandProps,
  "onValueChange" | "value"
> &
  PopoverContentProps;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof Command>,
  DropdownMenuSubContentProps
>(({ align = "start", alignOffset, children, className, ...props }, ref) => {
  return (
    <PopoverContent align={align} alignOffset={alignOffset} {...props} asChild>
      <Command className={cn("p-2 gap-1", className)} ref={ref} {...props}>
        {children}
      </Command>
    </PopoverContent>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContentProps,
  DropdownMenuEndAdornment,
  DropdownMenuEndAdornmentProps,
  DropdownMenuIcon,
  DropdownMenuIconProps,
  DropdownMenuItem,
  DropdownMenuItemProps,
  DropdownMenuItemText,
  DropdownMenuItemTextProps,
  DropdownMenuLabel,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuSeparator,
  DropdownMenuSeparatorProps,
  DropdownMenuTrigger,
  DropdownMenuTriggerProps,
  DropdownMenuSub,
  DropdownMenuSubProps,
  DropdownMenuSubTrigger,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContent,
  DropdownMenuSubContentProps,
};
