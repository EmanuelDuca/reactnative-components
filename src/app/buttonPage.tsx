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
import { ScrollView, Text, View } from "react-native";

export default function Page() {
  return (
    <ScrollView>
      <View className="flex flex-1 bg-white dark:bg-black">
        <Content />
      </View>
    </ScrollView>
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
            {/* Ghost - Default */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="default">
                <ButtonText>Ghost-D</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="default">
                <ButtonText>Ghost-D</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="default">
                <ButtonText>Ghost-D</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="default">
                <ButtonText>Ghost-D</ButtonText>
              </Button>
            </View>

            {/* Ghost - Brand */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="brand">
                <ButtonText>Ghost-B</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="brand">
                <ButtonText>Ghost-B</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="brand">
                <ButtonText>Ghost-B</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="brand">
                <ButtonText>Ghost-B</ButtonText>
              </Button>
            </View>

            {/* Ghost - Brand-soft */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="brand-soft">
                <ButtonText>Ghost-BS</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="brand-soft">
                <ButtonText>Ghost-BS</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="brand-soft">
                <ButtonText>Ghost-BS</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="brand-soft">
                <ButtonText>Ghost-BS</ButtonText>
              </Button>
            </View>

            {/* Ghost - Red */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="red">
                <ButtonText>Ghost-R</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="red">
                <ButtonText>Ghost-R</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="red">
                <ButtonText>Ghost-R</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="red">
                <ButtonText>Ghost-R</ButtonText>
              </Button>
            </View>

            {/* Ghost - Red-soft */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="red-soft">
                <ButtonText>Ghost-RS</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="red-soft">
                <ButtonText>Ghost-RS</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="red-soft">
                <ButtonText>Ghost-RS</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="red-soft">
                <ButtonText>Ghost-RS</ButtonText>
              </Button>
            </View>

            {/* Ghost - Blue */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="blue">
                <ButtonText>Ghost-BL</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="blue">
                <ButtonText>Ghost-BL</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="blue">
                <ButtonText>Ghost-BL</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="blue">
                <ButtonText>Ghost-BL</ButtonText>
              </Button>
            </View>

            {/* Ghost - Accent */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="accent">
                <ButtonText>Ghost-A</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="accent">
                <ButtonText>Ghost-A</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="accent">
                <ButtonText>Ghost-A</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="accent">
                <ButtonText>Ghost-A</ButtonText>
              </Button>
            </View>

            {/* Ghost - Link */}
            <View className="flex flex-row gap-2">
              <Button variant="ghost" color="link">
                <ButtonText>Ghost-L</ButtonText>
              </Button>
              <Button variant="ghost" hovered color="link">
                <ButtonText>Ghost-L</ButtonText>
              </Button>
              <Button variant="ghost" pressed color="link">
                <ButtonText>Ghost-L</ButtonText>
              </Button>
              <Button variant="ghost" disabled color="link">
                <ButtonText>Ghost-L</ButtonText>
              </Button>
            </View>

            {/* Default */}
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
            {/* Brand-soft */}
            <View className="flex flex-row gap-2">
              <Button color="brand-soft">
                <ButtonText>Brand-S</ButtonText>
              </Button>
              <Button hovered color="brand-soft">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed color="brand-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled color="brand-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>
            {/* Brand */}
            <View className="flex flex-row gap-2">
              <Button color="brand">
                <ButtonText>Brand</ButtonText>
              </Button>
              <Button hovered color="brand">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed color="brand">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled color="brand">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>
            {/* Red */}
            <View className="flex flex-row gap-2">
              <Button color="red">
                <ButtonText>Red</ButtonText>
              </Button>
              <Button hovered color="red">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed color="red">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled color="red">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>
            {/* Red-soft */}
            <View className="flex flex-row gap-2">
              <Button color="red-soft">
                <ButtonText>Red-Soft</ButtonText>
              </Button>
              <Button hovered color="red-soft">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed color="red-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled color="red-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Blue */}
            <View className="flex flex-row gap-2">
              <Button color="blue">
                <ButtonText>Blue</ButtonText>
              </Button>
              <Button hovered color="blue">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed color="blue">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled color="blue">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Accent */}
            <View className="flex flex-row gap-2">
              <Button color="accent">
                <ButtonText>Accent</ButtonText>
              </Button>
              <Button hovered color="accent">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed color="accent">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled color="accent">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Link */}
            <View className="flex flex-row gap-2">
              <Button color="link">
                <ButtonText>Link</ButtonText>
              </Button>
              <Button hovered color="link">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button pressed color="link">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button disabled color="link">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            <View className="flex flex-row gap-2">
              <Text className="text-foreground">Link</Text>
            </View>
            {/* Default */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="default">
                <ButtonText>Default</ButtonText>
              </Button>
              <Button variant="link" hovered color="default">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="default">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="default">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Brand */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="brand">
                <ButtonText>Brand</ButtonText>
              </Button>
              <Button variant="link" hovered color="brand">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="brand">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="brand">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Brand-soft */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="brand-soft">
                <ButtonText>Brand-Soft</ButtonText>
              </Button>
              <Button variant="link" hovered color="brand-soft">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="brand-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="brand-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Red */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="red">
                <ButtonText>Red</ButtonText>
              </Button>
              <Button variant="link" hovered color="red">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="red">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="red">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Red-soft */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="red-soft">
                <ButtonText>Red-soft</ButtonText>
              </Button>
              <Button variant="link" hovered color="red-soft">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="red-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="red-soft">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Blue */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="blue">
                <ButtonText>Blue</ButtonText>
              </Button>
              <Button variant="link" hovered color="blue">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="blue">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="blue">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Accent */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="accent">
                <ButtonText>Accent</ButtonText>
              </Button>
              <Button variant="link" hovered color="accent">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="accent">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="accent">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>

            {/* Link */}
            <View className="flex flex-row gap-5">
              <Button variant="link" color="link">
                <ButtonText>Link</ButtonText>
              </Button>
              <Button variant="link" hovered color="link">
                <ButtonText>Defa</ButtonText>
              </Button>
              <Button variant="link" pressed color="link">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button variant="link" disabled color="link">
                <ButtonText>Ghost</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
