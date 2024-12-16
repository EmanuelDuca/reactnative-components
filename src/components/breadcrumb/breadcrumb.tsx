import { cva } from "class-variance-authority";
import React from "react";
import {
  Pressable,
  PressableProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { useControllableState } from "@usekeyhole/hooks";
import { cn } from "@usekeyhole/utils";
import { Ellipsis } from "../icons/ellipsis";
import { ChevronRight } from "@usekeyhole/nativewind";

/* -------------------------------------------------------------------------------------------------
 * Breadcrumb
 * -----------------------------------------------------------------------------------------------*/

type BreadcrumbContextProps = PressableProps & {
  selectedValue: string | null;
  onChange: (value: string) => void;
};

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({
  selectedValue: "",
  onChange: () => {},
});

type BreadcrumbProps = ViewProps & {
  value: string | undefined;
  onChange: (value: string) => void;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  value = "",
  onChange,
  children,
  ...props
}) => {
  return (
    <BreadcrumbContext.Provider value={{ selectedValue: value, onChange }}>
      <View className={cn("gap-1", className)} {...props}>
        {children}
      </View>
    </BreadcrumbContext.Provider>
  );
};
Breadcrumb.displayName = "Breadcrumb";

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbList
 * -----------------------------------------------------------------------------------------------*/

type BreadcrumbListProps = ViewProps;

const BreadcrumbList = React.forwardRef<View, BreadcrumbListProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-row items-center gap-4", className)}
        {...props}
      />
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbItem
 * -----------------------------------------------------------------------------------------------*/

type BreadcrumbItemContextProps = {
  active: boolean;
  hovered: boolean;
};

const BreadcrumbItemContext = React.createContext<BreadcrumbItemContextProps>({
  active: false,
  hovered: false,
});

type BreadcrumbItemProps = PressableProps & {
  hovered?: boolean;
  href: string;
};

const BreadcrumbItem = React.forwardRef<View, BreadcrumbItemProps>(
  (
    {
      className,
      hovered: isControlHovered,
      href,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useControllableState({
      prop: isControlHovered,
      defaultProp: false,
    });
    const [focused, setFocused] = React.useState(false);

    const { selectedValue, onChange } = React.useContext(BreadcrumbContext);
    const active = selectedValue === href;

    const isHovered = hovered || focused;

    return (
      <BreadcrumbItemContext.Provider value={{ active, hovered: isHovered }}>
        <Pressable
          ref={ref}
          className={cn("flex flex-row items-center gap-2", className)}
          onHoverIn={(e) => {
            setHovered(true);
            onHoverIn?.(e);
          }}
          onHoverOut={(e) => {
            setHovered(false);
            onHoverOut?.(e);
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onPress={() => {
            onChange(href);
          }}
          {...props}
        />
      </BreadcrumbItemContext.Provider>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbSeparator
 * -----------------------------------------------------------------------------------------------*/

type BreadcrumbSeparatorProps = ViewProps;

const BreadcrumbSeparator = ({
  className,
  ...props
}: BreadcrumbSeparatorProps) => {
  return (
    <ChevronRight
      className={cn("size-4 stroke-neutral-400", className)}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbEllipsis
 * -----------------------------------------------------------------------------------------------*/

type BreadcrumbEllipsisProps = ViewProps;

const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => {
  return <Ellipsis className={cn("size-5", className)} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbIcon
 * -----------------------------------------------------------------------------------------------*/

type BreadcrumbIconProps = ViewProps & {
  children?: JSX.Element;
};

const BreadcrumbIcon = ({
  className,
  children,
  ...props
}: BreadcrumbIconProps) => {
  if (children) {
    return React.cloneElement(children, {
      className: cn("size-5", className),
      ...props,
    });
  } else {
    return null;
  }
};
BreadcrumbIcon.displayName = "BreadcrumbIcon";

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbText
 * -----------------------------------------------------------------------------------------------*/
const buttonTextVariants = cva(
  "text-sm font-normal text-neutral-500 transition-colors dark:text-neutral-400",
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
    },
    compoundVariants: [
      {
        hovered: true,
        active: false,
        className: "text-brand-700 dark:text-brand-400",
      },
      {
        active: true,
        className: "text-neutral-900 dark:text-white",
      },
    ],
    defaultVariants: {
      hovered: false,
      active: false,
    },
  }
);

type BreadcrumbTextProps = TextProps;

const BreadcrumbText = React.forwardRef<Text, BreadcrumbTextProps>(
  ({ className, onPress, ...props }, ref) => {
    const { hovered, active } = React.useContext(BreadcrumbItemContext);

    return (
      <Text
        ref={ref}
        className={cn(buttonTextVariants({ hovered, active }), className)}
        {...props}
      />
    );
  }
);
BreadcrumbText.displayName = "BreadcrumbText";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisProps,
  BreadcrumbIcon,
  BreadcrumbIconProps,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbList,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbSeparator,
  BreadcrumbSeparatorProps,
  BreadcrumbText,
  BreadcrumbTextProps,
};
