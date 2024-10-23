import { cn } from "@usekeyhole/utils";
import React, { Children } from "react";
import {
  Image,
  ImageBackground,
  ImageProps,
  ImageStyle,
  View,
  ViewProps,
} from "react-native";
import ImagesDenamrk from "./imagesDenmark";
import * as Slot from "@rn-primitives/slot";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayout
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutProps = ViewProps;

export const TwoColumnLayout = React.forwardRef<View, TwoColumnLayoutProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("h-full flex flex-row", className)}
        {...props}
      />
    );
  }
);
TwoColumnLayout.displayName = "TwoColumnLayout";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayoutPrimaryColumn
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutPrimaryColumnProps = ViewProps;

export const TwoColumnLayoutPrimaryColumn = React.forwardRef<
  View,
  TwoColumnLayoutPrimaryColumnProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex flex-col py-16 px-8 md:p-16 w-full xl:w-8/12",
        className
      )}
      {...props}
    />
  );
});
TwoColumnLayoutPrimaryColumn.displayName = "TwoColumnLayoutPrimaryColumn";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayoutSecondaryColumn
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutSecondaryColumnProps = ViewProps;

export const TwoColumnLayoutSecondaryColumn = React.forwardRef<
  View,
  TwoColumnLayoutSecondaryColumnProps
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("p-6 hidden xl:flex xl:w-4/12", className)}
      {...props}
    >
      <View className="flex-1">{children}</View>
    </View>
  );
});
TwoColumnLayoutSecondaryColumn.displayName = "TwoColumnLayoutSecondaryColumn";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayoutHeader
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutHeaderProps = ViewProps;

export const TwoColumnLayoutHeader = React.forwardRef<
  View,
  TwoColumnLayoutHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("h-9 flex-row w-full items-center", className)}
      {...props}
    />
  );
});
TwoColumnLayoutHeader.displayName = "TwoColumnLayoutHeader";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayoutFooter
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutFooterProps = ViewProps;

export const TwoColumnLayoutFooter = React.forwardRef<
  View,
  TwoColumnLayoutFooterProps
>(({ className, ...props }, ref) => {
  return (
    <View ref={ref} className={cn("h-9 flex-row", className)} {...props} />
  );
});
TwoColumnLayoutFooter.displayName = "TwoColumnLayoutFooter";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayoutContent
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutContentProps = ViewProps;

export const TwoColumnLayoutContent = React.forwardRef<
  View,
  TwoColumnLayoutContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-grow justify-center items-start lg:items-center ",
        className
      )}
      {...props}
    >
      <View className="w-full lg:w-auto">{children}</View>
    </View>
  );
});
TwoColumnLayoutContent.displayName = "TwoColumnLayoutContent";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayoutHeaderActions
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutHeaderActionsProps = ViewProps;

export const TwoColumnLayoutHeaderActions = React.forwardRef<
  View,
  TwoColumnLayoutHeaderActionsProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-1 flex-row justify-end items-center gap-2",
        className
      )}
      {...props}
    />
  );
});
TwoColumnLayoutHeaderActions.displayName = "TwoColumnLayoutHeaderActions";

/* -------------------------------------------------------------------------------------------------
 * TwoColumnLayoutImage
 * -----------------------------------------------------------------------------------------------*/

export type TwoColumnLayoutImageProps = ImageProps & {
  asChild?: boolean;
  children?: JSX.Element;
};

export const TwoColumnLayoutImage = React.forwardRef<
  ImageProps,
  TwoColumnLayoutImageProps
>(({ asChild, className, style, ...props }, ref) => {
  const Element = asChild ? Slot.Image : ImageBackground;
  return (
    <>
      <Element
        style={[{ width: "100%", height: "100%" }, style]} // Combine default style with provided style
        className={cn(
          "w-full h-full rounded-2xl absolute top-0 left-0 right-0 bottom-0 object-cover",
          className
        )}
        {...props}
      />
      <View className="absolute w-full h-2/4 bottom-0 rounded-b-2xl bg-gradient-to-t from-black" />
    </>
  );
});
TwoColumnLayoutHeaderActions.displayName = "TwoColumnLayoutImage";
