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
          NavigationMenu Page
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
          <View className="flex flex-row items-center gap-4 text-center">
            <View className="w-72">
              <Menu value={selectedValue} onChange={handleValueChange}>
                <MenuGroup className="">
                  <MenuItem value="Dashboard">
                    <MenuIcon>
                      <Layers />
                    </MenuIcon>
                    <MenuContent>
                      <MenuLabel>Dashboard</MenuLabel>
                      <MenuDescription>Description</MenuDescription>
                    </MenuContent>
                    <MenuEndAdornment>
                      <Badge>
                        <BadgeText>15 Active</BadgeText>
                      </Badge>
                    </MenuEndAdornment>
                  </MenuItem>
                  <MenuItem value="Tentants">
                    <MenuIcon>
                      <Users />
                    </MenuIcon>
                    <MenuContent>
                      <MenuLabel>Tentants</MenuLabel>
                    </MenuContent>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup className="pt-8">
                  <MenuItem value="MartKingisepp" disabled>
                    <Avatar>
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <MenuContent>
                      <MenuLabel>Mart Kingisepp</MenuLabel>
                      <MenuDescription>
                        {"[NORWAY] Mate Rentals A/S"}
                      </MenuDescription>
                    </MenuContent>
                    <MenuEndAdornment>
                      <MenuIcon>
                        <EllipsisVertical />
                      </MenuIcon>
                    </MenuEndAdornment>
                  </MenuItem>
                </MenuGroup>
              </Menu>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
