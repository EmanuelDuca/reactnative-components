import { cva } from "class-variance-authority";
import { AnimatedHeight } from "./animated-height";
import { cn, IS_WEB, VariantProps } from "@usekeyhole/utils";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  TextProps,
  View,
  ViewProps,
  Text,
  GestureResponderEvent,
  PressableProps,
  NativeSyntheticEvent,
  NativeMouseEvent,
} from "react-native";
import { ChevronLeft } from "@usekeyhole/nativewind";
import { useControllableState } from "@usekeyhole/hooks";

type AccordionContextProps = {
  expanded: string[];
  toggle: (value: string) => void;
};

export const AccordionContext = React.createContext<AccordionContextProps>({
  expanded: [],
  toggle: () => {},
});

// the default View "collapsable" prop made it confusing to use
export type AccordionProps = Omit<ViewProps, "collapsable"> & {
  // Controllable expanded items - requires onExpandedChange
  expanded?: string[];
  // Callback when expanded items change
  onExpandedChange?: (value: string[]) => void;
  // Default expanded items
  defaultExpanded?: string[];
  // Allow multiple items to be expanded
  multiple?: boolean;
};

export const Accordion = React.forwardRef<View, AccordionProps>(
  (
    {
      children,
      className,
      multiple = false,
      expanded: expandedProp,
      defaultExpanded,
      onExpandedChange,
    },
    ref
  ) => {
    const [expanded = [], setExpanded] = useControllableState({
      prop: expandedProp,
      defaultProp: defaultExpanded,
      onChange: onExpandedChange,
    });

    const toggle = (value: string) => {
      setExpanded((prev = []) => {
        const isExpanded = prev.includes(value);
        if (isExpanded) return prev.filter((v) => v != value);
        if (!multiple) return [value];
        return [...prev, value];
      });
    };

    return (
      <AccordionContext.Provider
        value={{
          expanded,
          toggle,
        }}
      >
        <View ref={ref} className={cn("flex w-full flex-col gap-4", className)}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);

const accordionItemVariants = cva("flex flex-col gap-x-2", {
  variants: {
    variant: {
      card: "bg-background border-accent rounded-lg border transition-colors transition-shadow",
    },
    expanded: {
      true: undefined,
      false: undefined,
    },
    triggerHovered: {
      true: undefined,
      false: undefined,
    },
  },
  compoundVariants: [
    {
      variant: "card",
      expanded: true,
      className: "shadow",
    },
    {
      variant: "card",
      expanded: false,
      className: "shadow-none",
    },
    {
      variant: "card",
      expanded: true,
      className: "border-border",
    },
    // {
    //   variant: "card",
    //   expanded: false,
    //   triggerHovered: false,
    //   className: "border-black",
    // },
    {
      variant: "card",
      expanded: false,
      triggerHovered: true,
      className: "border-border",
    },
  ],
  defaultVariants: {
    variant: undefined,
  },
});

type AccordionItemContextProps = Pick<AccordionItemProps, "variant"> & {
  value: string;
  isExpanded: boolean;
  triggerHovered: boolean;
  setTriggerHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AccordionItemContext =
  React.createContext<AccordionItemContextProps>({
    value: "",
    isExpanded: false,
    triggerHovered: false,
    setTriggerHovered: () => {},
  });

export type AccordionItemProps = ViewProps &
  VariantProps<typeof accordionItemVariants> & {
    value: string;
  };

export const AccordionItem = React.forwardRef<View, AccordionItemProps>(
  ({ value, children, className, variant }, ref) => {
    const { expanded } = React.useContext(AccordionContext);
    const [triggerHovered, setTriggerHovered] = useState(false);
    const isExpanded = expanded.includes(value);

    return (
      <AccordionItemContext.Provider
        value={{
          value,
          isExpanded,
          variant,
          triggerHovered,
          setTriggerHovered,
        }}
      >
        <View
          ref={ref}
          className={cn(
            accordionItemVariants({
              variant,
              expanded: isExpanded,
              triggerHovered,
            }),
            className
          )}
        >
          <View className="overflow-hidden rounded-lg">{children}</View>
        </View>
      </AccordionItemContext.Provider>
    );
  }
);

const accordionTriggerVariants = cva(
  "relative flex flex-col gap-2 transition-colors",
  {
    variants: {
      variant: {
        card: "p-4",
      },
      expanded: {
        true: undefined,
        false: undefined,
      },
    },
    compoundVariants: [
      {
        variant: "card",
        expanded: true,
        className: "bg-background hover:bg-accent active:bg-accent",
      },
      {
        variant: "card",
        expanded: false,
        className: "bg-accent hover:bg-background active:bg-background",
      },
    ],
    defaultVariants: {
      variant: undefined,
    },
  }
);

const accordionTriggerIconVariants = cva(
  "stroke-foreground absolute right-0 top-0 ml-auto h-6 w-6 transform transition-transform duration-300 ease-in-out",
  {
    variants: {
      variant: {
        card: "right-4 top-4",
      },
    },
    defaultVariants: {
      variant: undefined,
    },
  }
);

export interface AccordionTriggerProps extends PressableProps {
  children: React.ReactNode;
  iconClassName?: string;
}

export const AccordionTrigger = React.forwardRef<View, AccordionTriggerProps>(
  (
    {
      children,
      onHoverIn,
      onHoverOut,
      onPressIn,
      onPressOut,
      className,
      iconClassName,
    },
    ref
  ) => {
    const { toggle } = React.useContext(AccordionContext);
    const { value, variant, isExpanded, setTriggerHovered } =
      React.useContext(AccordionItemContext);

    const handleOnHoverIn = useCallback(
      (event: NativeSyntheticEvent<NativeMouseEvent>) => {
        setTriggerHovered(true);
        if (!!onHoverIn) onHoverIn(event);
      },
      [onHoverIn]
    );

    const handleOnHoverOut = useCallback(
      (event: NativeSyntheticEvent<NativeMouseEvent>) => {
        setTriggerHovered(false);
        if (!!onHoverOut) onHoverOut(event);
      },
      [onHoverOut]
    );

    const handleOnPressIn = useCallback(
      (event: GestureResponderEvent) => {
        if (!IS_WEB) setTriggerHovered(true);
        if (!!onPressIn) onPressIn(event);
      },
      [onPressIn]
    );

    const handleOnPressOut = useCallback(
      (event: GestureResponderEvent) => {
        if (!IS_WEB) setTriggerHovered(false);
        if (!!onPressOut) onPressOut(event);
      },
      [onPressOut]
    );

    return (
      <Pressable
        ref={ref}
        className={cn(
          accordionTriggerVariants({ expanded: isExpanded, variant }),
          className
        )}
        onPress={() => {
          toggle(value);
        }}
        onHoverIn={handleOnHoverIn}
        onHoverOut={handleOnHoverOut}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        {children}
        <ChevronLeft
          className={cn(
            accordionTriggerIconVariants({ variant }),
            isExpanded ? "rotate-90" : "-rotate-90",
            iconClassName
          )}
        />
      </Pressable>
    );
  }
);

export interface AccordionHeaderProps extends TextProps {}

export const AccordionHeader = React.forwardRef<View, AccordionHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-row items-center gap-2 pr-7", className)}
      >
        {children}
      </View>
    );
  }
);

