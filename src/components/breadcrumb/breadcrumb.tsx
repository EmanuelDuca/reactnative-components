import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Pressable, PressableProps, View } from "react-native";
import { useControllableState } from "@usekeyhole/hooks";
import { cn } from "@usekeyhole/utils";

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbItem
 * -----------------------------------------------------------------------------------------------*/

const breadcrumbItemVariants = cva("", {
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
    //Hovered
    { hovered: true, className: "" },
    //Active
    {
      active: true,
      className: "",
    },
  ],
  defaultVariants: {
    hovered: false,
    active: false,
  },
});

type BreadcrumbItemContextProps = Pick<
  VariantProps<typeof breadcrumbItemVariants>,
  "active" | "hovered"
> & {
  onBlur?: PressableProps["onBlur"];
  onFocus?: PressableProps["onFocus"];
  onPress?: PressableProps["onPress"];
};

const BreadcrumbItemContext = React.createContext<BreadcrumbItemContextProps>({
  active: false,
  hovered: false,
  onBlur: undefined,
  onFocus: undefined,
  onPress: undefined,
});

type BreadcrumbItemProps = PressableProps & {
  active?: boolean;
  hovered?: boolean;
};

const BreadcrumbItem = React.forwardRef<View, BreadcrumbItemProps>(
  (
    {
      className,
      active: isActive,
      hovered: isHovered,
      onHoverIn,
      onHoverOut,
      onPress,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = useControllableState({
      prop: isActive,
      defaultProp: false,
    });
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
    });
    return (
      <BreadcrumbItemContext.Provider value={{ active, hovered }}>
        <Pressable
          ref={ref}
          className={cn(breadcrumbItemVariants({ hovered, active }), className)}
          onHoverIn={(e) => {
            setHovered(true);
            onHoverIn?.(e);
          }}
          onHoverOut={(e) => {
            setHovered(false);
            onHoverOut?.(e);
          }}
        />
      </BreadcrumbItemContext.Provider>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export { BreadcrumbItem };

/* 
Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
*/
