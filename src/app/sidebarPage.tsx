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
  EllipsisVertical,
  FilePen,
  KeySquare,
  Layers,
  Megaphone,
  ScanFace,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View, useWindowDimensions, useColorScheme } from "react-native";
import { KeyholeIcon } from "@/components/icons/keyholeIcon";

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
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 1000;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const LogoColor = isDarkMode ? "white" : undefined;

  const ItemSquareSmallScrenn = "";

  return (
    <View className="h-full">
      <Sidebar selectedValue={selectedValue} onChange={handleValueChange}>
        <SidebarHeader>
          {isSmallScreen ? (
            <KeyholeIcon color={LogoColor} />
          ) : (
            <KeyholeLogo color={LogoColor} />
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <MenuItem value="Dashboard" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <Layers />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Dashboard</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
            <MenuItem value="Tentants" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <ScanFace />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Tentants screening</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
            <MenuItem value="Leases" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <KeySquare />
              </MenuIcon>
              {!isSmallScreen && (
                <>
                  <MenuContent>
                    <MenuLabel>Leases</MenuLabel>
                  </MenuContent>
                  <MenuEndAdornment>
                    <Badge>
                      <BadgeText>0 Active</BadgeText>
                    </Badge>
                  </MenuEndAdornment>
                </>
              )}
            </MenuItem>
            <MenuItem value="Claims" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <FilePen />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Claims</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
            <MenuItem value="Building" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <Building />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Building</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
          </SidebarGroup>

          <SidebarGroup align="end">
            <MenuItem value="MarketingHub" className={ItemSquareSmallScrenn}>
              <MenuIcon>
                <Megaphone />
              </MenuIcon>
              {!isSmallScreen && (
                <MenuContent>
                  <MenuLabel>Marketing hub</MenuLabel>
                </MenuContent>
              )}
            </MenuItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <MenuItem value="MartKingisepp">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            {!isSmallScreen && (
              <>
                <MenuContent>
                  <MenuLabel>Mart Kingisepp</MenuLabel>
                  <MenuDescription>
                    {"[NORWAY] Mate Rentals A/S"}
                  </MenuDescription>
                </MenuContent>
                <MenuEndAdornment>
                  <MenuIcon>
                    <EllipsisVertical />
                  </MenuIcon>
                </MenuEndAdornment>
              </>
            )}
          </MenuItem>
        </SidebarFooter>
      </Sidebar>
    </View>
  );
}

function Content({ stringText }) {
  return (
    <View className="flex gap-3">
      <Text className="p-10">{stringText} Content</Text>
    </View>
  );
}
