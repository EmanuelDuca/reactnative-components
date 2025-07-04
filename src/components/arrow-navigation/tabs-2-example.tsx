import { cn } from "@usekeyhole/utils";
import { useControllableState } from "@usekeyhole/hooks";
import { cva } from "class-variance-authority";
import React, {
  forwardRef,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Pressable, View, ViewProps, PressableProps } from "react-native";
import { Text, TextProps } from "@usekeyhole/nativewind";
import * as RovingFocusGroup from "./roving-focus-group";
import { createRovingFocusGroupScope } from "./roving-focus-group";
import { createContextScope, Scope } from "@radix-ui/react-context";
import { useDirection } from "@radix-ui/react-direction";
import { useId } from "@radix-ui/react-id";

const TABS_NAME = "Tabs";

const [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope,
]);
const useRovingFocusGroupScope = createRovingFocusGroupScope();

const [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);

const TabsContext = React.createContext({
  activeTab: "",
  setActiveTab: () => {},
  type: "segmented",
  colorPrimary: "brand",
  colorSecondary: "transparent",
});

const Tabs = forwardRef(
  (
    {
      defaultValue,
      value,
      onValueChange,
      type = "segmented",
      children,
      className,
      colorPrimary = "brand",
      colorSecondary = "transparent",
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...props
    },
    ref
  ) => {
    const direction = useDirection(dir);
    const [activeTab = "", setActiveTab] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    return (
      <TabsProvider
        baseId={useId()}
        value={activeTab}
        onValueChange={setActiveTab}
        orientation={orientation}
        dir={direction}
        activationMode={activationMode}
      >
        <TabsContext.Provider
          value={{
            activeTab,
            setActiveTab,
            type,
            colorPrimary,
            colorSecondary,
          }}
        >
          <View
            className={cn({ "items-start": type === "compact" }, className)}
            {...props}
            ref={ref}
          >
            {children}
          </View>
        </TabsContext.Provider>
      </TabsProvider>
    );
  }
);

const TabsList = forwardRef(({ className, loop = true, ...props }, ref) => {
  const ctx = useTabsContext("TabsList");
  const rovingFocusGroupScope = useRovingFocusGroupScope();
  return (
    <RovingFocusGroup.Root
      asChild
      {...rovingFocusGroupScope}
      orientation={ctx.orientation}
      dir={ctx.dir}
      loop={loop}
    >
      <View
        role="tablist"
        aria-orientation={ctx.orientation}
        className={cn("flex-row", className)}
        {...props}
        ref={ref}
      />
    </RovingFocusGroup.Root>
  );
});

const TabsTrigger = forwardRef(
  ({ onPress, value, className, children, ...props }, ref) => {
    const ctx = useTabsContext("TabsTrigger");
    const rovingFocusGroupScope = useRovingFocusGroupScope();
    const isActive = ctx.value === value;

    const handlePress = useCallback(
      (event) => {
        ctx.onValueChange(value);
        onPress?.(event);
      },
      [ctx, value, onPress]
    );

    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!props.disabled}
        active={isActive}
      >
        <Pressable
          role="tab"
          aria-selected={isActive}
          aria-controls={`${ctx.baseId}-content-${value}`}
          className={cn(className)}
          onPress={handlePress}
          ref={ref}
          {...props}
        >
          {children}
        </Pressable>
      </RovingFocusGroup.Item>
    );
  }
);

const TabsContent = ({ value, children }) => {
  const ctx = useTabsContext("TabsContent");
  return ctx.value === value ? children : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
