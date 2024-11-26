import { Text, View } from "react-native";
import {
  Breadcrumb,
  BreadcrumbIcon,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbText,
} from "@/components/breadcrumb/breadcrumb";
import { Building } from "@usekeyhole/nativewind";
import { usePathname } from "expo-router";

export default function Page() {
  const pathname = usePathname();
  return (
    <View>
      <Text>Breadcrumb Settings Page</Text>
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
                <BreadcrumbIcon></BreadcrumbIcon>
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
