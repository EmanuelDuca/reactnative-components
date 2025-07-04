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
} from "~/components/arrow-navigation/experimental-tabs";

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
        <View className="flex flex-row gap-6">
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
                </Tabs>
              );
            })}
          </View>
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
                  colorSecondary="accent"
                  defaultValue="account"
                  className="w-[300px]"
                >
                  <TabsList>
                    <TabsTrigger value="account">{item}</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              );
            })}
          </View>
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
                  colorSecondary="red-soft"
                  defaultValue="account"
                  className="w-[300px]"
                >
                  <TabsList>
                    <TabsTrigger value="account">{item}</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              );
            })}
          </View>
        </View>
        <View className="w-full h-[1px] bg-foreground" />

        <View className="flex flex-row gap-6">
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {colorsGost.map((item) => {
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
                </Tabs>
              );
            })}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {colorsGost.map((item) => {
              return (
                <Tabs
                  colorPrimary={item}
                  colorSecondary="accent"
                  defaultValue="account"
                  className="w-[300px]"
                  type="underlined"
                >
                  <TabsList>
                    <TabsTrigger value="account">{item}</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              );
            })}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {colorsGost.map((item) => {
              return (
                <Tabs
                  colorPrimary={item}
                  colorSecondary="red"
                  defaultValue="account"
                  className="w-[300px]"
                  type="underlined"
                >
                  <TabsList>
                    <TabsTrigger value="account">{item}</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              );
            })}
          </View>
        </View>
        <View className="w-full h-[1px] bg-foreground" />
        <View className="flex flex-row gap-6">
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {colorsGost.map((item) => {
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
                </Tabs>
              );
            })}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {colorsGost.map((item) => {
              return (
                <Tabs
                  colorPrimary={item}
                  colorSecondary="accent"
                  defaultValue="account"
                  className="w-[300px]"
                  type="compact"
                >
                  <TabsList>
                    <TabsTrigger value="account">{item}</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              );
            })}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {colorsGost.map((item) => {
              return (
                <Tabs
                  colorPrimary={item}
                  colorSecondary="red"
                  defaultValue="account"
                  className="w-[300px]"
                  type="compact"
                >
                  <TabsList>
                    <TabsTrigger value="account">{item}</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              );
            })}
          </View>
        </View>
        <View className="h-96 w-full bg-red-50"></View>
      </View>
    </ScrollView>
  );
}
