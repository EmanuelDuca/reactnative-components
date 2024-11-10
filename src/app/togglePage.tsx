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
  ChevronRight,
  ChevronUp,
  KeySquare,
  Star,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Image, Text, View, ViewComponent } from "react-native";
import { Toggle, ToggleIcon, ToggleText } from "@/components/toggle/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle/toggleGroup";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <Content />
    </View>
  );
}

function Content() {
  const [selectedValue, setSelectedValue] = React.useState<string[]>([""]);

  const handleValueChange = (value: string[]) => {
    setSelectedValue(value);
  };
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
          <Toggle size="small">
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
      <View className="flex my-5 w-fit">
        <ToggleGroup
          type="single"
          value={selectedValue}
          onValueChange={handleValueChange}
        >
          <ToggleGroupItem value="icon-left">
            <ToggleIcon>
              <ChevronLeft />
            </ToggleIcon>
          </ToggleGroupItem>
          <ToggleGroupItem value="icon-center">
            <ToggleIcon>
              <ChevronUp />
            </ToggleIcon>
          </ToggleGroupItem>
          <ToggleGroupItem value="icon-right">
            <ToggleIcon>
              <ChevronRight />
            </ToggleIcon>
          </ToggleGroupItem>
        </ToggleGroup>
      </View>
    </View>
  );
}
