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
  const [value, setValue] = React.useState<string>();
  const [values, setValues] = React.useState<string[]>([]);
  const [scoreValue, setScoreValue] = React.useState<string>("9");
  function handleScoreChange(value: string) {
    if (value) {
      setScoreValue(value); // Local state update
      //form.setValue("score", Number(value)); // Sync with react-hook-form
    }
  }

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
          defaultValue="icon-center"
          size={"icon"}
          //color="brand"
          //variant="ghost"
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
          value={value}
          color="blue"
          onValueChange={setValue}
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
          //value={values}
          color="red-soft"
          onValueChange={(newValues) => {
            console.log(newValues);
            setValues(newValues);
          }}
          defaultValue={["icon-center"]}
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
      <View className="flex flex-row items-center  my-5 w-fit">
        <ToggleGroup
          type="single"
          className="flex flex-wrap gap-1.5"
          value={scoreValue}
          onValueChange={handleScoreChange}
        >
          {/* First Row - First 5 Elements */}
          <View className="flex flex-row gap-1.5">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
              <ToggleGroupItem
                key={`score-item-${item}`}
                value={item.toString()}
                className="w-10 sm:w-9"
              >
                {item}
              </ToggleGroupItem>
            ))}
          </View>
          {/* Second Row - Remaining Elements */}
          <View className="flex flex-row gap-1.5">
            {Array.from({ length: 5 }, (_, i) => i + 6).map((item) => (
              <ToggleGroupItem
                key={`score-item-${item}`}
                value={item.toString()}
                className="w-10 sm:w-9"
              >
                {item}
              </ToggleGroupItem>
            ))}
          </View>
        </ToggleGroup>
      </View>
    </View>
  );
}
