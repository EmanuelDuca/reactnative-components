import {
  Button,
  ButtonIcon,
  Check,
  ChevronRight,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/arrow-navigation/tabs-example-readix-ui";
import * as RovingFocusGroup from "~/components/arrow-navigation/roving-focus-group";

export default function Page() {
  return <Content />;
}

const colorList = [
  "brand-soft",
  "brand",
  "red-soft",
  "red",
  "green-soft",
  "green",
  "blue",
  "accent",
  "transparent",
];

const colorsGost = ["brand", "red", "green", "blue", "accent", "transparent"];

function Content() {
  return (
    <ScrollView>
      <View className="flex-1 bg-background flex p-10 gap-6">
        <Tabs
          defaultValue="account"
          className="w-[300px]"
          activationMode="manual"
        >
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Text>Make changes to your account here.</Text>
          </TabsContent>
          <TabsContent value="password">
            <Text>Change your password here.</Text>
          </TabsContent>
        </Tabs>
      </View>
      <BasicTabs />
      <StoryBookTabs />
    </ScrollView>
  );
}

const tabs = ["Home", "Profile", "Settings"];

export function BasicTabs() {
  const [activeTab, setActiveTab] = React.useState("Home");

  return (
    <RovingFocusGroup.Root orientation="horizontal" loop asChild>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {tabs.map((tab) => (
          <RovingFocusGroup.Item key={tab} asChild active={tab === activeTab}>
            <Pressable
              onPress={() => setActiveTab(tab)}
              {...(Platform.OS === "web" && {
                role: "tab",
                tabIndex: tab === activeTab ? 0 : -1,
                "aria-selected": tab === activeTab,
              })}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: tab === activeTab ? "#3b82f6" : "#e5e7eb",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: tab === activeTab ? "#fff" : "#000" }}>
                {tab}
              </Text>
            </Pressable>
          </RovingFocusGroup.Item>
        ))}
      </View>
    </RovingFocusGroup.Root>
  );
}

const baseItemStyles = {
  padding: 12,
  margin: 4,
  borderRadius: 6,
  border: "1px solid #ccc",
  textAlign: "center",
  cursor: "pointer",
  minWidth: 80,
};

function StoryBookTabs() {
  return (
    <RovingFocusGroup.RovingFocusGroup orientation="horizontal" loop>
      <View className="flex flex-row">
        <RovingFocusGroup.RovingFocusGroupItem active>
          <div style={baseItemStyles}>Tab 1</div>
        </RovingFocusGroup.RovingFocusGroupItem>
        <RovingFocusGroup.RovingFocusGroupItem>
          <div style={baseItemStyles}>Tab 2</div>
        </RovingFocusGroup.RovingFocusGroupItem>
        <RovingFocusGroup.RovingFocusGroupItem>
          <div style={baseItemStyles}>Tab 3</div>
        </RovingFocusGroup.RovingFocusGroupItem>
      </View>
    </RovingFocusGroup.RovingFocusGroup>
  );
}
