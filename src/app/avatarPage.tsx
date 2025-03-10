import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import WelcomeEmail from "@/components/emailLayout/email";
import YelpRecentLoginEmail from "@/components/emailLayout/emailReactExample";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";
import { Button, ButtonText, FileKey2 } from "@usekeyhole/nativewind";
import { ScreenShareOff } from "@/components/icons/screen-share-off";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@usekeyhole/web";

export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-row items-center gap-4 text-center">
            {/* <Avatar name="MK" /> */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size={"small"}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size={"small"}>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </View>
          <AlertDialog open>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent className="p-6 gap-4 w-[464px]">
              <AlertDialogHeader className="items-center gap-3">
                <ScreenShareOff className="size-12 " strokeWidth={0.75} />
                <AlertDialogTitle className="font-extrabold uppercase italic text-center">
                  Unsupported Device
                </AlertDialogTitle>
                <AlertDialogDescription className="font-normal text-sm text-center">
                  Keyhole's Management Portal is optimized for larger screens.
                  Please use a device with a screen width of at least 1024px for
                  the best experience.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <View className="items-center">
                <Button color={"brand"} size={"lg"}>
                  <ButtonText>Go to usekeyhole.com</ButtonText>
                </Button>
              </View>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      </View>
    </View>
  );
}
