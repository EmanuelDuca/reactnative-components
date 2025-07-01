import { cn } from "@usekeyhole/utils";
import { useControllableState } from "@usekeyhole/hooks";
import { cva } from "class-variance-authority";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  View,
  ViewProps,
  PressableProps,
} from "react-native";
import { ButtonProps, Text, TextProps } from "@usekeyhole/nativewind";

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

type Type = "segmented" | "underlined" | "compact";
type TabsColorProps =
  | "brand-soft"
  | "brand"
  | "red-soft"
  | "red"
  | "green-soft"
  | "green"
  | "blue"
  | "accent"
  | "transparent";

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
  type: Type;
  colorPrimary: TabsColorProps;
  colorSecondary: TabsColorProps;
}>({
  activeTab: "",
  setActiveTab: () => {},
  type: "segmented",
  colorPrimary: "brand",
  colorSecondary: "transparent",
});

type TabsProps = ViewProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  type?: Type;
  colorPrimary?: TabsColorProps;
  colorSecondary?: TabsColorProps;
};

const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  type = "segmented",
  children,
  className,
  colorPrimary = "brand",
  colorSecondary = "transparent",
  ...props
}) => {
  const [activeTab = "", setActiveTab] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab, type, colorPrimary, colorSecondary }}
    >
      <View
        className={cn({ "items-start": type === "compact" }, className)}
        {...props}
      >
        {children}
      </View>
    </TabsContext.Provider>
  );
};
Tabs.displayName = "Tabs";

/* -------------------------------------------------------------------------------------------------
 * TabsList
 * -----------------------------------------------------------------------------------------------*/

const tabsListVariants = cva("flex flex-row items-center justify-center", {
  variants: {
    type: {
      segmented: "gap-2 rounded-lg border border-border p-2",
      underlined: "gap-4 rounded-lg border border-border px-4",
      compact: "gap-4",
    },
  },
  defaultVariants: {
    type: "segmented",
  },
});

type TabsListProps = ViewProps;

const TabsList: React.FC<TabsListProps> = ({ className, ...props }) => {
  const ctx = React.useContext(TabsContext);
  return (
    <View
      className={cn(tabsListVariants({ type: ctx.type }), className)}
      {...props}
    />
  );
};
TabsList.displayName = "TabsList";

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * -----------------------------------------------------------------------------------------------*/

const TabsTriggerContext = React.createContext<{
  value: string;
  active: boolean;
  disabled: boolean;
}>({
  value: "",
  active: false,
  disabled: false,
});

type TabsTriggerProps = PressableProps & {
  value: string;
  children: React.ReactNode;
};

export const tabsTriggerColorVariants = cva(
  "flex flex-row items-center justify-center py-2 transition-colors",
  {
    variants: {
      type: {
        segmented: "-my-[1px] flex-1 rounded-md ",
        underlined: "-my-[1px] flex-1 border-b ",
        compact: "",
      },
      color: {
        "brand-soft": "bg-primary-soft",
        brand: "bg-primary",
        "red-soft": "bg-destructive-soft",
        red: "bg-destructive",
        "green-soft": "bg-success-soft",
        green: "bg-success",
        blue: "bg-info",
        accent: "bg-accent",
        transparent: "bg-transparent",
      },
      active: {
        true: undefined,
        false: "border-transparent",
      },
    },
    compoundVariants: [
      { type: "underlined", className: "bg-transparent" },
      {
        type: "compact",
        className: "bg-transparent",
      },
      {
        type: "underlined",
        active: true,
        color: "brand",
        className: "border-primary",
      },
      {
        type: "underlined",
        active: true,
        color: "green",
        className: "border-success",
      },
      {
        type: "underlined",
        active: true,
        color: "red",
        className: "border-destructive",
      },
      {
        type: "underlined",
        active: true,
        color: "blue",
        className: "border-info",
      },
      {
        type: "underlined",
        active: true,
        color: "accent",
        className: "border-accent",
      },
    ],
    defaultVariants: {
      color: "brand",
      type: "segmented",
    },
  }
);

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  onPress,
  value,
  className,
  children,
  ...props
}) => {
  const ctx = React.useContext(TabsContext);
  const isActive = React.useMemo(() => ctx.activeTab === value, [ctx, value]);

  const handleOnPress = React.useCallback(
    (event: GestureResponderEvent) => {
      ctx.setActiveTab(value);
      onPress?.(event);
    },
    [ctx, value, onPress]
  );

  const color = isActive ? ctx.colorPrimary : ctx.colorSecondary;

  return (
    <TabsTriggerContext.Provider
      value={{ value, active: isActive, disabled: !!props.disabled }}
    >
      <Pressable
        onPress={handleOnPress}
        className={cn(
          tabsTriggerColorVariants({
            type: ctx.type,
            color: color,
            active: isActive,
          }),
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) =>
          typeof child === "string" ? (
            <TabsTriggerText>{child}</TabsTriggerText>
          ) : (
            child
          )
        )}
      </Pressable>
    </TabsTriggerContext.Provider>
  );
};
TabsTrigger.displayName = "TabsTrigger";

