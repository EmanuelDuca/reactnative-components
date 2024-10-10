import { cn } from "@usekeyhole/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full bg-brand-50 dark:bg-brand-900",
  {
    variants: {
      size: {
        small: "h-8 w-8",
        base: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
);

export type AvatarProps = ViewProps & VariantProps<typeof avatarVariants>;

export const Avatar = React.forwardRef<View, AvatarProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      />
    );
  }
);

export type AvatarImageProps = ImageProps & {
  src: string;
  alt?: string;
};

export const AvatarImage = React.forwardRef<View, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    const [failedToLoad, setFailedToLoad] = React.useState(false);

    const handleError = () => {
      setFailedToLoad(true);
    };

    return !failedToLoad ? (
      <View ref={ref}>
        <Image
          source={{ uri: src }}
          onError={handleError}
          className="aspect-square h-full w-full"
          {...props}
        />
      </View>
    ) : null;
  }
);

export type AvatarFallbackProps = TextProps;

export const AvatarFallback = React.forwardRef<Text, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <View className="flex h-full w-full items-center justify-center rounded-full">
        <Text
          ref={ref}
          className="text-xs text-center justify-center font-semibold text-neutral-900 dark:text-white"
          {...props}
        />
      </View>
    );
  }
);
