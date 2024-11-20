import { cn, IS_WEB } from "@usekeyhole/utils";
import { VariantProps, cva } from "class-variance-authority";
import { useControllableState } from "@usekeyhole/hooks";
import React from "react";
import {
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
        ghost: "bg-transparent dark:bg-transparent",
        default: "",
        link: "p-0",
      },
      color: {
        default: "bg-neutral-100 dark:bg-neutral-700",
        "brand-soft": "bg-brand-50 dark:bg-brand-900",
        brand: "bg-brand-700 dark:bg-brand-700",
        "red-soft": "bg-red-50 dark:bg-red-900",
        red: "bg-red-600 dark:bg-red-600",
        blue: "bg-blue-600 dark:bg-blue-500",
        accent: "bg-neutral-100 dark:bg-neutral-700",
        link: "bg-blue-700 dark:bg-blue-800",
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
      // Ghost Default
      {
        variant: "ghost",
        className: "bg-transparent dark:bg-transparent",
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
      // Gost  Brand
      {
        variant: "ghost",
        color: "brand",
        hovered: true,
        className: "bg-brand-50 dark:bg-brand-700",
      },
      {
        variant: "ghost",
        color: "brand",
        pressed: true,
        className: "bg-brand-100 dark:bg-brand-600",
      },
      // Gost  Brand-Soft
      {
        variant: "ghost",
        color: "brand-soft",
        hovered: true,
        className: "bg-brand-400 dark:bg-brand-100",
      },
      {
        variant: "ghost",
        color: "brand-soft",
        pressed: true,
        className: "bg-brand-500 dark:bg-brand-600",
      },
      // Ghost Red
      {
        variant: "ghost",
        color: "red",
        hovered: true,
        className: "bg-red-50 dark:bg-red-700",
      },
      {
        variant: "ghost",
        color: "red",
        pressed: true,
        className: "bg-red-100 dark:bg-red-600",
      },
      // Ghost Red-Soft
      {
        variant: "ghost",
        color: "red-soft",
        hovered: true,
        className: "bg-red-400 dark:bg-red-700",
      },
      {
        variant: "ghost",
        color: "red-soft",
        pressed: true,
        className: "bg-red-500 dark:bg-red-600",
      },
      // Ghost Blue
      {
        variant: "ghost",
        color: "blue",
        hovered: true,
        className: "bg-blue-50 dark:bg-blue-700",
      },
      {
        variant: "ghost",
        color: "blue",
        pressed: true,
        className: "bg-blue-100 dark:bg-blue-600",
      },
      // Ghost Link
      {
        variant: "ghost",
        color: "link",
        hovered: true,
        className: "bg-blue-100 dark:bg-blue-600",
      },
      {
        variant: "ghost",
        color: "link",
        pressed: true,
        className: "bg-blue-200 dark:bg-blue-500",
      },
      // Ghost Accent
      {
        variant: "ghost",
        color: "accent",
        hovered: true,
        className: "bg-neutral-50 dark:bg-neutral-600",
      },
      {
        variant: "ghost",
        color: "accent",
        pressed: true,
        className: "bg-neutral-50 dark:bg-neutral-600",
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
        variant: "default",
        color: "brand-soft",
        hovered: true,
        pressed: false,
        className: "bg-brand-200 dark:bg-brand-800",
      },
      // brand-solid
      {
        variant: "default",
        color: "brand",
        hovered: true,
        pressed: false,
        className: "bg-brand-800 dark:bg-brand-800",
      },
      // red
      {
        variant: "default",
        color: "red-soft",
        hovered: true,
        pressed: false,
        className: "bg-red-100 dark:bg-red-800",
      },
      // red-solid
      {
        variant: "default",
        color: "red",
        hovered: true,
        pressed: false,
        className: "bg-red-700 dark:bg-red-800",
      },
      // Blue
      {
        variant: "default",
        color: "blue",
        hovered: true,
        className: "bg-blue-700 dark:bg-blue-800",
      },
      {
        variant: "default",
        color: "blue",
        pressed: true,
        className: "bg-blue-600 dark:bg-blue-600",
      },
      // Default Accent
      {
        variant: "default",
        color: "accent",
        hovered: true,
        className: "bg-neutral-200 dark:bg-neutral-600",
      },
      {
        variant: "default",
        color: "accent",
        pressed: true,
        className: "bg-neutral-100 dark:bg-neutral-800",
      },

      // Variant Link
      {
        variant: "link",
        className: "bg-transparent dark:bg-transparent",
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
  ringProps?: ButtonRingProp;
  children: JSX.Element | JSX.Element[];
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
    });
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
    });

    const setColor = variant === "link" && color === "default" ? "link" : color;

    return (
      <ButtonContext.Provider
        value={{
          variant,
          color: setColor,
          disabled,
          hovered: !!hovered,
          pressed: !!pressed,
        }}
      >
        <Pressable
          ref={ref}
          className={cn(
            buttonVariants({
              hovered,
              pressed,
              size,
              variant,
              color: setColor,
            }),
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
          <ButtonRing {...ringProps} />
          {children}
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
      "brand-soft": "text-brand-800 dark:text-brand-50",
      brand: "text-white dark:text-white",
      "red-soft": "text-red-800 dark:text-red-300",
      red: "text-white dark:text-white",
      blue: "text-white dark:text-white",
      accent: "text-neutral-600 dark:text-neutral-300",
      link: "text-white dark:text-white",
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
    //Ghost Brand
    {
      variant: "ghost",
      color: "brand",
      className: "text-brand-700 dark:text-brand-300",
    },
    //Ghost Brand-Soft
    {
      variant: "ghost",
      color: "brand-soft",
      className: "text-brand-200 dark:text-brand-800",
    },
    //Ghost Red
    {
      variant: "ghost",
      color: "red",
      className: "text-red-700 dark:text-red-300",
    },
    //Ghost Red-Sfot
    {
      variant: "ghost",
      color: "red-soft",
      className: "text-red-200 dark:text-red-300",
    },
    //Ghost Blue
    {
      variant: "ghost",
      color: "blue",
      className: "text-blue-600 dark:text-blue-500",
    },
    //Ghost Link
    {
      variant: "ghost",
      color: "link",
      className: "text-blue-700 dark:text-blue-300",
    },

    {
      variant: "link",
      color: "default",
      className: "text-blue-700 dark:text-blue-300",
    },
    {
      variant: "link",
      color: "brand",
      className: "text-brand-700 dark:text-brand-300",
    },
    {
      variant: "link",
      color: "brand-soft",
      className: "text-brand-200 dark:text-brand-300", // Should adapt this one
    },
    {
      variant: "link",
      color: "red",
      className: "text-red-700 dark:text-red-300",
    },
    {
      variant: "link",
      color: "red-soft",
      className: "text-red-200 dark:text-red-300", // Should adapt this one
    },
    {
      variant: "link",
      color: "blue",
      className: "text-blue-600 dark:text-blue-500",
    },
    {
      variant: "link",
      color: "accent",
      className: "text-neutral-600 dark:text-neutral-300", // Should adapt this ones
    },
    {
      variant: "link",
      color: "link",
      className: "text-blue-700 dark:text-blue-300",
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});

export interface ButtonTextProps extends TextProps {}

export const ButtonText = React.forwardRef<Text, ButtonTextProps>(
  ({ className, ...props }, ref) => {
    const { hovered, color, pressed, variant } =
      React.useContext(ButtonContext);
    return (
      <Text
        ref={ref}
        className={cn(
          buttonTextVariants({ hovered, color, pressed, variant }),
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
      link: "stroke-blue-700 dark:stroke-blue-300",
    },
    color: {
      default: "stroke-neutral-800 dark:stroke-neutral-100",
      "brand-soft": "stroke-brand-800 dark:stroke-brand-50",
      brand: "dark:stroke-white stroke-white",
      "red-soft": "stroke-red-800 dark:stroke-red-300",
      red: "stroke-white dark:stroke-white",
      blue: "dark: stroke-white dark:stroke-white",
      accent: "stroke-neutral-600 dark:text-neutral-300",
      link: "stroke-white dark:stroke-white",
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
    // Ghost Variants
    {
      variant: "ghost",
      color: "default",
      className: "stroke-neutral-900 dark:stroke-white",
    },
    {
      variant: "ghost",
      color: "brand-soft",
      className: "stroke-brand-200 dark:stroke-brand-800",
    },
    {
      variant: "ghost",
      color: "brand",
      className: "stroke-brand-700 dark:stroke-brand-300",
    },
    {
      variant: "ghost",
      color: "red-soft",
      className: "stroke-red-200 dark:stroke-red-300",
    },
    {
      variant: "ghost",
      color: "red",
      className: "stroke-red-700 dark:stroke-red-300",
    },
    {
      variant: "ghost",
      color: "blue",
      className: "stroke-blue-600 dark:stroke-blue-500",
    },
    {
      variant: "ghost",
      color: "accent",
      className: "stroke-neutral-600 dark:stroke-neutral-300",
    },
    {
      variant: "ghost",
      color: "link",
      className: "stroke-blue-700 dark:stroke-blue-300",
    },
    // Default
    {
      variant: "default",
      color: "default",
      className: "stroke-neutral-800 dark:stroke-neutral-100",
    },
    {
      variant: "default",
      color: "brand-soft",
      className: "stroke-brand-800 dark:stroke-brand-50",
    },
    {
      variant: "default",
      color: "brand",
      className: "dark:stroke-white stroke-white",
    },
    {
      variant: "default",
      color: "red-soft",
      className: "stroke-red-800 dark:stroke-red-300",
    },
    {
      variant: "default",
      color: "red",
      className: "stroke-white dark:stroke-white",
    },
    {
      variant: "default",
      color: "blue",
      className: "dark:stroke-white stroke-white",
    },
    {
      variant: "default",
      color: "accent",
      className: "stroke-neutral-600 dark:text-neutral-300",
    },
    {
      variant: "default",
      color: "link",
      className: "dark:stroke-white stroke-white",
    },

    // Link Variants
    {
      variant: "link",
      color: "default",
      className: "stroke-blue-700 dark:stroke-blue-300",
    },
    {
      variant: "link",
      color: "brand-soft",
      className: "stroke-brand-200 dark:stroke-brand-300",
    },
    {
      variant: "link",
      color: "brand",
      className: "stroke-brand-700 dark:stroke-brand-300",
    },
    {
      variant: "link",
      color: "red-soft",
      className: "stroke-red-200 dark:stroke-red-300",
    },
    {
      variant: "link",
      color: "red",
      className: "stroke-red-700 dark:stroke-red-300",
    },
    {
      variant: "link",
      color: "blue",
      className: "stroke-blue-600 dark:stroke-blue-500",
    },
    {
      variant: "link",
      color: "accent",
      className: "stroke-neutral-600 dark:stroke-neutral-300",
    },
    {
      variant: "link",
      color: "link",
      className: "stroke-blue-700 dark:stroke-blue-300",
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});

export const ButtonIcon = ({
  children,
  className,
  ...props
}: ButtonIconProps) => {
  const { hovered, pressed, color, variant } = React.useContext(ButtonContext);

  const size = variant == "link" ? "scale-75" : undefined;
  return React.cloneElement(children, {
    className: cn(
      `${size} `,
      buttonIconVariants({ hovered, pressed, variant, color }),
      className
    ),
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
        link: "rounded-none border-[1px] border-l-0 border-r-0 border-t-0", //Add this className border-[1px]
      },
      color: {
        default: "border-neutral-300 dark:border-neutral-500",
        "brand-soft": "border-brand-200 dark:border-brand-700",
        brand: "border-brand-200 dark:border-brand-800",
        "red-soft": "border-red-200 dark:border-red-800",
        red: "dark:border-red-800s border-red-200",
        blue: "border-blue-200 dark:border-blue-800",
        accent: "border-neutral-300 dark:border-neutral-500",
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
      // Ghost
      {
        variant: "ghost",
        color: "brand",
        className: "border-brand-300 dark:border-brand-500",
      },
      // Ghost-red
      {
        variant: "ghost",
        color: "red",
        className: "border-red-300 dark:border-red-500",
      },
      // Ghost-blue
      {
        variant: "ghost",
        color: "blue",
        className: "border-blue-300 dark:border-blue-500",
      },
      // Ghost-Link
      {
        variant: "ghost",
        color: "link",
        className: "border-blue-700 dark:border-blue-300",
      },
      // Link
      {
        variant: "link",
        hovered: true,
        className: "opacity-100",
      },
      {
        variant: "link",
        color: "link",
        pressed: true,
        className: "border-blue-400 dark:border-blue-600",
      },
      // Link Brand
      {
        variant: "link",
        color: "brand",
        className: "border-brand-700 dark:border-brand-300",
      },
      {
        variant: "link",
        color: "brand",
        pressed: true,
        className: "border-brand-400 dark:border-brand-600",
      },
      // Link Brand - Soft
      {
        variant: "link",
        color: "brand-soft",
        className: "border-brand-200 dark:border-brand-700",
      },
      {
        variant: "link",
        color: "brand-soft",
        pressed: true,
        className: "border-brand-50 dark:border-brand-600",
      },
      // Link Red
      {
        variant: "link",
        color: "red",
        className: "border-red-700 dark:border-red-300",
      },
      {
        variant: "link",
        color: "red",
        pressed: true,
        className: "border-red-400 dark:border-red-600",
      },
      // Link BLue
      {
        variant: "link",
        color: "blue",
        className: "border-blue-600 dark:border-blue-500",
      },
      {
        variant: "link",
        color: "blue",
        pressed: true,
        className: "border-blue-400 dark:border-blue-600",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
      hovered: false,
      pressed: false,
    },
  }
);

type ButtonRingProp = ViewProps & VariantProps<typeof buttonVariants>;

export const ButtonRing: React.FC = () => {
  const { variant, color, hovered, pressed } = React.useContext(ButtonContext);
  return (
    <View
      className={cn(buttonRingVariants({ variant, color, hovered, pressed }))}
    />
  );
};
ButtonRing.displayName = "ButtonRing";
