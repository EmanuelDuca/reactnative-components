import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import WelcomeEmail from "@/components/emailLayout/email";
import YelpRecentLoginEmail from "@/components/emailLayout/emailReactExample";
import { Link } from "expo-router";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
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
  StepTitle,
  StepDescription,
} from "@/components/stepper/step";
import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperItemProps,
  StepperStatus,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
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
      <ScrollView>
        <View className="py-2 xl:py-2">
          <View className="px-4 md:px-6">
            <View className="flex flex-col p-6 gap-4 text-center w-1/2">
              {/* <Step state="completed" card>
                <StepStatus />
                <StepContent>
                  <StepTitle className="font-semibold">
                    Create your first property
                  </StepTitle>
                  <StepDescription className="text-neutral-500 dark:text-neutral-400">
                    Start by listing your property on Keyhole.
                  </StepDescription>
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
                  <StepTitle className="font-semibold">
                    Add your first rental
                  </StepTitle>
                  <StepDescription className="text-neutral-500 dark:text-neutral-400">
                    Next, add the rentals you want to list.
                  </StepDescription>
                </StepContent>
                <StepEndAdornment>
                  <Button size={"icon"} color={"brand"}>
                    <ButtonIcon>
                      <ChevronRight />
                    </ButtonIcon>
                  </Button>
                </StepEndAdornment>
              </Step> */}
              <View>
                {states.map((state) => (
                  <>
                    <Step disabled key={crypto.randomUUID()} state={state}>
                      <StepStatus />
                      <StepContent>
                        <StepTitle className="font-semibold">{state}</StepTitle>
                        <StepDescription className="text-neutral-500 dark:text-neutral-400">
                          Description
                        </StepDescription>
                      </StepContent>
                    </Step>
                  </>
                ))}
              </View>

              <Step disabled state="default" card>
                <StepStatus />
                <StepContent>
                  <StepTitle>Invite your first tenant</StepTitle>
                  <StepDescription>
                    Finally, invite tenants to your rentals.
                  </StepDescription>
                </StepContent>
              </Step>
              <Stepper card direction="vertical">
                <StepperItem
                  disabled
                  key={crypto.randomUUID()}
                  state="completed"
                >
                  <StepperStatus />
                  <StepperContent>
                    <StepperTitle>Create your first property</StepperTitle>
                    <StepperDescription className="text-neutral-500 dark:text-neutral-400">
                      Start by listing your property on Keyhole.
                    </StepperDescription>
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
                <StepperItem inactive key={crypto.randomUUID()} state="current">
                  <StepperStatus />
                  <StepperContent>
                    <StepperTitle>Add your first rental</StepperTitle>
                    <StepperDescription className="text-neutral-500 dark:text-neutral-400">
                      Next, add the rentals you want to list.
                    </StepperDescription>
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
                <StepperItem inactive key={crypto.randomUUID()} state="default">
                  <StepperStatus />
                  <StepperContent>
                    <StepperTitle>Invite your first tenant</StepperTitle>
                    <StepperDescription>
                      Finally, invite tenants to your rentals.
                    </StepperDescription>
                  </StepperContent>
                </StepperItem>
              </Stepper>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