/* -------------------------------------------------------------------------------------------------
 * TabsTriggerText
 * -----------------------------------------------------------------------------------------------*/

const tabsTriggerTextVariants = cva("text-sm font-semibold transition-colors", {
  variants: {
    type: {
      segmented: "text-sm",
      underlined: "text-sm",
      compact: "text-sm",
    },
    active: {
      true: "text-primary",
      false: "text-foreground",
    },
    disabled: {
      true: "opacity-50",
      false: "opacity-100",
    },
    color: {
      "brand-soft": "text-foreground",
      brand: "text-primary-foreground",
      "red-soft": " text-foreground",
      red: "text-destructive-foreground",
      "green-soft": " text-foreground",
      green: "text-primary-foreground",
      blue: "text-primary-foreground",
      accent: "text-foreground",
      transparent: "text-foreground",
    },
  },
  compoundVariants: [
    // ----- Underlined -----
    {
      type: "underlined",
      color: "brand",
      className: "text-primary",
    },
    {
      type: "underlined",
      color: "red",
      className: "text-destructive",
    },
    {
      type: "underlined",
      color: "green",
      className: "text-success",
    },
    { type: "underlined", color: "blue", className: "text-info" },
    { type: "underlined", color: "accent", className: "text-muted" },
    { type: "underlined", color: "transparent", className: "text-foreground" },

    // ----- Compact -----
    { type: "compact", color: "brand", className: "text-primary" },
    { type: "compact", color: "red", className: "text-destructive" },
    { type: "compact", color: "green", className: "text-success" },
    { type: "compact", color: "blue", className: "text-info" },
    { type: "compact", color: "accent", className: "text-muted" },
    { type: "compact", color: "transparent", className: "text-foreground" },
  ],
  defaultVariants: {
    type: "segmented",
    active: false,
    disabled: false,
  },
});

type TabsTriggerTextProps = TextProps;

const TabsTriggerText: React.FC<TabsTriggerTextProps> = ({
  className,
  ...props
}) => {
  const tabsCtx = React.useContext(TabsContext);
  const triggerCtx = React.useContext(TabsTriggerContext);
  const color = triggerCtx.active
    ? tabsCtx.colorPrimary
    : tabsCtx.colorSecondary;

  return (
    <Text
      className={cn(
        tabsTriggerTextVariants({
          type: tabsCtx.type,
          active: triggerCtx.active,
          disabled: triggerCtx.disabled,
          color: color,
        }),
        className
      )}
      {...props}
    />
  );
};
TabsTriggerText.displayName = "TabsTriggerText";

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * -----------------------------------------------------------------------------------------------*/

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const ctx = React.useContext(TabsContext);
  return ctx.activeTab === value ? children : null;
};
TabsContent.displayName = "TabsContent";

export {
  Tabs,
  TabsProps,
  TabsList,
  TabsListProps,
  TabsTrigger,
  TabsTriggerProps,
  TabsContent,
  TabsContentProps,
};
