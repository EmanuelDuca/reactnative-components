import { Popover } from "@usekeyhole/web";
import {
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
import { DownloadIcon } from "@usekeyhole/ui";
import { Button, ButtonText } from "../components/button";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <Content />
    </View>
  );
}

function Content() {
  const [values1, setValues1] = React.useState<string>("");
  const [values2, setValues2] = React.useState<string[]>([""]);
  const [pressed, setPressed] = React.useState<boolean>(false);
  const [hovered, setHovered] = React.useState<boolean>(false);

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
      <View className="flex flex-row items-center my-5 w-fit">
        <Text className="text-foreground mx-2">Single</Text>
        <ToggleGroup
          value={values1}
          onValueChange={setValues1}
          type="single"
          //defaultValue="icon-center"
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
      <View className="flex flex-row items-center  my-5 w-fit">
        <Text className="text-foreground mx-2">Multiple</Text>
        <ToggleGroup value={values2} onValueChange={setValues2} type="multiple">
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
      <View className="flex flex-row">
        <View className="gap-2">
          <Button pressed={pressed} hovered={hovered} size="lg">
            <ButtonText>Pressed is Control Outside</ButtonText>
          </Button>
          <Button
            onPress={() => {
              setPressed(!pressed);
            }}
            size="lg"
            variant="link"
          >
            <ButtonText>Change press state</ButtonText>
          </Button>
          <Button>
            <ButtonText>Change hover state</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
}
