import { cva, VariantProps } from "class-variance-authority";
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
import { ChevronRight } from "@usekeyhole/nativewind";
import { Href, router, usePathname } from "expo-router";

/* -------------------------------------------------------------------------------------------------
 * Breadcrumb
 * -----------------------------------------------------------------------------------------------*/

interface BreadcrumbContextProps extends PressableProps {
  selectedValue: string | null;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({
  selectedValue: "",
});

interface BreadcrumbProps extends ViewProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  value,
  onChange: setSelectedValue,
  children,
  ...props
}) => {
  const selectedValue = usePathname();

  return (
    <BreadcrumbContext.Provider value={{ selectedValue }}>
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
        className={cn("flex flex-row gap-4 items-center", className)}
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
    { className, hovered: isHovered, href, onHoverIn, onHoverOut, ...props },
    ref
  ) => {
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
    });
    const { selectedValue } = React.useContext(BreadcrumbContext);
    const active = selectedValue === href;

    const handlePress = (route: string) => {
      router.push(route as Href<string>);
    };

    return (
      <BreadcrumbItemContext.Provider value={{ active, hovered }}>
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
          onPress={() => handlePress(href)}
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
  return <ChevronRight className={className} {...props} />;
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
    return <></>;
  }
};
BreadcrumbIcon.displayName = "BreadcrumbIcon";

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbText
 * -----------------------------------------------------------------------------------------------*/
const buttonTextVariants = cva(
  "text-sm text-neutral-500 dark:text-neutral-400 font-normal transition-colors",
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

type BreadcrumbTextProps = TextProps & {
  href?: Href<string | object>; // Add an href for navigation links
};

const BreadcrumbText = React.forwardRef<Text, BreadcrumbTextProps>(
  ({ className, href, onPress, ...props }, ref) => {
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
  BreadcrumbProps,
  BreadcrumbList,
  BreadcrumbListProps,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbSeparator,
  BreadcrumbSeparatorProps,
  BreadcrumbIcon,
  BreadcrumbIconProps,
  BreadcrumbText,
  BreadcrumbTextProps,
};
