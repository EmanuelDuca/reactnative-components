import { Button, ButtonText } from "@/components/button";
import {
  Menu,
  MenuContent,
  MenuDescription,
  MenuEndAdornment,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuLabel,
} from "@/components/navigation-menu";
import {
  Avatar,
  AvatarFallback,
  Badge,
  BadgeText,
  ChevronDown,
  EllipsisVertical,
  Layers,
  User,
  Users,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <View className="h-32 w-full px-4 bg-purple-500 dark:bg-yellow-500 justify-center items-center">
        <Text className="text-white font-mono font-bold text-2xl">
          Button Page
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

function Content() {
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-2 text-center">
            <View className="flex flex-row gap-5">
              <Text className="font-semibold text-foreground">Default</Text>
              <Text className="font-semibold text-foreground">on Hover</Text>
              <Text className="font-semibold text-foreground">Pressed</Text>
              <Text className="font-semibold text-foreground">Disabled</Text>
            </View>
            <View className="flex flex-row gap-2">
              <Button variant="ghost">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="ghost" hovered>
                <ButtonText>Gost</ButtonText>
              </Button>
              <Button variant="ghost" pressed>
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="ghost" disabled>
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>
            <View className="flex flex-row gap-2">
              <Button>
                <ButtonText>Default</ButtonText>
              </Button>
              <Button hovered>
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed>
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled>
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
