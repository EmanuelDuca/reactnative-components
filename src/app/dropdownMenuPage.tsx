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
} from "@/components/dropdownMenu/dropdownMenuV2";

import WelcomeEmail from "@/components/emailLayout/email";
import YelpRecentLoginEmail from "@/components/emailLayout/emailReactExample";
import { Badge, BadgeText, LogOut, User } from "@usekeyhole/nativewind";
import * as React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return <Content />;
}
//size="small"

function Content() {
  const [text, setText] = React.useState("Action Name");

  function handleChange(value: string) {
    console.log(value);
    setText(value);
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="py-12 md:py-24 lg:py-32 xl:py-10">
        <View className="px-4 md:px-6 ">
          <View className="flex w-56 rounded-md bg-white p-2 mt-10 mb-2">
            <Text className="flex text-sm text-foreground">{text}</Text>
          </View>
          <View className="flex flex-row items-center gap-4 text-center">
            <Text className="text-foreground">Some random Text</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">
                  <ButtonText>Dropdown Trigger</ButtonText>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                active={text}
                align="end"
                onValueChange={handleChange}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled value="workspace">
                  <DropdownMenuIcon>
                    <User />
                  </DropdownMenuIcon>

                  <DropdownMenuItemText>
                    Workspace settings
                  </DropdownMenuItemText>
                  <DropdownMenuEndAdornment>
                    <Badge variant="secondary" size="small">
                      <BadgeText>badge</BadgeText>
                    </Badge>
                  </DropdownMenuEndAdornment>
                </DropdownMenuItem>
                <DropdownMenuItem value="settings">
                  <DropdownMenuIcon>
                    <User />
                  </DropdownMenuIcon>
                  <DropdownMenuItemText>settings</DropdownMenuItemText>
                  <DropdownMenuEndAdornment>
                    <Badge size="small">
                      <BadgeText>Admin</BadgeText>
                    </Badge>
                  </DropdownMenuEndAdornment>
                </DropdownMenuItem>
                <DropdownMenuItem value="copy">Make a copy</DropdownMenuItem>
                <DropdownMenuItem value="logOut">
                  <DropdownMenuItemText>Log out</DropdownMenuItemText>
                  <DropdownMenuEndAdornment>
                    <DropdownMenuIcon>
                      <LogOut />
                    </DropdownMenuIcon>
                  </DropdownMenuEndAdornment>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem disabled value="workspace">
                      <DropdownMenuIcon>
                        <User />
                      </DropdownMenuIcon>

                      <DropdownMenuItemText>
                        Workspace settings
                      </DropdownMenuItemText>
                      <DropdownMenuEndAdornment>
                        <Badge variant="secondary" size="small">
                          <BadgeText>badge</BadgeText>
                        </Badge>
                      </DropdownMenuEndAdornment>
                    </DropdownMenuItem>
                    <DropdownMenuItem value="settings">
                      <DropdownMenuIcon>
                        <User />
                      </DropdownMenuIcon>
                      <DropdownMenuItemText>settings</DropdownMenuItemText>
                      <DropdownMenuEndAdornment>
                        <Badge size="small">
                          <BadgeText>Admin</BadgeText>
                        </Badge>
                      </DropdownMenuEndAdornment>
                    </DropdownMenuItem>
                    <DropdownMenuItem value="copy">
                      Make a copy
                    </DropdownMenuItem>
                    <DropdownMenuItem value="logOut">
                      <DropdownMenuItemText>Log out</DropdownMenuItemText>
                      <DropdownMenuEndAdornment>
                        <DropdownMenuIcon>
                          <LogOut />
                        </DropdownMenuIcon>
                      </DropdownMenuEndAdornment>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem value="settings">
                          <DropdownMenuIcon>
                            <User />
                          </DropdownMenuIcon>
                          <DropdownMenuItemText>settings</DropdownMenuItemText>
                        </DropdownMenuItem>
                        <DropdownMenuItem value="copy">
                          Make a copy
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem value="logOut2">
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
