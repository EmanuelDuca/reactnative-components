import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { View } from "react-native";
import { Text } from "@usekeyhole/nativewind";
import { DatePickerInput } from "./date-picker-input";

const meta = {
  title: "WEB/components/DatePickerInput",
  component: DatePickerInput,
} satisfies Meta<typeof DatePickerInput>;

export default meta;

type Story = StoryObj<typeof DatePickerInput>;

export const Overview: Story = {
  render: () => {
    const [singleSelected, setSingleSelected] = React.useState<
      Date | undefined
    >();
    const [rangeSelected, setRangeSelected] = React.useState<
      [Date | undefined, Date | undefined]
    >([undefined, undefined]);

    const formatterSingle = (date: Date) => {
      return new Intl.DateTimeFormat("da-DK", {
        dateStyle: "short",
      }).format(date);
    };

    const formatterRange = (dates: [Date, Date]) => {
      return dates.map((d) => formatterSingle(d)).join(" - ");
    };

    return (
      <View className="flex flex-col items-center justify-center gap-y-8 py-12">
        <Text>Single (Controlled)</Text>
        <DatePickerInput
          mode="single"
          value={singleSelected}
          onChange={setSingleSelected}
          disabledFilter={(data) => {
            return data.getDate() < 10;
          }}
        />
        <Text>Single (Uncontrolled)</Text>
        <DatePickerInput
          mode="single"
          defaultValue={new Date()}
          inputClassName="w-[400px]"
        />
        <Text>Range (Controlled)</Text>
        <DatePickerInput
          mode="range"
          value={rangeSelected}
          onChange={setRangeSelected}
          disabledFilter={(data) => {
            return data.getDate() < 10;
          }}
        />
        <Text>Range (Uncontrolled)</Text>
        <DatePickerInput mode="range" defaultValue={[new Date(), new Date()]} />
        <Text>Range (Custom Formatter + Dual Mode + Controlled)</Text>
        <DatePickerInput
          mode="range"
          dualMode
          value={rangeSelected}
          onChange={setRangeSelected}
          formatter={formatterRange}
          inputClassName="w-[400px]"
          disabledFilter={(data) => {
            return data.getDate() < 10 && data.getDate() > 5;
          }}
        />
      </View>
    );
  },
};
