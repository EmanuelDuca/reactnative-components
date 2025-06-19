import React from "react";
import { Meta, StoryObj } from "@storybook/react";

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
} from "./command";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { CircleAlert } from "@usekeyhole/nativewind";

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
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
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
            <CreditCard className="mr-2 h-4 w-4" />
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

const meta: Meta<typeof Command> = {
  title: "WEB/Components/Command",
  component: Command,
};

type Story = StoryObj<typeof Command>;

export const Basic: Story = {
  render: () => (
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
  ),
};

export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <AdvancedContent />
        </CommandDialog>
      </>
    );
  },
};

export const Advanced: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <AdvancedContent />
    </Command>
  ),
};

export default meta;
