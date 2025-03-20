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
  X,
} from "@usekeyhole/nativewind";
import { ScreenShareOff } from "@/components/icons/screen-share-off";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@usekeyhole/web";
import { Crown } from "@/components/icons/crown";
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
  const [stepperDialog, setStepperDialog] = React.useState<boolean>(false);
  const [stepperCompleteDialog, setStepperCompleteDialog] =
    React.useState<boolean>(false);
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
          {/* <AlertDialog open>
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
          </AlertDialog> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <ButtonText>Open Alert Dialog</ButtonText>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-6 gap-4 w-[464px]">
              <AlertDialogHeader className="items-center gap-3">
                <Crown className="size-12 " strokeWidth={0.75} />
                <AlertDialogTitle className="font-extrabold uppercase italic text-center">
                  Add administrators
                </AlertDialogTitle>
                <AlertDialogDescription className="font-normal text-sm text-center">
                  Currently, you are the only admin of the organization.
                  Consider adding additional ones, so they can create and manage
                  properties, run credit checks, invite tenants, oversee
                  onboarding, manage leases, and handle move-outs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <ButtonText>Skip</ButtonText>
                </AlertDialogCancel>
                <AlertDialogAction color={"brand"}>
                  <ButtonText>Add admins</ButtonText>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog open={stepperDialog}>
            <AlertDialogTrigger asChild>
              <Button
                onPress={() => {
                  setStepperDialog(true);
                }}
              >
                <ButtonText>Open Stepper Dialog</ButtonText>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-6 gap-4 w-[512px] rounded-xl">
              <AlertDialogHeader className="gap-3">
                <View className="flex flex-row justify-between items-center">
                  <AlertDialogTitle className="font-bold text-lg">
                    Finish account setup to proceed
                  </AlertDialogTitle>
                  <Button
                    onPress={() => {
                      setStepperDialog(false);
                    }}
                    size={"icon"}
                  >
                    <ButtonIcon>
                      <X />
                    </ButtonIcon>
                  </Button>
                </View>
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full">
                <Stepper card direction="vertical" className="w-full">
                  <StepperItem key={crypto.randomUUID()} state="current">
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
                        Add your first rental
                      </StepperText>
                      <StepperText className="text-neutral-500 dark:text-neutral-400">
                        Next, add the rentals you want to list.
                      </StepperText>
                    </StepperContent>
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
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog open={stepperCompleteDialog}>
            <AlertDialogTrigger asChild>
              <Button
                onPress={() => {
                  setStepperCompleteDialog(true);
                }}
              >
                <ButtonText>Stepper Complete Dialog</ButtonText>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-6 gap-4 w-[512px] rounded-xl">
              <AlertDialogHeader className="gap-3">
                <View className="flex flex-row justify-between items-center">
                  <AlertDialogTitle className="font-bold text-lg">
                    Finish account setup to proceed
                  </AlertDialogTitle>
                  <Button
                    onPress={() => {
                      setStepperCompleteDialog(false);
                    }}
                    size={"icon"}
                  >
                    <ButtonIcon>
                      <X />
                    </ButtonIcon>
                  </Button>
                </View>
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full">
                <Stepper card direction="vertical" className="w-full">
                  <StepperItem key={crypto.randomUUID()} state="completed">
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
                  <StepperItem key={crypto.randomUUID()} state="current">
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
                  <StepperItem key={crypto.randomUUID()} state="default">
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
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      </View>
    </View>
  );
}
