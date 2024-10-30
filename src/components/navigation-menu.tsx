import { cn } from "@usekeyhole/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  View,
  MouseEvent,
  ViewProps,
  TextProps,
  Text,
  NativeSyntheticEvent,
  TargetedEvent,
} from "react-native";

/* -------------------------------------------------------------------------------------------------
 * Menu
 * -----------------------------------------------------------------------------------------------*/

interface MenuContextProps extends PressableProps {
  selectedValue: string | null;
  setSelectedValue: (value: string) => void;
}

const MenuContext = React.createContext<MenuContextProps>({
  selectedValue: "",
  setSelectedValue: () => {},
});

interface MenuProps extends ViewProps {
  value: string;
  onChange: (value: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  className,
  value,
  onChange: setSelectedValue,
  children,
  ...props
}) => {
  return (
    <MenuContext.Provider
      value={{
        selectedValue: value,
        setSelectedValue,
      }}
    >
      <View className={cn("gap-1", className)} {...props}>
        {children}
      </View>
    </MenuContext.Provider>
  );
};
Menu.displayName = "Menu";

/* -------------------------------------------------------------------------------------------------
 * MenuGroup
 * -----------------------------------------------------------------------------------------------*/

type MenuGroupProps = ViewProps;

const MenuGroup = React.forwardRef<View, MenuGroupProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} className={cn("gap-1", className)} {...props} />;
  }
);
MenuGroup.displayName = "MenuGroup";

/* -------------------------------------------------------------------------------------------------
 * MenuItem
 * -----------------------------------------------------------------------------------------------*/

const menuItemVariants = cva(
  "relative flex flex-row items-center gap-2 rounded-lg px-4 py-3 transition-colors",
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
    },
    compoundVariants: [
      //Hovered
      { hovered: true, className: "bg-brand-50 dark:bg-brand-800" },
      //Active
      {
        active: true,
        className: "bg-brand-700 dark:bg-brand-700",
      },
      //Pressed
      {
        pressed: true,
        active: false,
        disabled: false,
        className: "bg-brand-50 dark:bg-brand-800",
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

type MenuItemContextProps = Pick<
  VariantProps<typeof menuItemVariants>,
  "active" | "disabled" | "hovered"
> & {
  onBlur?: PressableProps["onBlur"];
  onFocus?: PressableProps["onFocus"];
  onPress?: PressableProps["onPress"];
};

const MenuItemContext = React.createContext<MenuItemContextProps>({
  active: false,
  disabled: false,
  hovered: false,
  onBlur: undefined,
  onFocus: undefined,
  onPress: undefined,
});

type MenuItemProps = PressableProps &
  VariantProps<typeof menuItemVariants> & {
    value: string;
  };

const MenuItem = React.forwardRef<View, MenuItemProps>(
  (
    {
      className,
      active: providedSelected,
      hovered: isHovered,
      pressed: isPressed,
      value,
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
    const { selectedValue, setSelectedValue } = React.useContext(MenuContext);

    const disabled = !!props.disabled;
    const [hovered, setHovered] = React.useState<boolean>(!!isHovered);
    const active = providedSelected || selectedValue === value;
    const [pressed, setPressed] = React.useState<boolean>(!!isPressed);

    const handleChange = (value: string) => {
      if (!disabled) setSelectedValue(value);
    };

    const handleLongPressIn = (e: GestureResponderEvent) => {
      setPressed(true);
      onLongPress?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      setPressed(false);
      handleChange(value);
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
      <MenuItemContext.Provider value={{ active, hovered, disabled }}>
        <Pressable
          ref={ref}
          className={cn(
            menuItemVariants({ active, hovered, disabled, pressed }),
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onLongPress={handleLongPressIn}
          onPressOut={handlePressOut}
          {...props}
        />
      </MenuItemContext.Provider>
    );
  }
);
MenuItem.displayName = "MenuItem";

/* -------------------------------------------------------------------------------------------------
 * MenuIcon
 * -----------------------------------------------------------------------------------------------*/

type MenuIconProps = ViewProps & {
  children?: JSX.Element;
};

const MenuIcon = ({ className, children, ...props }: MenuIconProps) => {
  const { active } = React.useContext(MenuItemContext);
  const styles = active ? "stroke-white" : "dark:stroke-neutral-100"; // Should improve this line of code
  
  if (children) {
    return React.cloneElement(children, {
      className: cn(styles, className),
      ...props,
    });
  } else {
    return <></>;
  }
};
MenuIcon.displayName = "MenuIcon";

/* -------------------------------------------------------------------------------------------------
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/

type MenuContentProps = ViewProps;

const MenuContent = React.forwardRef<View, MenuContentProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} className={cn("py-0.5", className)} {...props} />;
  }
);
MenuContent.displayName = "MenuContent";

/* -------------------------------------------------------------------------------------------------
 * MenuLabel
 * -----------------------------------------------------------------------------------------------*/

const menuLabelVariants = cva(
  "text-sm font-semibold text-neutral-800 dark:text-neutral-100",
  {
    variants: {
      active: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      //Active
      {
        active: true,
        className: "text-white",
      },
    ],
    defaultVariants: {
      active: false,
    },
  }
);

type MenuLabelProps = TextProps & VariantProps<typeof menuLabelVariants>;

const MenuLabel = React.forwardRef<Text, MenuLabelProps>(
  ({ className, ...props }, ref) => {
    const { active } = React.useContext(MenuItemContext);

    return (
      <Text
        ref={ref}
        className={cn(menuLabelVariants({ active }), className)}
        {...props}
      />
    );
  }
);
MenuLabel.displayName = "MenuLabel";

/* -------------------------------------------------------------------------------------------------
 * MenuDescription
 * -----------------------------------------------------------------------------------------------*/

const menuDescriptionVariants = cva(
  "text-accent-foreground text-sm font-normal text-neutral-500 dark:text-neutral-400 ",
  {
    variants: {
      active: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      //Active
      {
        active: true,
        className: "text-white dark:text-white",
      },
    ],
    defaultVariants: {
      active: false,
    },
  }
);

type MenuDescriptionProps = TextProps &
  VariantProps<typeof menuDescriptionVariants>;

const MenuDescription = React.forwardRef<Text, MenuDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { active } = React.useContext(MenuItemContext);
    return (
      <Text
        ref={ref}
        className={cn(menuDescriptionVariants({ active }), className)}
        {...props}
      />
    );
  }
);
MenuDescription.displayName = "MenuDescription";

/* -------------------------------------------------------------------------------------------------
 * MenuEndAdornment
 * -----------------------------------------------------------------------------------------------*/

type MenuEndAdornmentProps = ViewProps;

const MenuEndAdornment = React.forwardRef<View, MenuEndAdornmentProps>(
  ({ className, ...props }, ref) => {
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
  }
);
MenuEndAdornment.displayName = "MenuEndAdornment";

export {
  Menu,
  MenuProps,
  MenuGroup,
  MenuGroupProps,
  MenuItem,
  MenuItemProps,
  MenuIcon,
  MenuIconProps,
  MenuContent,
  MenuContentProps,
  MenuLabel,
  MenuLabelProps,
  MenuDescription,
  MenuDescriptionProps,
  MenuEndAdornment,
  MenuEndAdornmentProps,
};
