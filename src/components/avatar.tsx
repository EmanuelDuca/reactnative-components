import { cn } from "@usekeyhole/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Image,
  ImageProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

const avatarVariants = cva(
  "bg-brand-50 dark:bg-brand-900 relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        small: "size-8",
        base: "size-10",
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
Avatar.displayName = "Avatar";

/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * -----------------------------------------------------------------------------------------------*/

const avatarImageVariants = cva(
  "absolute z-10 h-full w-full transition-opacity",
  {
    variants: {
      isLoaded: {
        true: undefined,
        false: undefined,
      },
    },
    compoundVariants: [
      // Image is not loaded
      {
        isLoaded: false,
        className: "opacity-0",
      },
      // Image was loaded
      {
        isLoaded: true,
        className: "opacity-100",
      },
    ],
    defaultVariants: {
      isLoaded: false,
    },
  }
);

export type AvatarImageProps = ImageProps &
  VariantProps<typeof avatarImageVariants>;

export const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    return (
      <Image
        ref={ref}
        source={{ uri: src }}
        onLoad={handleLoad}
        className={cn(avatarImageVariants({ isLoaded }), className)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * -----------------------------------------------------------------------------------------------*/

export type AvatarFallbackProps = TextProps;

export const AvatarFallback = React.forwardRef<Text, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <View className="flex h-full w-full items-center justify-center rounded-full">
        <Text
          ref={ref}
          className="text-foreground justify-center text-center text-xs font-semibold"
          {...props}
        />
      </View>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";
