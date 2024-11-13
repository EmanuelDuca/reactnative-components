import { cn, IS_WEB } from "@usekeyhole/utils";
import { VariantProps, cva } from "class-variance-authority";
import { useControllableState } from "@usekeyhole/hooks";
import React from "react";
import {
  GestureResponderEvent,
  MouseEvent,
  Pressable,
  PressableProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";

const buttonVariants = cva(
  "relative flex flex-row items-center justify-center gap-2 rounded-sm transition-all",
  {
    variants: {
      size: {
        sm: "px-2 py-1",
        default: "px-3 py-2",
        lg: "px-5 py-3",
        "icon-sm": "p-1",
        icon: "p-2",
        "icon-lg": "p-3",
      },
      variant: {
        ghost: "bg-transparent",
        default: "",
        link: "p-0",
      },
      color: {
        default: "bg-neutral-100 dark:bg-neutral-700",
        "brand-soft": "bg-brand-50 dark:bg-brand-900",
        brand: "bg-brand-700 dark:bg-brand-700",
        "red-soft": "bg-red-50 dark:bg-red-900",
        red: "bg-red-600 dark:bg-red-600",
        blue: "",
        accent: "",
        link: "p-0",
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
    // We should rewrite this to use group-{modifier} instead of compoundVariants when the disabled props issue is fixed:
    // https://github.com/nativewind/nativewind/issues/985
    compoundVariants: [
      // transparent
      {
        variant: "ghost",
        color: "default",
        className: "bg-transparent",
      },
      {
        variant: "ghost",
        color: "default",
        hovered: true,
        className: "bg-accent dark:bg-accent",
      },
      {
        variant: "ghost",
        color: "default",
        pressed: true,
        className: "bg-neutral-100 dark:bg-neutral-600",
      },
      // default
      {
        variant: "default",
        color: "default",
        hovered: true,
        className: "bg-neutral-200 dark:bg-neutral-600",
      },
      {
        variant: "default",
        color: "default",
        pressed: true,
        className: "bg-neutral-100 dark:bg-neutral-800",
      },
      // brand
      {
        color: "brand-soft",
        hovered: true,
        pressed: false,
        className: "bg-brand-200 dark:bg-brand-800",
      },
      // brand-solid
      {
        color: "brand",
        hovered: true,
        pressed: false,
        className: "bg-brand-800 dark:bg-brand-800",
      },
      // red
      {
        color: "red-soft",
        hovered: true,
        pressed: false,
        className: "bg-red-100 dark:bg-red-800",
      },
      // red-solid
      {
        color: "red",
        hovered: true,
        pressed: false,
        className: "bg-red-700 dark:bg-red-800",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "default",
    },
  }
);

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  variant?: "default" | "ghost" | "link";
  color?:
    | "default"
    | "brand"
    | "brand-soft"
    | "red"
    | "red-soft"
    | "blue"
    | "accent"
    | "link";
  ringProps?: ButtonRingProp;
}

const ButtonContext = React.createContext<{
  variant: ButtonProps["variant"];
  color: ButtonProps["color"];
  disabled: boolean;
  hovered: boolean;
  pressed: boolean;
}>({
  variant: "default",
  color: "default",
  disabled: false,
  hovered: false,
  pressed: false,
});

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      size,
      hovered: isHovered,
      pressed: isPressed,
      variant = "default",
      color = "default",
      ringProps,
      className,
      onHoverIn,
      onHoverOut,
      onPressIn,
      onPressOut,
      children,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [pressed, setPressed] = useControllableState({
      prop: isPressed,
      defaultProp: false,
      onChange: () => {
        if (onPressIn) {
          onPressIn({} as GestureResponderEvent);
        }
      },
    });
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
      onChange: () => {
        if (onHoverIn) {
          onHoverIn({} as MouseEvent);
        }
      },
    });
    return (
      <ButtonContext.Provider
        value={{ variant, color, disabled, hovered, pressed }}
      >
        <Pressable
          ref={ref}
          className={cn(
            buttonVariants({ hovered, pressed, size, variant, color }),
            { "opacity-50": disabled },
            className
          )}
          onHoverIn={(e) => {
            if (!disabled) setHovered(true);
            onHoverIn?.(e);
          }}
          onHoverOut={(e) => {
            if (!disabled) setHovered(false);
            onHoverOut?.(e);
          }}
          onPressIn={(e) => {
            if (!disabled) setPressed(true);
            onPressIn?.(e);
          }}
          onPressOut={(e) => {
            if (!disabled) setPressed(false);
            onPressOut?.(e);
          }}
          {...props}
        >
          <>
            <ButtonRing {...ringProps} />
            {children}
          </>
        </Pressable>
      </ButtonContext.Provider>
    );
  }
);
Button.displayName = "Button";

