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
import { Href, router, usePathname } from "expo-router";
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
  const [selectedValue, setSelectedValue] = React.useState<string>();
  function NavigateTo(value: string) {
    setSelectedValue(value);
    router.push(value as Href<string>);
  }
  return (
    <View className="flex-1 p-20">
      <View className="flex flex-row w-fit gap-3">
        <View>
          <Breadcrumb value={selectedValue} onChange={NavigateTo}>
            <BreadcrumbList>
              <BreadcrumbItem value="/breadcrumb">
                <BreadcrumbIcon>
                  <Building />
                </BreadcrumbIcon>
                <BreadcrumbText>Home</BreadcrumbText>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem value="/breadcrumb/settings">
                <BreadcrumbIcon>
                  <Home />
                </BreadcrumbIcon>
                <BreadcrumbText>Settings</BreadcrumbText>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem value={"/breadcrumb/user"}>
                <BreadcrumbText>User</BreadcrumbText>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </View>
      </View>
    </View>
  );
}
