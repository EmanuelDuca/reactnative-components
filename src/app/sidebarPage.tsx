import {
  MenuContent,
  MenuDescription,
  MenuEndAdornment,
  MenuIcon,
  MenuItem,
  MenuLabel,
} from "@/components/navigation-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/sidebar";
import { KeyholeLogo } from "@/components/icons/keyholeLogo";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BadgeText,
  Building,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CircleAlert,
  EllipsisVertical,
  FilePen,
  KeySquare,
  Layers,
  LogOut,
  Megaphone,
  ScanFace,
  toast,
  Toast,
  ToastAction,
  ToastActionGroup,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastTitle,
  User,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { Text, View, useWindowDimensions, useColorScheme } from "react-native";
import { KeyholeIcon } from "@/components/icons/keyholeIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEndAdornment,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@usekeyhole/web";
import { Settings } from "@/components/icons/settings";
import { Globe } from "@/components/icons/globe";
import { Sun } from "@/components/icons/sun";
import { Moon } from "@/components/icons/Moon";
import { SunMoon } from "@/components/icons/Sun-moon";
import {
  Step,
  StepContent,
  StepStatus,
  StepText,
} from "@/components/stepper/step";
import {
  Stepper,
  StepperItem,
  StepperItemProps,
  StepperSeparator,
} from "@/components/stepper/stepper";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerTitle,
} from "@/components/accordion/accordion";

export default function Page() {
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <View className="h-full flex flex-row bg-white dark:bg-black">
      <SidebarSection
        selectedValue={selectedValue}
        handleValueChange={handleValueChange}
      />
      <Content stringText={selectedValue} />
    </View>
  );
}

