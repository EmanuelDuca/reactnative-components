import { View, Text } from "react-native";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbText,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbIcon,
} from "@/components/breadcrumb/breadcrumb";
import { Building } from "@usekeyhole/nativewind";
import { usePathname } from "expo-router";

export default function BreadcrumbSettings() {
  const pathname = usePathname();
  return (
    <View>
      <Text>Breadcrumb Settings</Text>
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
              <BreadcrumbItem value="/breadcrumb">
                <BreadcrumbIcon>
                  <Building />
                </BreadcrumbIcon>
                <BreadcrumbText>Home</BreadcrumbText>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem value="/breadcrumb/settings">
                <BreadcrumbIcon></BreadcrumbIcon>
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
