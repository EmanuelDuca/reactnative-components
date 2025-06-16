import { Building, Search, Text } from "@usekeyhole/nativewind";
import * as React from "react";
import { Linking, ScrollView, View, Platform } from "react-native";
import { AddRentalDialog } from "~/components/input/add-rental-dialog";
import {
  Input,
  InputEndAdornment,
  InputStartAdornment,
} from "~/components/input/input";
export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  const [open, setOpen] = React.useState(false);

  return (
    <View className="h-full w-full bg-background">
      <ScrollView>
        <View></View>
      </ScrollView>
    </View>
  );
}

// utils/phoneUtils.ts
export function getCountryCodePhoneLength(countryCode: string): number {
  const lengths: Record<string, number> = {
    DK: 8,
    SE: 10,
    NO: 8,
    US: 10,
    DE: 11,
  };
  return lengths[countryCode] ?? 8;
}

export default function PhoneInputPlayground() {
  const [countryCode, setCountryCode] = React.useState("DK");
  const [maxLength, setMaxLength] = React.useState(
    getCountryCodePhoneLength("DK")
  );
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    const newLength = getCountryCodePhoneLength(countryCode);
    setMaxLength(newLength);
    setPhone(""); // clear input when country changes
  }, [countryCode]);

  return (
    <View style={{ padding: 24 }}>
      <Text>Select country:</Text>
      <Picker selectedValue={countryCode} onValueChange={setCountryCode}>
        {countries.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <Text style={{ marginTop: 16 }}>
        Phone input (maxLength: {maxLength}):
      </Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        maxLength={maxLength}
        placeholder="Enter phone number"
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 8,
          borderRadius: 6,
        }}
        keyboardType="number-pad"
      />

      <Text style={{ marginTop: 12 }}>
        Current value: {phone} ({phone.length}/{maxLength})
      </Text>
    </View>
  );
}
