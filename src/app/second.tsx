import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <View className="h-32 w-full px-4 bg-purple-500 dark:bg-yellow-500 justify-center items-center">
        <Text className="text-white font-mono font-bold text-2xl">
          Welcome to this video!
        </Text>
      </View>
    </View>
  );
}
