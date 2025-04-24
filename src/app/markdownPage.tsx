import { Text } from "@usekeyhole/nativewind";
import { Markdown } from "@/components/markdown/markdown";
import { Link } from "expo-router";
import * as React from "react";
import { Linking, View } from "react-native";

export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  const landlordName = "John Smith";
  const termsUrl = "https://example.com/terms";

  const markdownText = `To activate Keyhole Secure, one of ${landlordName}'s Ultimate Beneficial Owners (UBOs) must agree to the [Terms & Conditions](${termsUrl}) and complete identity verification.`;

  return (
    <View className="flex-1 bg-background">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="items-center gap-4 text-center">
            <Markdown>{markdownText}</Markdown>
            <Text className="text-destructive">example of rwed text</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