const buttonTextVariants = cva("text-sm font-semibold transition-colors", {
  variants: {
    variant: {
      ghost: "text-neutral-900 dark:text-white",
      default: "text-neutral-800 dark:text-neutral-100",
      link: "p-0",
    },
    color: {
      default: "text-neutral-800 dark:text-neutral-100",
      "brand-soft": "bg-brand-50 dark:bg-brand-900",
      brand: "text-white dark:text-white",
      "red-soft": "text-red-800 dark:text-red-300",
      red: "text-white dark:text-white",
      blue: "",
      accent: "",
      link: "text-blue-700 dark:text-blue-300",
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

export interface ButtonTextProps extends TextProps {}

export const ButtonText = React.forwardRef<Text, ButtonTextProps>(
  ({ className, ...props }, ref) => {
    const { hovered, pressed, variant } = React.useContext(ButtonContext);
    return (
      <Text
        ref={ref}
        className={cn(
          buttonTextVariants({ hovered, pressed, variant }),
          { "select-none whitespace-nowrap": IS_WEB },
          className
        )}
        {...props}
      />
    );
  }
);
ButtonText.displayName = "ButtonText";

export type ButtonIconProps = Omit<ViewProps, "children"> & {
  children: JSX.Element;
};

export const buttonIconVariants = cva("transition-variants size-5", {
  variants: {
    variant: {
      ghost: "stroke-neutral-900 dark:stroke-white",
      default: "stroke-neutral-800 dark:stroke-neutral-100",
      link: "",
    },
    color: {
      default: "stroke-neutral-800 dark:stroke-neutral-100",
      "brand-soft": "stroke-brand-800 dark:stroke-brand-50",
      brand: "stroke-white dark:stroke-white0",
      "red-soft": "stroke-white dark:stroke-white",
      red: "text-white dark:text-white",
      blue: "",
      accent: "",
      link: "stroke-blue-700 dark:stroke-blue-300",
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

export const ButtonIcon = ({
  children,
  className,
  ...props
}: ButtonIconProps) => {
  const { hovered, pressed, variant } = React.useContext(ButtonContext);
  return React.cloneElement(children, {
    className: cn(buttonIconVariants({ hovered, pressed, variant }), className),
    ...props,
  });
};
ButtonIcon.displayName = "ButtonIcon";

const buttonRingVariants = cva(
  "absolute bottom-0 left-0 right-0 top-0 -m-[1px] rounded-sm border-2 opacity-0 transition-all",
  {
    variants: {
      variant: {
        ghost: "border-neutral-300 dark:border-neutral-500",
        default: "bottom-0 left-0 right-0 top-0 border-2",
        link: "rounded-none border-l-0 border-r-0 border-t-0",
      },
      color: {
        default: "border-neutral-300 dark:border-neutral-500",
        "brand-soft": "border-brand-200 dark:border-brand-700",
        brand: "border-brand-200 dark:border-brand-800",
        "red-soft": "border-red-200 dark:border-red-800",
        red: "border-red-200 dark:border-red-800s",
        blue: "",
        accent: "",
        link: "border-blue-700 dark:border-blue-300",
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
    compoundVariants: [
      {
        pressed: true,
        className: "opacity-100",
      },
      {
        variant: "link",
        hovered: true,
        className: "opacity-100",
      },
      {
        variant: "link",
        pressed: true,
        className: "border-blue-400 dark:border-blue-600",
      },
    ],
    defaultVariants: {
      variant: "default",
      hovered: false,
      pressed: false,
    },
  }
);

type ButtonRingProp = ViewProps & VariantProps<typeof buttonVariants>;

export const ButtonRing: React.FC = () => {
  const { variant, hovered, pressed } = React.useContext(ButtonContext);
  return (
    <View className={cn(buttonRingVariants({ variant, hovered, pressed }))} />
  );
};
ButtonRing.displayName = "ButtonRing";
