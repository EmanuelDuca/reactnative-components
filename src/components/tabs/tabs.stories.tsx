import { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Text } from "@usekeyhole/nativewind";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "NATIVEWIND/components/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Overview: Story = {
  render: () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <Tabs defaultValue="account" className="w-[300px]">
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
        <Tabs defaultValue="account" className="w-[300px]" type="underlined">
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

        <Tabs className="w-[300px]" defaultValue="account" type="compact">
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
    );
  },
};
