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
import { KeyholeLogo } from "@/components/two-column-layout/keyholeLogo";
import {
  Avatar,
  AvatarFallback,
  Badge,
  BadgeText,
  Building,
  EllipsisVertical,
  FilePen,
  KeySquare,
  Layers,
  Megaphone,
  ScanFace,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";

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

function SidebarSection({ selectedValue, handleValueChange }) {
  return (
    <View className="h-full w-80">
      <Sidebar selectedValue={selectedValue} onChange={handleValueChange}>
        <SidebarHeader>
          <KeyholeLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <MenuItem value="Dashboard">
              <MenuIcon>
                <Layers />
              </MenuIcon>
              <MenuContent>
                <MenuLabel>Dashboard</MenuLabel>
              </MenuContent>
            </MenuItem>
            <MenuItem value="Tentants">
              <MenuIcon>
                <ScanFace />
              </MenuIcon>
              <MenuContent>
                <MenuLabel>Tentants screening</MenuLabel>
              </MenuContent>
            </MenuItem>
            <MenuItem value="Leases">
              <MenuIcon>
                <KeySquare />
              </MenuIcon>
              <MenuContent>
                <MenuLabel>Leases</MenuLabel>
              </MenuContent>
              <MenuEndAdornment>
                <Badge>
                  <BadgeText>0 Active</BadgeText>
                </Badge>
              </MenuEndAdornment>
            </MenuItem>
            <MenuItem value="Claims">
              <MenuIcon>
                <FilePen />
              </MenuIcon>
              <MenuContent>
                <MenuLabel>Claims</MenuLabel>
              </MenuContent>
            </MenuItem>
            <MenuItem value="Building">
              <MenuIcon>
                <Building />
              </MenuIcon>
              <MenuContent>
                <MenuLabel>Building</MenuLabel>
              </MenuContent>
            </MenuItem>
          </SidebarGroup>

          <SidebarGroup align="end">
            <MenuItem value="MarketingHub">
              <MenuIcon>
                <Megaphone />
              </MenuIcon>
              <MenuContent>
                <MenuLabel>Marketing hub</MenuLabel>
              </MenuContent>
            </MenuItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <MenuItem value="MartKingisepp">
            <Avatar>
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <MenuContent>
              <MenuLabel>Mart Kingisepp</MenuLabel>
              <MenuDescription>{"[NORWAY] Mate Rentals A/S"}</MenuDescription>
            </MenuContent>
            <MenuEndAdornment>
              <MenuIcon>
                <EllipsisVertical />
              </MenuIcon>
            </MenuEndAdornment>
          </MenuItem>
        </SidebarFooter>
      </Sidebar>
    </View>
  );
}

function Content({ stringText }) {
  return (
    <View className="flex">
      <Text className="p-10">{stringText} Content</Text>
    </View>
  );
}
