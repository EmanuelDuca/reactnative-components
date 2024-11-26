import { Building } from "@usekeyhole/nativewind";
import * as React from "react";
import { Text, View, ViewComponent } from "react-native";
import {
  Breadcrumb,
  BreadcrumbIcon,
  BreadcrumbItem,
  BreadcrumbText,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/breadcrumb/breadcrumb";
import { usePathname } from "expo-router";
import { Home } from "@/components/icons/home";

export default function Page() {
  const pathname = usePathname();
  return (
    <View>
      <Text>Breadcrumb Index</Text>
      <Text>URL: {pathname}</Text>
      <Content />
    </View>
  );
}

function Content() {
  return (
    <View className="flex-1 p-20">
      <View className="flex flex-row w-fit gap-3">
        <View>
          <Breadcrumb value="" onChange={() => {}}>
            <BreadcrumbList>
              <BreadcrumbItem href="/breadcrumb">
                <BreadcrumbIcon>
                  <Building />
                </BreadcrumbIcon>
                <BreadcrumbText>Home</BreadcrumbText>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/breadcrumb/settings">
                <BreadcrumbIcon>
                  <Home />
                </BreadcrumbIcon>
                <BreadcrumbText>Settings</BreadcrumbText>
              </BreadcrumbItem>
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
