import React from "react";
import { cva } from "class-variance-authority";
import { Button } from "@usekeyhole/nativewind";
import { cn, VariantProps } from "@usekeyhole/utils";
import {
  GestureResponderEvent,
  MouseEvent,
  PressableProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";

/* -------------------------------------------------------------------------------------------------
 * Toggle
 * -----------------------------------------------------------------------------------------------*/

const ToggleContext = React.createContext<{
  size: ToggleProps["size"];
  disabled: boolean;
  hovered: boolean;
  selected: boolean;
}>({
  size: "base",
  disabled: false,
  hovered: false,
  selected: false,
});

const toggleVariants = cva("p-0 transition-colors", {
  variants: {
    size: {
      small: "p-1",
      base: "p-2",
      large: "p-3",
    },
    selected: {
      true: undefined,
      false: undefined,
    },
    hovered: {
      true: undefined,
      false: undefined,
    },
    disabled: {
      true: undefined,
      false: undefined,
    },
  },
  compoundVariants: [
    {
      selected: true,
      hovered: false,
      className: "bg-neutral-100 dark:bg-neutral-800",
    },
  ],
  defaultVariants: {
    size: "base",
    selected: false,
    hovered: false,
    disabled: false,
  },
});

type ToggleProps = PressableProps &
  VariantProps<typeof toggleVariants> & {
    children?: React.ReactNode;
  };

const Toggle = React.forwardRef<View, ToggleProps>(
  (
    {
      className,
      children,
      hovered: isHovered,
      selected: isSelected,
      size,
      onHoverIn,
      onHoverOut,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [hovered, setHovered] = React.useState<boolean>(false);
    const [internalSelected, setInternalSelected] =
      React.useState<boolean>(false);
    const selected = isSelected ?? internalSelected;

    const handleHoverIn = (e: MouseEvent) => {
      if (!disabled) setHovered(true);
      onHoverIn?.(e);
    };

    const handleHoverOut = (e: MouseEvent) => {
      setHovered(false);
      onHoverOut?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      isSelected ?? setInternalSelected(!selected);
      onPressOut?.(e);
    };

    return (
      <ToggleContext.Provider value={{ size, hovered, disabled, selected }}>
        <Button
          ref={ref}
          disabled={disabled}
          className={cn(
            "",
            toggleVariants({ hovered, disabled, selected, size }),
            className
          )}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          onPressOut={handlePressOut}
          {...props}
        >
          <ToggleRing />
          {children}
        </Button>
      </ToggleContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * ToggleText
 * -----------------------------------------------------------------------------------------------*/

const toggleTextVariants = cva(
  "flex text-sm font-semibold text-neutral-800 dark:text-neutral-100",
  {
    variants: {
      size: {
        small: "px-2",
        base: "px-3",
        large: "px-5",
      },
      disabled: {
        true: undefined,
        false: undefined,
      },
    },
    compoundVariants: [],
    defaultVariants: {
      disabled: false,
    },
  }
);

type ToggleTextProps = TextProps;

const ToggleText = React.forwardRef<Text, ToggleTextProps>(
  ({ className, ...props }, ref) => {
    const { size } = React.useContext(ToggleContext);
    return (
      <Text
        ref={ref}
        className={cn(toggleTextVariants({ size }), className)}
        {...props}
      />
    );
  }
);
ToggleText.displayName = "ToggleText";

/* -------------------------------------------------------------------------------------------------
 * ToggleIcon
 * -----------------------------------------------------------------------------------------------*/

type ToggleIconProps = Omit<ViewProps, "children"> & {
  children: JSX.Element;
};

const toggleIconVariants = cva("transition-variants size-5", {
  variants: {
    size: {
      small: "",
      base: "",
      large: "",
    },
    variant: {
      default: "stroke-neutral-800 dark:stroke-neutral-100",
    },
    hovered: {
      false: undefined,
      true: undefined,
    },
    pressed: {
      false: undefined,
      true: undefined,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const ToggleIcon = ({ children, className, ...props }: ToggleIconProps) => {
  const { size } = React.useContext(ToggleContext);
  return React.cloneElement(children, {
    className: cn(toggleIconVariants({ size }), className),
    ...props,
  });
};
ToggleIcon.displayName = "ToggleIcon";

/* -------------------------------------------------------------------------------------------------
 * ToggleRing
 * -----------------------------------------------------------------------------------------------*/

const toggleRingVariants = cva(
  "absolute bottom-0 left-0 right-0 top-0 -m-[1px] rounded-sm border-2 opacity-0 transition-all",
  {
    variants: {
      variant: {
        default:
          "bottom-0 left-0 right-0 top-0 border-2 border-neutral-300 dark:border-neutral-600",
      },
      selected: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      {
        selected: true,
        className: "opacity-100",
      },
    ],
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  }
);

export const ToggleRing: React.FC = () => {
  const { hovered, selected } = React.useContext(ToggleContext);
  return <View className={cn(toggleRingVariants({ selected }))} />;
};
ToggleRing.displayName = "ToggleRing";

export {
  Toggle,
  ToggleProps,
  ToggleText,
  ToggleTextProps,
  ToggleIcon,
  ToggleIconProps,
};
