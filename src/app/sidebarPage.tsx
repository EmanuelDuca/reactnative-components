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
  LogOut,
  Megaphone,
  ScanFace,
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuItem value="MartKingisepp">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
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
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={"right"}
              onValueChange={() => {}}
              className="w-64"
            >
              <DropdownMenuItem value="workspace-settings">
                <DropdownMenuIcon>
                  <Settings />
                </DropdownMenuIcon>
                <DropdownMenuItemText>Workspace settings</DropdownMenuItemText>
                <DropdownMenuEndAdornment>
                  <Badge variant="secondary" size="small">
                    <BadgeText>Admin</BadgeText>
                  </Badge>
                </DropdownMenuEndAdornment>
              </DropdownMenuItem>
              <DropdownMenuItem value="user-settings">
                <DropdownMenuIcon>
                  <User />
                </DropdownMenuIcon>
                <DropdownMenuItemText>User settings</DropdownMenuItemText>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Globe />
                  <DropdownMenuItemText>Language</DropdownMenuItemText>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-36">
                  <DropdownMenuItem value="EN">
                    <DropdownMenuItemText>English</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <Badge variant="secondary" size="small">
                        <BadgeText>EN</BadgeText>
                      </Badge>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="DA">
                    <DropdownMenuItemText>Danish</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <Badge variant="secondary" size="small">
                        <BadgeText>DA</BadgeText>
                      </Badge>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="NO">
                    <DropdownMenuItemText>Norwegian</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <Badge variant="secondary" size="small">
                        <BadgeText>NO</BadgeText>
                      </Badge>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun />
                  <DropdownMenuItemText>Theme</DropdownMenuItemText>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-36">
                  <DropdownMenuItem value="light">
                    <DropdownMenuItemText>Light</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <DropdownMenuIcon>
                        <Sun />
                      </DropdownMenuIcon>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="dark">
                    <DropdownMenuItemText>Dark</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <DropdownMenuIcon>
                        <Moon />
                      </DropdownMenuIcon>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                  <DropdownMenuItem value="system">
                    <DropdownMenuItemText>System</DropdownMenuItemText>
                    <DropdownMenuEndAdornment>
                      <DropdownMenuIcon>
                        <SunMoon />
                      </DropdownMenuIcon>
                    </DropdownMenuEndAdornment>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem value="log-out">
                <DropdownMenuIcon>
                  <LogOut />
                </DropdownMenuIcon>
                <DropdownMenuItemText>Log out</DropdownMenuItemText>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
