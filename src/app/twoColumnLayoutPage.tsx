import { Popover } from "@usekeyhole/web";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDown,
  KeySquare,
  Star,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Image, Text, View, ViewComponent } from "react-native";
import { Table } from "@/components/table";
import {
  TwoColumnLayoutContent,
  TwoColumnLayoutFooter,
  TwoColumnLayoutHeader,
  TwoColumnLayoutImage,
  TwoColumnLayoutPrimaryColumn,
  TwoColumnLayoutSecondaryColumn,
  TwoColumnLayout,
  TwoColumnLayoutHeaderActions,
} from "@/components/two-column-layout/two-column-layout";
import LoginForm from "@/components/login-form";
import { AvatarIcon, KeyGraphic, KeyholeIconPattern } from "@usekeyhole/ui";
import ImagesDenamrk from "@/components/two-column-layout/imagesDenmark";
import { KeyholeIcon } from "@/icons/keyhole-icon";
import { KeyholeLogo } from "@/icons/keyhole-logo";
/* import { Table } from "@/components/table"; */

export default function Page() {
  return (
    <View className="flex flex-1 bg-white">
      <Content />
    </View>
  );
}

function Content() {
  // const options = useGuaranteeStatusFilters();
  // const [columnFilters, setColumnFilters] = React.useState<any>([]);

  return (
    <View className=" flex-1 dark:bg-black">
      <TwoColumnLayout>
        <TwoColumnLayoutSecondaryColumn>
          <View className="h-full w-full bg-brand-300"></View>
        </TwoColumnLayoutSecondaryColumn>

        <TwoColumnLayoutPrimaryColumn>
          <TwoColumnLayoutHeader>
            <KeyholeLogo color={"#039393"} />
            <TwoColumnLayoutHeaderActions>
              <View className="flex flex-row items-center gap-3">
                <Text className="text-sm font-semibold ">No acount?</Text>
                <Button variant="brand">
                  <ButtonText>SignUp</ButtonText>
                </Button>
              </View>
              <Button>
                <ButtonText>EN</ButtonText>
                <ButtonIcon>
                  <ChevronDown />
                </ButtonIcon>
              </Button>
            </TwoColumnLayoutHeaderActions>
          </TwoColumnLayoutHeader>
          <TwoColumnLayoutContent>
            <LoginForm />
          </TwoColumnLayoutContent>
          <TwoColumnLayoutFooter>
            <Button>
              <ButtonText>Go to usekeyhole.com</ButtonText>
            </Button>
          </TwoColumnLayoutFooter>
        </TwoColumnLayoutPrimaryColumn>
      </TwoColumnLayout>
    </View>
  );
}
