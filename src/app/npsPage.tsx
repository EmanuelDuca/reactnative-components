import {
  MenuContent,
  MenuDescription,
  MenuEndAdornment,
  MenuIcon,
  MenuItem,
  MenuLabel,
} from "@/components/navigation-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/sidebar";
import { KeyholeLogo } from "@/components/icons/keyholeLogo";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BadgeText,
  Building,
  Button,
  ButtonText,
  EllipsisVertical,
  FilePen,
  KeySquare,
  Layers,
  LogOut,
  Megaphone,
  ScanFace,
  TwoColumnLayout,
  TwoColumnLayoutActions,
  TwoColumnLayoutContent,
  TwoColumnLayoutFooter,
  TwoColumnLayoutHeader,
  TwoColumnLayoutPrimaryColumn,
  User,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View, useWindowDimensions, useColorScheme } from "react-native";
import { KeyholeIcon } from "@/components/icons/keyholeIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEndAdornment,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@usekeyhole/web";
import { Settings } from "@/components/icons/settings";
import { Globe } from "@/components/icons/globe";
import { Sun } from "@/components/icons/sun";
import { Moon } from "@/components/icons/Moon";
import { SunMoon } from "@/components/icons/Sun-moon";

export default function Page() {
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <View className="h-full flex flex-row bg-white dark:bg-black">
      <SidebarSection
        selectedValue={selectedValue}
        handleValueChange={handleValueChange}
      />
      <Content stringText={selectedValue} />
    </View>
  );
}

type NpsFormLayoutProps = TwoColumnLayoutProps;

const NpsFormLayout = React.forwardRef<View, NpsFormLayoutProps>(
  ({ children, ...props }, ref) => {
    const { t } = useLocalizationContext();
    return (
      <TwoColumnLayout ref={ref} {...props}>
        <TwoColumnLayoutPrimaryColumn>
          <TwoColumnLayoutHeader>
            <Link href="/login" replace>
              <KeyholeLogo />
            </Link>
            <TwoColumnLayoutActions>
              <LocaleSelector />
            </TwoColumnLayoutActions>
          </TwoColumnLayoutHeader>
          <TwoColumnLayoutContent className="mx-auto lg:w-[420px] max-w-[420px]">
            {children}
          </TwoColumnLayoutContent>
          <TwoColumnLayoutFooter>
            <Link href="https://usekeyhole.com/da-dk/" target="_blank" asChild>
              <Button
                onPress={() => {
                  Linking.openURL("https://usekeyhole.com/da-dk/");
                }}
              >
                <ButtonText> {t("label_go_to")} usekeyhole.com</ButtonText>
              </Button>
            </Link>
          </TwoColumnLayoutFooter>
        </TwoColumnLayoutPrimaryColumn>
      </TwoColumnLayout>
    );
  }
);

function Content({ stringText }) {
  return (
    <View className="flex gap-3">
      <Text className="p-10">{stringText} Content</Text>
    </View>
  );
}
