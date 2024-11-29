import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button, ButtonText } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEndAdornment,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu/dropdownMenu";
import WelcomeEmail from "@/components/emailLayout/email";
import YelpRecentLoginEmail from "@/components/emailLayout/emailReactExample";
import {
  Badge,
  BadgeText,
  Layers,
  Layers3,
  LogOut,
  MenuContent,
  MenuDescription,
  MenuEndAdornment,
  MenuIcon,
  MenuItem,
  MenuLabel,
  User,
} from "@usekeyhole/nativewind";
import { ChevronLeftIcon } from "@usekeyhole/ui";
import {
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@usekeyhole/web";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  function handleChange(value: string) {
    console.log(value);
  }
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-row items-center gap-4 text-center">
            {/* <DropdownMenu>
              <DropdownMenuTrigger>Open</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <DropdownMenu onValueChange={() => {}}>
              <DropdownMenuTrigger>
                <Text className="text-foreground">Trigger</Text>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/*  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem value="/dashboard">
                  <DropdownMenuIcon>
                    <User />
                  </DropdownMenuIcon>
                  <DropdownMenuItemText>
                    Workspace settings
                  </DropdownMenuItemText>
                  <DropdownMenuEndAdornment>
                    <Badge variant="secondary">
                      <BadgeText>Admin</BadgeText>
                    </Badge>
                  </DropdownMenuEndAdornment>
                </DropdownMenuItem>
                <DropdownMenuItem value="/dashboard">
                  <DropdownMenuIcon>
                    <User />
                  </DropdownMenuIcon>
                  <DropdownMenuItemText>User settings</DropdownMenuItemText>
                </DropdownMenuItem>
                <DropdownMenuItem value="/dashboard">
                  <DropdownMenuIcon>
                    <LogOut />
                  </DropdownMenuIcon>
                  <DropdownMenuItemText>Log out</DropdownMenuItemText>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu active="light" onValueChange={handleChange}>
              <DropdownMenuTrigger>
                <Text className="text-foreground">Theme</Text>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                {/*  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem value="light">
                  <DropdownMenuItemText>Light</DropdownMenuItemText>
                  <DropdownMenuEndAdornment>
                    <Layers />
                  </DropdownMenuEndAdornment>
                </DropdownMenuItem>
                <DropdownMenuItem value="dark">
                  <DropdownMenuItemText>Dark</DropdownMenuItemText>
                  <DropdownMenuEndAdornment>
                    <Layers />
                  </DropdownMenuEndAdornment>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu onValueChange={() => {}}>
              <DropdownMenuTrigger variant={"clear"}>
                <Layers />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/*  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem value="/dashboard">
                  <DropdownMenuIcon>
                    <User />
                  </DropdownMenuIcon>
                  <DropdownMenuItemText>
                    Workspace settings
                  </DropdownMenuItemText>
                  <DropdownMenuEndAdornment>
                    <Badge variant="secondary">
                      <BadgeText>Admin</BadgeText>
                    </Badge>
                  </DropdownMenuEndAdornment>
                </DropdownMenuItem>
                <DropdownMenuSub onValueChange={() => {}}>
                  <DropdownMenuSubTrigger>
                    <View className="flex flex-row gap-2 py-1.5 px-2">
                      <User />
                      <Text>User Settings</Text>
                    </View>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent side="right">
                    <DropdownMenuItem value="">
                      <DropdownMenuItemText>SomeText</DropdownMenuItemText>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem value="/dashboard">
                  <DropdownMenuIcon>
                    <LogOut />
                  </DropdownMenuIcon>
                  <DropdownMenuItemText>Log out</DropdownMenuItemText>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </View>
        </View>
      </View>
    </View>
  );
}