function SidebarSection({ selectedValue, handleValueChange }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 1000;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const LogoColor = isDarkMode ? "white" : undefined;

  const ItemSquareSmallScrenn = "";

  return (
    <View className="h-full">
      <Sidebar selectedValue={selectedValue} onChange={handleValueChange}>
        <SidebarHeader>
          {isSmallScreen ? (
            <KeyholeIcon color={LogoColor} />
          ) : (
            <KeyholeLogo color={LogoColor} />
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <MenuItem value="Dashboard" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <Layers />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Dashboard</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
            <MenuItem value="Tentants" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <ScanFace />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Tentants screening</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
            {/* Experimental code */}
            <Accordion multiple>
              <AccordionItem value="someID">
                <AccordionTrigger
                  iconClassName="right-3 top-3" /* className="rounded-lg bg-accent p-4 hover:bg-accent active:bg-accent" */
                >
                  {/* <AccordionHeader className="hover:bg-neutral-50 px-3 py-2 active:bg-neutral-50 o">
                    <AccordionIcon className="size-6">
                      <ScanFace />
                    </AccordionIcon>
                    <AccordionTriggerTitle className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                      Tenant screening
                    </AccordionTriggerTitle>
                  </AccordionHeader> */}
                  <MenuItem disabled value={"CreditCheck"}>
                    <MenuIcon>
                      <ScanFace />
                    </MenuIcon>
                    {!isSmallScreen && (
                      <MenuContent>
                        <MenuLabel>Tenant Screening</MenuLabel>
                      </MenuContent>
                    )}
                  </MenuItem>
                </AccordionTrigger>
                <AccordionContent className="gap-1">
                  <MenuItem value={"CreditCheck"}>
                    <View className="size-6" />
                    {!isSmallScreen && (
                      <MenuContent>
                        <MenuLabel>Tenant Screening</MenuLabel>
                      </MenuContent>
                    )}
                  </MenuItem>
                  <MenuItem value={"TenantScreeningPlus"}>
                    <View className="size-6" />

                    {!isSmallScreen && (
                      <MenuContent>
                        <MenuLabel>Tenant Screening Plus</MenuLabel>
                      </MenuContent>
                    )}
                  </MenuItem>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <MenuItem value="Leases" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <KeySquare />
              </MenuIcon>
              {!isSmallScreen && (
                <>
                  <MenuContent>
                    <MenuLabel>Leases</MenuLabel>
                  </MenuContent>
                  <MenuEndAdornment>
                    <Badge>
                      <BadgeText>0 Active</BadgeText>
                    </Badge>
                  </MenuEndAdornment>
                </>
              )}
            </MenuItem>
            <MenuItem value="Claims" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <FilePen />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Claims</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
            <MenuItem value="Building" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <Building />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Building</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
          </SidebarGroup>

          <SidebarGroup align="end">
            <MenuItem value="MarketingHub" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <Megaphone />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Marketing hub</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuItem value="MartKingisepp">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                {!isSmallScreen && (
                  <>
                    <MenuContent>
                      <MenuLabel>Mart Kingisepp</MenuLabel>
                      <MenuDescription>
                        {"[NORWAY] Mate Rentals A/S"}
                      </MenuDescription>
                    </MenuContent>
                    <MenuEndAdornment>
                      <MenuIcon>
                        <EllipsisVertical />
                      </MenuIcon>
                    </MenuEndAdornment>
                  </>
                )}
              </MenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={"right"}
              onValueChange={() => {}}
              className="w-64"
            >
              <DropdownMenuItem value="workspace-settings">
                <DropdownMenuIcon>
                  <Settings />
                </DropdownMenuIcon>
                <DropdownMenuItemText>Workspace settings</DropdownMenuItemText>
                <DropdownMenuEndAdornment>
                  <Badge variant="secondary" size="small">
                    <BadgeText>Admin</BadgeText>
                  </Badge>
                </DropdownMenuEndAdornment>
              </DropdownMenuItem>
              <DropdownMenuItem value="user-settings">
                <DropdownMenuIcon>
                  <User />
                </DropdownMenuIcon>
                <DropdownMenuItemText>User settings</DropdownMenuItemText>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Globe />
                  <DropdownMenuItemText>Language</DropdownMenuItemText>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-36">
                  <DropdownMenuItem value="EN">
                    <DropdownMenuItemText>English</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <Badge variant="secondary" size="small">
                        <BadgeText>EN</BadgeText>
                      </Badge>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="DA">
                    <DropdownMenuItemText>Danish</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <Badge variant="secondary" size="small">
                        <BadgeText>DA</BadgeText>
                      </Badge>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="NO">
                    <DropdownMenuItemText>Norwegian</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <Badge variant="secondary" size="small">
                        <BadgeText>NO</BadgeText>
                      </Badge>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun />
                  <DropdownMenuItemText>Theme</DropdownMenuItemText>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-36">
                  <DropdownMenuItem value="light">
                    <DropdownMenuItemText>Light</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <DropdownMenuIcon>
                        <Sun />
                      </DropdownMenuIcon>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="dark">
                    <DropdownMenuItemText>Dark</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <DropdownMenuIcon>
                        <Moon />
                      </DropdownMenuIcon>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="system">
                    <DropdownMenuItemText>System</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <DropdownMenuIcon>
                        <SunMoon />
                      </DropdownMenuIcon>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem value="log-out">
                <DropdownMenuIcon>
                  <LogOut />
                </DropdownMenuIcon>
                <DropdownMenuItemText>Log out</DropdownMenuItemText>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </View>
  );
}

const array = [
  {
    label: "Email address",
    description: "Verify your email for seamless communication",
  },
  {
    label: "Your profile",
    description: "Add details for a personal touch in your account",
  },
  {
    label: "Company profile",
    description: "Add details to meet compliance requirements",
  },
  {
    label: "Administrators",
    description: "Add people to act on behalf of your organization",
  },
  {
    label: "Bank account",
    description: "Add banking details for transactions",
  },
];

const states: StepperItemProps["state"][] = [
  "default",
  "current",
  "partialComplete",
  "completed",
  "failed",
];

function Content({ stringText }) {
  const addToast = () => {
    toast.add({
      type: "error",
      title: "Error Title",
      description: "Description",
    });
  };

  return (
    <View className="w-full gap-3 p-8 dark:bg-neutral-950">
      <View className="w-1/3">
        <Toast color="red">
          <ToastContent>
            <ToastTitle>Test</ToastTitle>
            <ToastIcon>
              <CircleAlert />
            </ToastIcon>
            <ToastDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              adipisci minima corporis harum est atque voluptatum suscipit quia
              nostrum!.
            </ToastDescription>
            <ToastActionGroup>
              <ToastAction
                onPress={() => {
                  console.log("Button was pressed");
                }}
                primary
              >
                {" "}
                Primary
              </ToastAction>
              <ToastAction
                onPress={() => {
                  console.log("Button was pressed");
                }}
              >
                Secondary
              </ToastAction>
            </ToastActionGroup>
            <ToastClose />
          </ToastContent>
        </Toast>
      </View>
      {/* <Stepper direction="vertical">
        {array.map((item, index) => (
          <>
            <StepperItem
              key={crypto.randomUUID()}
              state={index == 0 ? "current" : "default"}
            >
              <StepStatus />
              <StepContent>
                <StepText className="font-semibold">{item.label}</StepText>
                <StepText className="text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </StepText>
              </StepContent>
            </StepperItem>
            {index != array.length - 1 && <StepperSeparator />}
          </>
        ))}
      </Stepper>
      <View className="h-6"></View>
      <Stepper>
        {array.map((item, index) => (
          <>
            <StepperItem key={crypto.randomUUID()} state={"current"}>
              <StepStatus />
              <StepContent>
                <StepText className="font-semibold">{item.label}</StepText>
                <StepText className="text-neutral-500 dark:text-neutral-400">
                  Description
                </StepText>
                <StepText className="text-neutral-500 dark:text-neutral-400">
                  Description
                </StepText>
              </StepContent>
            </StepperItem>
            {index != array.length - 1 && <StepperSeparator />}
          </>
        ))}
      </Stepper> */}
    </View>
  );
}
