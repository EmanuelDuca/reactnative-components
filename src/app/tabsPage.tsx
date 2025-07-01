import {
  Button,
  ButtonIcon,
  Check,
  ChevronRight,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/tabs/tabs";

export default function Page() {
  return <Content />;
}
//size="small"

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

function Content() {
  return (
    <ScrollView>
      <View className="flex-1 bg-background flex p-10">
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {colorList.map((item) => {
            return (
              <Tabs
                colorPrimary={item}
                //colorSecondary="red-soft"
                defaultValue="account"
                className="w-[300px]"
              >
                <TabsList>
                  <TabsTrigger value="account">{item}</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Text>Make changes to your account here.</Text>
                </TabsContent>
                <TabsContent value="password">
                  <Text>Change your password here.</Text>
                </TabsContent>
              </Tabs>
            );
          })}
          <View className="w-1/3 h-[1px] bg-foreground" />
          {colorList.map((item) => {
            return (
              <Tabs
                colorPrimary={item}
                //colorSecondary="red-soft"
                defaultValue="account"
                className="w-[300px]"
                type="underlined"
              >
                <TabsList>
                  <TabsTrigger value="account">{item}</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Text>Make changes to your account here.</Text>
                </TabsContent>
                <TabsContent value="password">
                  <Text>Change your password here.</Text>
                </TabsContent>
              </Tabs>
            );
          })}
          <View className="w-1/3 h-[1px] bg-foreground" />
          {colorList.map((item) => {
            return (
              <Tabs
                colorPrimary={item}
                //colorSecondary="red-soft"
                defaultValue="account"
                className="w-[300px]"
                type="compact"
              >
                <TabsList>
                  <TabsTrigger value="account">{item}</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Text>Make changes to your account here.</Text>
                </TabsContent>
                <TabsContent value="password">
                  <Text>Change your password here.</Text>
                </TabsContent>
              </Tabs>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
