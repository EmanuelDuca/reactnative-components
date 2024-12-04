import { View, Text } from "react-native";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbText,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbIcon,
  BreadcrumbEllipsis,
} from "@/components/breadcrumb/breadcrumb";
import {
  Building,
  Button,
  ButtonIcon,
  Ellipsis,
  Layers,
  User,
} from "@usekeyhole/nativewind";
import { Href, router, usePathname } from "expo-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu/dropdownMenuV2";
import React from "react";
import { Home } from "@/components/icons/home";

export default function Page() {
  const pathname = usePathname();
  return (
    <View className="bg-white">
      <Text>User Setting</Text>
      <Text>URL: {pathname}</Text>
      <Content />
    </View>
  );
}

function Content() {
  const [selectedValue, setSelectedValue] = React.useState<string>(
    "/breadcrumb/settings"
  );
  function NavigateTo(value: string) {
    setSelectedValue(value);
    router.push(value as Href<string>);
  }
  function dropdownMenuFunction(value: string) {
    console.log(value);
    router.push(value as Href<string>);
  }
  return (
    <View className="flex-1 p-20">
      <View className="flex flex-row w-fit gap-3">
        <View>
          <Breadcrumb value={selectedValue} onChange={NavigateTo}>
            <BreadcrumbList>
              <BreadcrumbItem href="/breadcrumb">
                <BreadcrumbIcon>
                  <Building />
                </BreadcrumbIcon>
                <BreadcrumbText>Home</BreadcrumbText>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BreadcrumbItem href="/breadcrumb/settings">
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  active={selectedValue}
                  onValueChange={dropdownMenuFunction}
                >
                  <DropdownMenuItem value="/breadcrumb/settings">
                    <User />
                    <DropdownMenuItemText>User Settings</DropdownMenuItemText>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="/breadcrumb/othersettings">
                    <Layers />
                    <DropdownMenuItemText>Other Settings</DropdownMenuItemText>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <BreadcrumbSeparator />
              <BreadcrumbItem href={"/breadcrumb/user"}>
                <BreadcrumbText>User</BreadcrumbText>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </View>
      </View>
    </View>
  );
}
