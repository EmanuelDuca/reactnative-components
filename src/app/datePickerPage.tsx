import { Text } from "@usekeyhole/nativewind";
import React from "react";
import { ScrollView, View } from "react-native";
import { DatePicker } from "~/components/date-picker-innput/date-picker-web";
import { DatePickerInput } from "~/components/date-picker-innput/date-picker-input";

export default function DatePickerPage() {
  return (
    <ScrollView>
      {/* <DumDatePickerComponent /> */}
      <Content />
    </ScrollView>
  );
}
function DumDatePickerComponent() {
  const [singleValue, setSingleValue] = React.useState<Date | undefined>(
    undefined
  );

  return (
    <View className="p-20">
      <DatePickerInput mode="single" defaultValue={new Date()} />
    </View>
  );
}

function DatePickerMultipleValue() {
  const [rangeValue, setRangeValue] = React.useState<
    [Date | undefined, Date | undefined]
  >([undefined, undefined]);

  return (
    <DatePicker mode="range" value={rangeValue} onChange={setRangeValue} />
  );
}

function Content() {
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

  // Create the helper function for calculating the first and second date

  return (
    <View>
      <View className="flex flex-col items-center justify-center gap-y-8 py-12">
        <Text>Single (Uncontrolled)</Text>
        <DatePickerInput mode="single" defaultValue={new Date()} />
        {/* <Text>Range (Controlled)</Text>
        <DatePickerInput
          disabled
          mode="range"
          value={rangeSelected}
          onChange={setRangeSelected}
          disabledFilter={(data) => {
            return data.getDate() < 10;
          }}
        /> */}
        <Text>Range (Uncontrolled)</Text>
        <DatePickerInput mode="range" defaultValue={[new Date(), new Date()]} />
        <Text>Range (Custom Formatter + Dual Mode + Controlled)</Text>
        <DatePickerInput
          mode="range"
          dualMode
          value={rangeSelected}
          onChange={setRangeSelected}
          formatter={formatterRange}
          /* disabledFilter={(data) => {
            return data.getDate() < 10 && data.getDate() > 5;
          }} */
          /* customButtons={[
            {
              label: "thisMonth",
              range: [date, date],
            },
            {
              label: "thisMonth",
              range: [date, date],
            },
          ]} */
        />
      </View>
    </View>
  );
}
