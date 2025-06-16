import {
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Details,
  DetailsItem,
  DetailsLabel,
  DetailsLabelText,
  DetailsList,
  DetailsTitle,
  DetailsTitleText,
  DetailsValue,
  DetailsValueText,
  FileKey2,
  Markdown,
  Skeleton,
  Step,
  StepStatus,
  StepText,
  Text,
} from "@usekeyhole/nativewind";
import { cn } from "@usekeyhole/utils";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@usekeyhole/web";
import * as React from "react";
import { Linking, ScrollView, View, Platform } from "react-native";
import { LeaseProductWidgetDemo } from "~/components/leaseProductWidget";
import { TenantGroupDetailsDemo } from "~/components/TenantGorupDetails";

export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  return (
    <View className="h-full w-full bg-background">
      <ScrollView>
        {/* <View className="">
          <View className="flex items-center gap-6 ">
            <View className="flex w-full h-44 gap-7 "></View>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button color={"accent"}>
                    <ButtonText>Get help</ButtonText>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="p-5 w-56">
                  <TooltipArrow />
                  <View className="gap-2">
                    <View className="gap-1">
                      <Text className="text-sm font-normal">
                        Call Keyhole at:
                      </Text>
                      <Text className="font-semibold text-sm text-info">
                        +45 71 74 71 24
                      </Text>
                    </View>
                    <View className="flex flex-col">
                      <Text className="text-sm font-normal">
                        Or send an email to:
                      </Text>
                      <View className="w-fit">
                        <Button
                          variant="link"
                          color={"blue"}
                          onPress={() => {
                            "Email button was pressed";
                          }}
                        >
                          <ButtonText>team@usekeyhole.com</ButtonText>
                        </Button>
                      </View>
                    </View>
                  </View>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <ButtonText>Get help</ButtonText>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="p-5 w-56">
                <PopoverArrow />
                <View className="gap-2">
                  <View className="gap-1">
                    <Text className="text-sm font-normal">
                      Call Keyhole at:
                    </Text>
                    <Text className="font-semibold text-sm text-info">
                      +45 71 74 71 24
                    </Text>
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-sm font-normal">
                      Or send an email to:
                    </Text>
                    <View className="w-fit">
                      <Button
                        variant="link"
                        color={"blue"}
                        onPress={() => {
                          "Email button was pressed";
                        }}
                      >
                        <ButtonText>team@usekeyhole.com</ButtonText>
                      </Button>
                    </View>
                  </View>
                </View>
              </PopoverContent>
            </Popover>
          </View>
        </View> */}
        <View className="flex-row">
          <View className="w-1/2">
            <Card className="gap-2 rounded-2xl z-50 p-2 w-full">
              <View className=" z-50 w-full">
                <View className="p-6 gap-6 rounded-lg ">
                  <Skeleton className="h-[34px] w-32   rounded-2xl" />
                  <View className="flex-row gap-4">
                    <Skeleton className="h-12 w-12   rounded-full" />
                    <View className="gap-1">
                      <Skeleton className="h-5 w-28  " />
                      <Skeleton className="h-6 w-44  " />
                    </View>
                  </View>
                  <View className="w-full gap-2">
                    <View className="flex-row w-full">
                      <View className="w-1/2">
                        <Skeleton className="h-5 w-14  " />
                      </View>
                      <Skeleton className="h-5 w-28  " />
                    </View>
                    <View className="flex-row w-full">
                      <View className="w-1/2">
                        <Skeleton className="h-5 w-28  " />
                      </View>
                      <Skeleton className="h-5 w-28  " />
                    </View>
                  </View>
                </View>
                <View className="w-full p-6 gap-3">
                  <Skeleton className="h-5 w-28 mt-2  " />
                  <View className="gap-2">
                    <View className="flex-row">
                      <View className="w-1/2">
                        <Skeleton className="h-5 w-32  " />
                      </View>
                      <Skeleton className="h-5 w-20  " />
                    </View>
                    <View className="flex-row">
                      <View className="w-1/2">
                        <Skeleton className="h-5 w-40  " />
                      </View>
                      <Skeleton className="h-5 w-20  " />
                    </View>
                    <View className="flex-row">
                      <View className="w-1/2">
                        <Skeleton className="h-5 w-10  " />
                      </View>
                      <Skeleton className="h-5 w-20  " />
                    </View>
                  </View>
                </View>
                <View className="p-6 pt-2">
                  <Skeleton className="w-full h-9  " />
                </View>
              </View>
            </Card>
          </View>
          <View className="w-1/2">
            <LeaseProductWidgetDemo />
          </View>
        </View>
        <TenantGroupDetailsDemo />
      </ScrollView>
    </View>
  );
}
