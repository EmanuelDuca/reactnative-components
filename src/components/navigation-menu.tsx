import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { PressableProps } from "react-native";

export const navigationMenuProps = cva("", {
  variants: {
    state: {
      default: "",
      active: "",
    },
    hovered: {
      false: undefined,
      true: undefined,
    },
  },
});

export type NavigationMenuProps = PressableProps;
