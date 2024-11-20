import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  KeySquare,
  Star,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { Image, Text, View, ViewComponent } from "react-native";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/newToggleVariant/toggle-group";
import {
  Toggle,
  ToggleIcon,
  ToggleText,
} from "@/components/newToggleVariant/toggle";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <Content />
    </View>
  );
}

function Content() {
  const [values1, setValues1] = React.useState<string>();
  const [values2, setValues2] = React.useState<string[]>([]);
  return (
    <View className="flex-1 p-20">
      <View className="flex flex-row w-fit gap-3">
        <View>
          <Toggle size="sm">
            <ToggleText>toggle label</ToggleText>
          </Toggle>
        </View>
        <View>
          <Toggle>
            <ToggleText>toggle label</ToggleText>
          </Toggle>
        </View>
        <View>
          <Toggle size="lg">
            <ToggleText>toggle label</ToggleText>
          </Toggle>
        </View>
      </View>

      <View className="flex flex-row w-fit gap-3">
        <View>
          <Toggle size="icon-sm">
            <ToggleIcon>
              <ChevronLeft />
            </ToggleIcon>
          </Toggle>
        </View>
        <View>
          <Toggle size="icon">
            <ToggleIcon>
              <ChevronLeft />
            </ToggleIcon>
          </Toggle>
        </View>
        <View>
          <Toggle size="icon-lg">
            <ToggleIcon>
              <ChevronLeft />
            </ToggleIcon>
          </Toggle>
        </View>
      </View>
      <View className="flex flex-row items-center my-5 w-fit">
        <Text className="text-foreground mx-2">Default Value</Text>
        <ToggleGroup
          //value={values1}
          //defaultValue="icon-center"
          size={"icon"}
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
      <View className="flex flex-row items-center my-5 w-fit">
        <Text className="text-foreground mx-2">Single</Text>
        <ToggleGroup
          value={values1}
          onValueChange={setValues1}
          type="single"
          size="icon"
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
        <ToggleGroup
          value={values2}
          onValueChange={setValues2}
          type="multiple"
          size="icon"
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
