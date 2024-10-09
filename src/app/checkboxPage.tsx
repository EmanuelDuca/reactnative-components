import {
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <View className="h-32 w-full px-4 bg-purple-500 dark:bg-yellow-500 justify-center items-center">
        <Text className="text-white font-mono font-bold text-2xl">
          Replace Table Page
        </Text>
      </View>
      <Content />
    </View>
  );
}

function Event() {
  console.log("Event - CheckboxPage");
}

function Content() {
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Text
              role="heading"
              className="text-black dark:text-yellow-500 text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Replace table Page
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
              Discover and collaborate on amce. Explore our services now.
            </Text>

            <View className="gap-4">
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/"
              >
                Go to first page
              </Link>
            </View>
            <View className="gap-6 flex">
              <Checkbox onChange={Event}>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
                  <CheckboxDescription>
                    You agree to our Terms of Service and Privacy Policy.
                  </CheckboxDescription>
                </CheckboxContent>
              </Checkbox>

              <Text>List of Variants of Checkbox</Text>
              <Checkbox onChange={Event}>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Default</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox defaultValue={true} onChange={Event}>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Checked</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox defaultValue={true} hovered onChange={Event}>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Checked Hovered</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox disabled onChange={Event}>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Disabled </CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox onChange={Event}>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Destructive Validation </CheckboxLabel>
                </CheckboxContent>
              </Checkbox>

              <Checkbox onChange={Event} checked disabled>
                <CheckboxIndicator />
                <CheckboxContent>
                  <CheckboxLabel>Chcecked disabled</CheckboxLabel>
                </CheckboxContent>
              </Checkbox>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
