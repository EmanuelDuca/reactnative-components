import { Popover } from "@usekeyhole/web";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDown,
  ChevronLeft,
  KeySquare,
  Star,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Image, Text, View, ViewComponent } from "react-native";
import { Toggle, ToggleIcon, ToggleText } from "@/components/toggle/toggle";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <Content />
    </View>
  );
}

function Content() {
  return (
    <View className="flex-1 p-20">
      <View className="flex flex-row w-fit gap-3">
        <View>
          <Toggle disabled size="small">
            <ToggleText>toggle label</ToggleText>
          </Toggle>
        </View>
        <View>
          <Toggle size="base">
            <ToggleText>toggle label</ToggleText>
          </Toggle>
        </View>
        <View>
          <Toggle size="large">
            <ToggleText>toggle label</ToggleText>
          </Toggle>
        </View>
      </View>
      <View className="flex flex-row w-fit gap-3">
        <View>
          <Toggle disabled size="small">
            <ToggleIcon>
              <ChevronLeft />
            </ToggleIcon>
          </Toggle>
        </View>
        <View>
          <Toggle size="base">
            <ToggleIcon>
              <ChevronLeft />
            </ToggleIcon>
          </Toggle>
        </View>
        <View>
          <Toggle size="large">
            <ToggleIcon>
              <ChevronLeft />
            </ToggleIcon>
          </Toggle>
        </View>
      </View>
    </View>
  );
}