export interface AccordionTitleProps extends TextProps {}

export const AccordionTitle = React.forwardRef<Text, AccordionTitleProps>(
  ({ children, className }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-foreground text-base font-semibold transition-colors",
          className
        )}
      >
        {children}
      </Text>
    );
  }
);

const accordionTriggerTitleVariants = cva(
  "text-base font-semibold transition-colors",
  {
    variants: {
      hovered: {
        true: "text-brand",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      hovered: false,
    },
  }
);

export const AccordionTriggerTitle = React.forwardRef<
  Text,
  AccordionTitleProps
>(({ children, className }, ref) => {
  const { triggerHovered: hovered } = React.useContext(AccordionItemContext);

  return (
    <AccordionTitle
      ref={ref}
      className={cn(accordionTriggerTitleVariants({ hovered }), className)}
    >
      {children}
    </AccordionTitle>
  );
});

export interface AccordionDescriptionProps extends TextProps {}

export const AccordionDescription = React.forwardRef<
  Text,
  AccordionDescriptionProps
>(({ children, className }, ref) => {
  return (
    <Text ref={ref} className={cn("text-accent-foreground text-sm", className)}>
      {children}
    </Text>
  );
});

const accordionContentVariants = cva("mt-2", {
  variants: {
    variant: {
      card: "mt-0 px-4 pb-4",
    },
  },
  defaultVariants: {
    variant: undefined,
  },
});

export type AccordionContentProps = ViewProps;

export const AccordionContent = React.forwardRef<View, AccordionContentProps>(
  ({ children, className, ...props }, ref) => {
    const { isExpanded, variant } = React.useContext(AccordionItemContext);
    return (
      <AnimatedHeight ref={ref} hide={!isExpanded} {...props}>
        {!!children && (
          <View
            className={cn(accordionContentVariants({ variant }), className)}
          >
            {children}
          </View>
        )}
      </AnimatedHeight>
    );
  }
);

export interface AccordionContentTextProps extends TextProps {}

export const AccordionContentText = React.forwardRef<
  Text,
  AccordionContentTextProps
>(({ children, className }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-foreground text-sm font-normal", className)}
    >
      {children}
    </Text>
  );
});

export type AccordionIconProps = ViewProps & {
  children: JSX.Element;
};

export const AccordionIcon = React.forwardRef<View, AccordionIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("stroke-foreground fill-foreground h-5 w-5", className)}
        {...props}
      >
        {/* Native Render Issues of SVG */}
        {React.cloneElement(children, {
          className: cn(children.props.className),
        })}
      </View>
    );
  }
);
