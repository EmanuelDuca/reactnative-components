import * as React from "react";
import { FlatList, Text, useWindowDimensions, View } from "react-native";
import { useColorScheme } from "nativewind";
import * as Icons from "~/icons";

type IconComponent = React.ComponentType<{
  width?: number;
  height?: number;
  color?: string;
}>;

const iconEntries = Object.entries(Icons)
  .filter(([, Icon]) => typeof Icon === "function")
  .sort(([nameA], [nameB]) => nameA.localeCompare(nameB));

const iconData = iconEntries.map(([name, Icon]) => ({
  name,
  Icon: Icon as IconComponent,
}));

export default function IconsPage() {
  const { colorScheme } = useColorScheme();
  const { width } = useWindowDimensions();

  const numColumns = Math.max(2, Math.floor(width / 130));
  const iconColor = colorScheme === "dark" ? "#fafafa" : "#262626";

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <Text className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Icons Showcase
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {iconData.length} icons from src/icons
        </Text>
      </View>

      <FlatList
        key={`columns-${numColumns}`}
        data={iconData}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        contentContainerStyle={{ padding: 10, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, minWidth: 0, margin: 6 }}>
            <View className="h-24 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-neutral-950">
              <item.Icon width={26} height={26} color={iconColor} />
              <Text
                className="mt-2 text-center text-[11px] text-neutral-700 dark:text-neutral-300"
                numberOfLines={2}
              >
                {item.name}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
