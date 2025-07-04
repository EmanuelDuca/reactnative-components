import {
  Button,
  ButtonIcon,
  Check,
  ChevronRight,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import * as RovingFocusGroup from "~/components/arrow-navigation/roving-focus-group";

export default function Page() {
  return <Content />;
}

function Content() {
  const focusStyle = "px-4 py-2 m-1 rounded bg-primary text-white";
  const blurStyle = "px-4 py-2 m-1 rounded bg-muted text-black";

  return (
    <ScrollView>
      <View className="flex-1 bg-background flex p-10 gap-6"></View>
    </ScrollView>
  );
}

const FocusableButton = ({ label }: { label: string }) => {
  const ref = React.useRef(null);
  const [focused, setFocused] = React.useState(false);

  return (
    <RovingFocusGroup.Item active={false}>
      <Pressable
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <Text>{label}</Text>
      </Pressable>
    </RovingFocusGroup.Item>
  );
};

export function ScopedRovingFocusExample() {
  return (
    <View className="p-4 gap-6">
      <Text className="text-xl font-bold mb-2">
        Tabs (Left/Right navigation)
      </Text>
      <RovingFocusGroup.Root orientation="horizontal" loop {...useTabsScope()}>
        <View className="flex-row">
          <FocusableButton label="Tab 1" />
          <FocusableButton label="Tab 2" />
          <FocusableButton label="Tab 3" />
        </View>
      </RovingFocusGroup.Root>

      <Text className="text-xl font-bold mt-6 mb-2">
        Command Menu (Up/Down navigation)
      </Text>
      <RovingFocusGroup.Root
        orientation="vertical"
        loop
        {...useCommandsScope()}
      >
        <View className="flex-col">
          <FocusableButton label="Open File" />
          <FocusableButton label="Save File" />
          <FocusableButton label="Close File" />
        </View>
      </RovingFocusGroup.Root>

      <Text className="text-sm text-muted mt-6">
        This example demonstrates how{" "}
        <Text className="font-medium">createRovingFocusGroupScope</Text> allows
        two separate RovingFocusGroups (Tabs and Command Menu) to operate
        independently on the same page.
      </Text>
    </View>
  );
}
