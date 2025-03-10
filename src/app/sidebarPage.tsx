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
  AccordionContentText,
  AccordionDescription,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BadgeText,
  Building,
  Button,
  ButtonText,
  ChevronDown,
  EllipsisVertical,
  FileKey2,
  FilePen,
  KeySquare,
  Layers,
  LoaderCircle,
  LogOut,
  Megaphone,
  ScanFace,
  Star,
  Upload,
  User,
  X,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { Text, View, useWindowDimensions, useColorScheme } from "react-native";
import { KeyholeIcon } from "@/components/icons/keyholeIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Stepper,
  StepperItem,
  StepperItemProps,
  StepperSeparator,
} from "@/components/stepper/stepper";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerTitle,
} from "@/components/accordion/accordion";
import {
  File,
  FileButtons,
  FileContent,
  FileDescription,
  FileIcon,
  FileIconProps,
  FileLabel,
  FileProps,
} from "@/components/file/file-web";
import { IFile } from "@usekeyhole/utils";

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

function SidebarSection({
  selectedValue,
  handleValueChange,
}: {
  selectedValue: string;
  handleValueChange: (text: string) => void;
}) {
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

            {/* Experimental code */}
            <Accordion multiple>
              <AccordionItem value="someID">
                <AccordionTrigger
                  iconClassName="right-3 top-3"
                  className="rounded-lg bg-accent px-4 py-3"
                >
                  <AccordionHeader className="">
                    <AccordionIcon className="size-6">
                      <ScanFace />
                    </AccordionIcon>
                    <AccordionTriggerTitle className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                      Tenant screening
                    </AccordionTriggerTitle>
                  </AccordionHeader>
                </AccordionTrigger>
                <AccordionContent className="gap-1">
                  <MenuItem value={"CreditCheck"}>
                    <View className="size-6" />
                    {!isSmallScreen && (
                      <MenuContent>
                        <MenuLabel>Tenant Screening</MenuLabel>
                      </MenuContent>
                    )}
                  </MenuItem>
                  <MenuItem value={"TenantScreeningPlus"}>
                    <View className="size-6" />

                    {!isSmallScreen && (
                      <MenuContent>
                        <MenuLabel>Tenant Screening Plus</MenuLabel>
                      </MenuContent>
                    )}
                  </MenuItem>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

const array = [
  {
    label: "Email address",
    description: "Verify your email for seamless communication",
  },
  {
    label: "Your profile",
    description: "Add details for a personal touch in your account",
  },
  {
    label: "Company profile",
    description: "Add details to meet compliance requirements",
  },
  {
    label: "Administrators",
    description: "Add people to act on behalf of your organization",
  },
  {
    label: "Bank account",
    description: "Add banking details for transactions",
  },
];

const states: StepperItemProps["state"][] = [
  "default",
  "current",
  "partialComplete",
  "completed",
  "failed",
];

function Content({ stringText }: { stringText: string }) {
  const [files, setFiles] = React.useState<IFile<string | undefined>[]>([]);
  const [fileVariant, setFileVariant] =
    React.useState<Pick<FileProps, "variant">["variant"]>("default");
  const [progress, setProgress] = React.useState(0);
  const [fileStatus, setFileStatus] = React.useState<boolean>(false);
  const [tryNumber, setTryNumber] = React.useState<number>(1);

  const startUpload = () => {
    setFileVariant("uploading");
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 90) {
        clearInterval(interval);
        setTimeout(() => {
          if (number < 3) {
            setFileVariant("failed");
          } else {
            setFileStatus(true);
          }
        }, 1000);
      }
    }, 300);
    const number = tryNumber + 1;
    setTryNumber(number);
  };

  const handleFilesAdded = (addedFiles: IFile<string | undefined>[]) => {
    startUpload();
    console.log(addedFiles.toString);
    setFiles([...files, ...addedFiles]);
  };

  return (
    <View className="flex-1 gap-3 p-8 dark:bg-neutral-950">
      <View className="w-1/2">
        {fileStatus ? (
          <File onFilesAdded={handleFilesAdded}>
            <FileIcon>
              <FilePen />
            </FileIcon>
            <FileContent>
              <FileLabel>Rental Agreement</FileLabel>
              <FileDescription>mentro-rental-agreement.pdf</FileDescription>
            </FileContent>
            <FileButtons>
              <Button size={"sm"}>
                <ButtonText>Add appendix</ButtonText>
              </Button>
            </FileButtons>
            <FileIcon>
              <X />
            </FileIcon>
          </File>
        ) : (
          <>
            {fileVariant == "default" && (
              <File onFilesAdded={handleFilesAdded}>
                <FileIcon>
                  <FileKey2 />
                </FileIcon>
                <FileContent>
                  <FileLabel>Upload document</FileLabel>
                  <FileDescription>
                    Drag and drop or browse from your device.
                  </FileDescription>
                </FileContent>
                <FileIcon>
                  <Upload />
                </FileIcon>
              </File>
            )}
            {fileVariant == "uploading" && (
              <File
                disabled
                onFilesAdded={handleFilesAdded}
                variant="uploading"
                hovered
              >
                <FileIcon>
                  <FileKey2 />
                </FileIcon>
                <FileContent>
                  <FileLabel>Document is uploading</FileLabel>
                  <FileDescription>
                    {progress}% -------------____ 100%
                  </FileDescription>
                </FileContent>
                <FileIcon className="animate-spin">
                  <LoaderCircle />
                </FileIcon>
                {/* <FileButtons>
                <Button >
                  <ButtonText>add file</ButtonText>
                </Button>
              </FileButtons> */}
              </File>
            )}
            {fileVariant == "failed" && (
              <File onFilesAdded={handleFilesAdded} variant="failed">
                <FileIcon>
                  <FileKey2 />
                </FileIcon>
                <FileContent>
                  <FileLabel>Upload document</FileLabel>
                  <FileDescription>
                    Drag and drop or browse from your device.
                  </FileDescription>
                </FileContent>
                <FileIcon>
                  <Upload />
                </FileIcon>
                {/*  <FileButtons>
                <Button>
                  <ButtonText>add file</ButtonText>
                </Button>
              </FileButtons> */}
              </File>
            )}
          </>
        )}
      </View>
      <View className="w-2/3">
        <Accordion multiple>
          {" "}
          {/* Good */}
          <AccordionItem triggerHovered variant="card" value="item1">
            <AccordionTrigger>
              <AccordionHeader>
                <AccordionIcon>
                  <Star className="stroke-foreground" />
                </AccordionIcon>
                <AccordionTriggerTitle>
                  Accordion Trigger 1
                </AccordionTriggerTitle>
                <Badge variant="green" size="small">
                  <BadgeText>New</BadgeText>
                </Badge>
              </AccordionHeader>
              <AccordionDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus iste minus hic adipisci enim rerum error magni,
                soluta accusantium modi pariatur atque nobis perferendis ipsa
                possimus quisquam ullam sint repudiandae!
              </AccordionDescription>
            </AccordionTrigger>
            <AccordionContent>
              <AccordionContentText>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Mollitia, voluptates at sequi tempora iusto ab? Fuga sed,
                nesciunt quibusdam amet ipsam recusandae aspernatur! Quo ab
                distinctio molestiae impedit laudantium sit!
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item2" variant="card">
            <AccordionTrigger>
              <AccordionHeader>
                <AccordionIcon>
                  <Star className="stroke-foreground" />
                </AccordionIcon>
                <AccordionTriggerTitle>
                  Accordion Trigger 2
                </AccordionTriggerTitle>
              </AccordionHeader>
              <AccordionDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus iste minus hic adipisci enim rerum error magni,
                soluta accusantium modi pariatur atque nobis perferendis ipsa
                possimus quisquam ullam sint repudiandae!
              </AccordionDescription>
            </AccordionTrigger>
            <AccordionContent>
              <AccordionContentText>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Mollitia, voluptates at sequi tempora iusto ab? Fuga sed,
                nesciunt quibusdam amet ipsam recusandae aspernatur! Quo ab
                distinctio molestiae impedit laudantium sit!
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item3">
            <AccordionTrigger>
              <AccordionHeader>
                <AccordionIcon>
                  <Star className="stroke-foreground" />
                </AccordionIcon>
                <AccordionTriggerTitle className="flex-1">
                  Accordion Trigger 3
                </AccordionTriggerTitle>
              </AccordionHeader>
              <AccordionDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus iste minus hic adipisci enim rerum error magni,
                soluta accusantium modi pariatur atque nobis perferendis ipsa
                possimus quisquam ullam sint repudiandae!
              </AccordionDescription>
            </AccordionTrigger>
            <AccordionContent>
              <AccordionContentText>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Mollitia, voluptates at sequi tempora iusto ab? Fuga sed,
                nesciunt quibusdam amet ipsam recusandae aspernatur! Quo ab
                distinctio molestiae impedit laudantium sit!
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>
    </View>
  );
}
