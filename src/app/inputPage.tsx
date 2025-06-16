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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AddRentalDialog open={open} onOpenChange={setOpen}>
            <Text
              onPress={() => setOpen(true)}
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                padding: 10,
                borderRadius: 5,
              }}
            >
              Open Add Rental Dialog
            </Text>
          </AddRentalDialog>
        </View>
      </ScrollView>
    </View>
  );
}
