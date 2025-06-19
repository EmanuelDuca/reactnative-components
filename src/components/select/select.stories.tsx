import { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectInput,
  SelectItem,
  SelectList,
  SelectTrigger,
  SelectValue,
} from "./select";
import { View } from "react-native";
import { Text } from "react-native";

const meta = {
  title: "WEB/components/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

const list = [
  {
    key: 1,
    value: "",
    address: "",
  },
];

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
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select something" />
          </SelectTrigger>
          <SelectContent align="start" className="w-[200px]">
            <SelectInput placeholder="Type a command or search..." />
            <SelectList>
              <SelectEmpty>No address found.</SelectEmpty>
              <SelectGroup>
                {list.map((item) => (
                  <SelectItem
                    className="font-normal"
                    key={address.id}
                    value={address.address}
                  >
                    <Text numberOfLines={1}>{address.address}</Text>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectList>
          </SelectContent>
        </Select>
      </View>
    );
  },
};
