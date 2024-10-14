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
} from "react-native";

/* -------------------------------------------------------------------------------------------------
 * NavigationMenu
 * -----------------------------------------------------------------------------------------------*/

export const navigationMenuVariants = cva(
  "relative flex flex-row gap-2 items-center py-3 px-4 rounded-lg",
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
    },
    compoundVariants: [
      //Hovered
      { hovered: true, className: "bg-brand-50" },
      //Active
      {
        active: true,
        className: "bg-brand-700",
      },
    ],
    defaultVariants: {
      hovered: false,
      active: false,
      disabled: false,
    },
  }
);

export type NavigationMenuProps = PressableProps &
  VariantProps<typeof navigationMenuVariants>; // Should add onChange

const NavigationMenuContext = React.createContext<{
  active: boolean;
  disabled: boolean;
  hovered: boolean;
}>({
  active: false,
  disabled: false,
  hovered: false,
});

export const NavigationMenu = React.forwardRef<View, NavigationMenuProps>(
  (
    {
      className,
      active: isActive,
      hovered: isHovered,
      onHoverIn,
      onHoverOut,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [hovered, setHovered] = React.useState<boolean>(!!isHovered);
    const [active, setActive] = React.useState<boolean>(!!isHovered); // SHould change in order to be controled from outside

    const handlePress = (e: GestureResponderEvent) => {
      if (!disabled) setActive(!active);
    };

    const handleHoverIn = (e: MouseEvent) => {
      setHovered(true);
      onHoverIn?.(e);
    };

    const handleHoverOut = (e: MouseEvent) => {
      setHovered(false);
      onHoverOut?.(e);
    };

    return (
      <NavigationMenuContext.Provider value={{ active, hovered, disabled }}>
        <Pressable
          ref={ref}
          className={cn(
            navigationMenuVariants({ active, hovered, disabled }),
            className
          )}
          onPress={handlePress}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          {...props}
        />
      </NavigationMenuContext.Provider>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuIndicator
 * -----------------------------------------------------------------------------------------------*/

export const navigationMenuIndicatorVariants = cva("", {
  variants: {
    active: {
      false: undefined,
      true: undefined,
    },
    disabled: {
      false: undefined,
      true: undefined,
    },
  },
  compoundVariants: [
    //Active
    {
      active: true,
      className: "bg-brand-700",
    },
  ],
  defaultVariants: {
    active: false,
    disabled: false,
  },
});

export type NavigationMenuIndicatorProps = ViewProps &
  VariantProps<typeof navigationMenuIndicatorVariants>;

export const NavigationMenuIndicator = React.forwardRef<
  View,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => {
  const { active, disabled } = React.useContext(NavigationMenuContext);
  return (
    <View
      className={cn(
        navigationMenuIndicatorVariants({ active, disabled }),
        className
      )}
      {...props}
    />
  );
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuContent
 * -----------------------------------------------------------------------------------------------*/

export type NavigationMenuContentProps = ViewProps;

export const NavigationMenuContent = React.forwardRef<
  View,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn("py-0.5", className)} {...props} />;
});
NavigationMenuContent.displayName = "NavigationMenuContent";

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuLabel
 * -----------------------------------------------------------------------------------------------*/

export const navigationMenuLabelVariants = cva(
  "text-sm font-semibold text-neutral-800 ",
  {
    variants: {
      active: {
        false: undefined,
        true: undefined,
      },
      disabled: {
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
      // Disabled
      {
        disabled: true,
        className: "text-neutral-800",
      },
    ],
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

export type NavigationMenuLabelProps = TextProps &
  VariantProps<typeof navigationMenuLabelVariants>;

export const NavigationMenuLabel = React.forwardRef<
  Text,
  NavigationMenuLabelProps
>(({ className, ...props }, ref) => {
  const { active, disabled } = React.useContext(NavigationMenuContext);

  return (
    <Text
      ref={ref}
      className={cn(
        navigationMenuLabelVariants({ active, disabled }),
        className
      )}
      {...props}
    />
  );
});
NavigationMenuLabel.displayName = "NavigationMenuLabel";

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuDescription
 * -----------------------------------------------------------------------------------------------*/

export type NavigationMenuDescriptionProps = TextProps;

export const NavigationMenuDescription = React.forwardRef<
  Text,
  NavigationMenuDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn(
        "text-accent-foreground text-sm font-normal text-neutral-500 dark:text-neutral-300",
        className
      )}
      {...props}
    />
  );
});
NavigationMenuDescription.displayName = "NavigationMenuDescription";

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuSideInfo
 * -----------------------------------------------------------------------------------------------*/

export type NavigationMenuSideInfoProps = ViewProps;

export const NavigationMenuSideInfo = React.forwardRef<
  View,
  NavigationMenuSideInfoProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-1 flex-row gap-2 items-center justify-end",
        className
      )}
      {...props}
    />
  );
});
NavigationMenuSideInfo.displayName = "NavigationMenuSideInfo";
