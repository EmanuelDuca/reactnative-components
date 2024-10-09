import { cn } from "@usekeyhole/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { Text, View, ViewProps } from "react-native";

const avatarVariants = cva("rounded-full bg-brand-50 dark:bg-brand-900", {
  variants: {
    size: {
      small: "p-1",
      base: "p-2",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export type AvatarProps = ViewProps &
  VariantProps<typeof avatarVariants> & {
    name: string;
  };

export const Avatar = React.forwardRef<View, AvatarProps>(
  ({ className, name, size, ...props }, ref) => {
    return (
      <View className={cn(avatarVariants({ size }), className)} {...props}>
        <Text className="text-xs font-semibold py-1 w-6 flex justify-center text-neutral-900 dark:text-white">
          {name}
        </Text>
      </View>
    );
  }
);
