import {
  Building,
  Button,
  ButtonIcon,
  Ellipsis,
  Layers,
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
    <View className="bg-white">
      <Text>Other Settings</Text>
      <Text>URL: {pathname}</Text>
      <Content />
    </View>
  );
}

function Content() {
  const [selectedValue, setSelectedValue] = React.useState<string>(
    "/breadcrumb/othersettings"
  );
  function NavigateTo(href: string) {
    setSelectedValue(href);
    router.push(href as Href<string>);
  }
  function dropdownMenuFunction(href: string) {
    console.log(href);
    router.push(href as Href<string>);
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
