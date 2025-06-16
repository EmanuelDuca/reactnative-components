import {
  Button,
  ButtonIcon,
  Check,
  ChevronRight,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  Step,
  StepContent,
  StepEndAdornment,
  StepStatus,
  StepText,
} from "~/components/stepper/step";
import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperItemProps,
  StepperStatus,
  StepperSeparator,
  StepperText,
  StepperEndAdornment,
} from "~/components/stepper/stepper";

export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  return (
    <ScrollView>
      <View className="flex-1 bg-background">
        <View className="py-12 md:py-24 lg:py-32 xl:py-48">
          <View className="px-4 md:px-6">
            {/* <View className="flex gap-2">
              <Step state="completed" card>
                <StepStatus />
                <StepContent className="">
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
              </Step>
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
            </View> */}
            <Stepper card direction="vertical" className="w-full">
              <StepperItem key={"first-stepper-key"} state="completed">
                <StepperStatus className="mt-[2px]" />
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
              <StepperItem key={"second-stepper-key"} state="current">
                <StepperStatus className="mt-[2px]" />
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
              <StepperItem key={"third-stepper-key"} state="default">
                <StepperStatus className="mt-[2px]" />
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
    </ScrollView>
  );
}
