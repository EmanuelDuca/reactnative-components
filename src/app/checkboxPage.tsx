import {
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Page() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="flex flex-1 bg-white dark:bg-black">
        <Content />
      </View>
    </ScrollView>
  );
}

function Content() {
  const [accepted, setAccepted] = React.useState(false);

  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-5 text-center">
            <Text
              role="heading"
              className="text-black dark:text-yellow-500 text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Checkbox Page
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
              Interactive checkbox examples for states, variants and a
              controlled checkbox.
            </Text>

            <View className="gap-4 flex-row">
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/"
              >
                Go to Home
              </Link>
            </View>

            <View className="w-full max-w-[720px] gap-6 pt-2">
              <Checkbox checked={accepted} onChange={setAccepted}>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
                  <CheckboxDescription>
                    You agree to our Terms of Service and Privacy Policy.
                  </CheckboxDescription>
                </CheckboxContent>
              </Checkbox>
              <Text className="text-sm text-gray-500 dark:text-gray-400 text-left">
                Current value: {accepted ? "Checked" : "Unchecked"}
              </Text>

              <Text className="text-base font-semibold text-foreground text-left">
                Visual States
              </Text>

              <Checkbox>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Default</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox checked hovered>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Checked Hovered</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox pressed>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Pressed</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox disabled>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Disabled</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox variant="destructive">
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Destructive Validation</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox checked disabled>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Checked Disabled</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
