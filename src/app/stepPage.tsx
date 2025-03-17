import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import WelcomeEmail from "@/components/emailLayout/email";
import YelpRecentLoginEmail from "@/components/emailLayout/emailReactExample";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Check,
  ChevronRight,
  FileKey2,
} from "@usekeyhole/nativewind";
import {
  Step,
  StepContent,
  StepEndAdornment,
  StepProps,
  StepStatus,
  StepText,
} from "@/components/stepper/step";
import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperItemProps,
  StepperStatus,
  StepperSeparator,
  StepperText,
  StepperEndAdornment,
} from "@/components/stepper/stepper";

export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  const states: StepProps["state"][] = [
    "default",
    "current",
    "partialComplete",
    "completed",
    "failed",
  ];

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="py-12 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col p-6 gap-4 text-center w-1/2">
            {/* <Step state="completed" card>
              <StepStatus />
              <StepContent>
                <StepText className="font-semibold">
                  Create your first property
                </StepText>
                <StepText className="text-neutral-500 dark:text-neutral-400">
                  Start by listing your property on Keyhole.
                </StepText>
              </StepContent>

              <StepEndAdornment>
                <Button size={"icon"} color="brand-soft">
                  <ButtonIcon className="stroke-teal-700 dark:stroke-teal-400">
                    <Check />
                  </ButtonIcon>
                </Button>
              </StepEndAdornment>
            </Step>

            <Step state="current" card>
              <StepStatus />
              <StepContent>
                <StepText className="font-semibold">
                  Add your first rental
                </StepText>
                <StepText className="text-neutral-500 dark:text-neutral-400">
                  Next, add the rentals you want to list.
                </StepText>
              </StepContent>
              <StepEndAdornment>
                <Button size={"icon"} color={"brand"}>
                  <ButtonIcon>
                    <ChevronRight />
                  </ButtonIcon>
                </Button>
              </StepEndAdornment>
            </Step> */}

            <Step state="default" card>
              <StepStatus />
              <StepContent>
                <StepText className="font-semibold">
                  Invite your first tenant
                </StepText>
                <StepText className="text-neutral-500 dark:text-neutral-400">
                  Finally, invite tenants to your rentals.
                </StepText>
              </StepContent>
            </Step>
            <Stepper card direction="vertical">
              <StepperItem key={crypto.randomUUID()} state="completed">
                <StepperStatus />
                <StepperContent>
                  <StepperText className="font-semibold">
                    Create your first property
                  </StepperText>
                  <StepperText className="text-neutral-500 dark:text-neutral-400">
                    Start by listing your property on Keyhole.
                  </StepperText>
                </StepperContent>
                <StepperEndAdornment>
                  <Button size={"icon"} color="brand-soft">
                    <ButtonIcon className="stroke-teal-700 dark:stroke-teal-400">
                      <Check />
                    </ButtonIcon>
                  </Button>
                </StepperEndAdornment>
              </StepperItem>
              <StepperSeparator />
              <StepperItem key={crypto.randomUUID()} state="current">
                <StepperStatus />
                <StepperContent>
                  <StepperText className="font-semibold">
                    Add your first rental
                  </StepperText>
                  <StepperText className="text-neutral-500 dark:text-neutral-400">
                    Next, add the rentals you want to list.
                  </StepperText>
                </StepperContent>
                <StepperEndAdornment>
                  <Button size={"icon"} color={"brand"}>
                    <ButtonIcon>
                      <ChevronRight />
                    </ButtonIcon>
                  </Button>
                </StepperEndAdornment>
              </StepperItem>
              <StepperSeparator />
              <StepperItem key={crypto.randomUUID()} state="default">
                <StepperStatus />
                <StepperContent>
                  <StepperText className="font-semibold">
                    Invite your first tenant
                  </StepperText>
                  <StepperText className="text-neutral-500 dark:text-neutral-400">
                    Finally, invite tenants to your rentals.
                  </StepperText>
                </StepperContent>
              </StepperItem>
            </Stepper>
          </View>
        </View>
      </View>
    </View>
  );
}
