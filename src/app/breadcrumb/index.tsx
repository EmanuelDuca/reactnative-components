import {
  Building,
  Button,
  ButtonIcon,
  EllipsisVertical,
  Layers,
  Star,
  User,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { Text, View, ViewComponent } from "react-native";
import {
  Breadcrumb,
  BreadcrumbIcon,
  BreadcrumbItem,
  BreadcrumbText,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/breadcrumb/breadcrumb";
import { Href, router, usePathname } from "expo-router";
import { Home } from "@/components/icons/home";
import { Ellipsis } from "@/components/icons/ellipsis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu/dropdownMenuV2";

export default function Page() {
  const pathname = usePathname();
  return (
    <View className="bg-white flex min-h-dvh">
      <Text>Breadcrumb Index</Text>
      <Text>URL: {pathname}</Text>
      <Content />
    </View>
  );
}

function Content() {
  const [selectedValue, setSelectedValue] =
    React.useState<string>("/breadcrumb");
  function NavigateTo(value: string) {
    setSelectedValue(value);
    router.push(value as Href<string>);
  }

  function dropdownMenuFunction(value: string) {
    console.log(value);
    router.push(value as Href<string>);
  }
  return (
    <View className="flex-1 p-20 bg-white w-full">
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
                <DropdownMenuContent onValueChange={dropdownMenuFunction}>
                  <DropdownMenuItem value="/breadcrumb/settings">
                    <DropdownMenuIcon>
                      <User />
                    </DropdownMenuIcon>

                    <DropdownMenuItemText>User Settings</DropdownMenuItemText>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="/breadcrumb/othersettings">
                    <DropdownMenuIcon>
                      <Layers />
                    </DropdownMenuIcon>
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
