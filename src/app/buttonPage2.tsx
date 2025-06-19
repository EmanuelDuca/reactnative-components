/* import {
  Button,
  ButtonIcon,
  ButtonProps,
  ButtonText,
} from "../components/button"; */
import { DownloadIcon } from "@usekeyhole/ui";
import { ScrollView, View } from "react-native";
import * as Crypto from "expo-crypto";
import {
  ExternalLink,
  Star,
  Button,
  ButtonIcon,
  ButtonProps,
  ButtonText,
} from "@usekeyhole/nativewind";
import React from "react";

const buttonVariants = {
  variants: ["default", "ghost", "link"] as ButtonProps["variant"][],
  colors: [
    "default",
    "brand",
    "brand-soft",
    "red",
    "red-soft",
    "blue",
    "accent",
    "link",
  ] as ButtonProps["color"][],
} as const;

const meta = {
  title: "NATIVEWIND/components/Button",
  component: Button,
  argTypes: {
    variant: {
      defaultValue: "default",
      type: "string",
      control: {
        type: "inline-radio",
        options: buttonVariants.variants,
      },
    },
    color: {
      defaultValue: "default",
      type: "string",
      control: {
        type: "inline-radio",
        options: buttonVariants.colors,
      },
    },
    size: {
      defaultValue: "default",
      type: "string",
      control: {
        type: "inline-radio",
        options: ["sm", "default", "lg", "icon-sm", "icon", "icon-lg"],
      },
    },
    disabled: {
      defaultValue: false,
      type: "boolean",
    },
    onPress: {
      action: "onPress",
    },
  },
};

export default function Page() {
  return (
    <ScrollView>
      <View className="flex flex-1 bg-white dark:bg-black">
        <Content />
      </View>
    </ScrollView>
  );
}

function Content({ ...props }) {
  return (
    <View className="p-10">
      <View className="flex flex-row gap-8">
        <Button>
          <ButtonText>Button</ButtonText>
        </Button>
        <Button disabled color={"brand"}>
          <ButtonText>Button</ButtonText>
        </Button>
        <Button color={"brand-soft"}>
          <ButtonText>Button</ButtonText>
        </Button>
        ...
        <Button {...props}>
          <ButtonText>Button</ButtonText>
          <ButtonIcon>
            <ExternalLink />
          </ButtonIcon>
        </Button>
        ...
        <Button {...props}>
          <ButtonIcon>
            <Star />
          </ButtonIcon>
        </Button>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <ScrollView className="my-6 gap-2" contentContainerClassName="gap-6">
          {buttonVariants.variants.map((variant) => (
            <View key={Crypto.randomUUID()} className="gap-6">
              <View className="flex-row items-center gap-6">
                {buttonVariants.colors.map((color) => (
                  <Button
                    key={Crypto.randomUUID()}
                    variant={variant}
                    color={color}
                  >
                    <ButtonText>Button</ButtonText>
                    <ButtonIcon>
                      <ExternalLink />
                    </ButtonIcon>
                  </Button>
                ))}
              </View>
              <View className="flex-row items-center gap-6">
                {buttonVariants.colors.map((color) => (
                  <Button
                    key={Crypto.randomUUID()}
                    variant={variant}
                    color={color}
                    size="icon"
                  >
                    <ButtonIcon>
                      <Star />
                    </ButtonIcon>
                  </Button>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
