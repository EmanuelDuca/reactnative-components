import React from "react";
import { ScrollView, View } from "react-native";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/K-dark-mode/command";
import {
  Button,
  ButtonText,
  Calendar,
  CircleAlert,
  File,
  Settings,
  User,
} from "@usekeyhole/nativewind";
import { SignupBusinessCompanyProfileForm } from "~/components/K-dark-mode/signup-business-company-profile-form";

export default function TestPage() {
  const handleSubmit = async (data: any) => {
    alert("Form submitted:\n" + JSON.stringify(data, null, 2));
  };

  return (
    <View className="bg-background w-full h-full">
      <ScrollView>
        <View className="h-fit w-1/2 p-6 gap-2">
          <SignupBusinessCompanyProfileForm />
        </View>
        <View className="h-full w-full p-6 gap-3">
          <View className="h-[1px] w-full bg-black" />
          <View className="h-fit">
            <CommandExample />
          </View>
          <View>
            <Dialog />
          </View>
          <View>
            <Advanced />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export const addresses = [
  { address: "Tööstuse 47D-21, Tallinn, 10913", id: "321-432-431" },
  { address: "Tööstuse 47D-22, Tallinn, 10913", id: "321-432-432" },
  { address: "Tööstuse 47D-23, Tallinn, 10913", id: "321-432-433" },
  { address: "Tööstuse 47D-24, Tallinn, 10913", id: "321-432-434" },
  { address: "Tööstuse 47D-25, Tallinn, 10913", id: "321-432-435" },
  { address: "Tööstuse 47D-26, Tallinn, 10913", id: "321-432-436" },
  { address: "Tööstuse 47D-27, Tallinn, 10913", id: "321-432-437" },
  { address: "Tööstuse 47D-28, Tallinn, 10913", id: "321-432-438" },
  { address: "Tööstuse 47D-29, Tallinn, 10913", id: "321-432-439" },
  { address: "Tööstuse 47D-30, Tallinn, 10913", id: "321-432-440" },
];

function AdvancedContent() {
  return (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <File className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <File className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <File className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

function CommandExample() {
  return (
    <>
      <Command className="w-[600px] rounded-lg border border-border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>
            <CircleAlert className="h-8 w-8" /> No results found.
          </CommandEmpty>
          <CommandGroup heading="My Rentals">
            {addresses.map((address) => (
              <CommandItem key={address.id} className="justify-between">
                <span>{address.address}</span>
                <span className="bold">({address.id})</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}

function Dialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <ButtonText>Open Dialog</ButtonText>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <AdvancedContent />
      </CommandDialog>
    </>
  );
}

function Advanced() {
  return (
    <Command className="rounded-lg border shadow-md">
      <AdvancedContent />
    </Command>
  );
}
