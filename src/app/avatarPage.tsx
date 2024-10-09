import { Avatar } from "@/components/avatar";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <View className="h-32 w-full px-4 bg-purple-500 dark:bg-yellow-500 justify-center items-center">
        <Text className="text-white font-mono font-bold text-2xl">
          Avatar Page
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
      </View>
      <Content />
    </View>
  );
}

//size="small"

function Content() {
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Avatar name="MK" size="small" />
          </View>
        </View>
      </View>
    </View>
  );
}
