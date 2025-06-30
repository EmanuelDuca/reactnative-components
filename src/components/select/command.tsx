import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "@usekeyhole/nativewind";

import { cn } from "@usekeyhole/utils";
import { Dialog, DialogContent } from "./dialog";
import { View, ViewProps } from "react-native";

type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};
CommandDialog.displayName = "CommandDialog";

type CommandLoadingProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Loading
>;

const CommandLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  CommandLoadingProps
>(({ ...props }: CommandLoadingProps, ref) => {
  return <CommandPrimitive.Loading ref={ref} {...props} />;
});

CommandLoading.displayName = CommandPrimitive.Loading.displayName;

type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
> & {
  icon?: React.ElementType;
  wrapperClassName?: string;
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, icon: Icon = Search, wrapperClassName, ...props }, ref) => {
  return (
    <div
      className={cn(
        "border-border flex items-center border-b px-3",
        wrapperClassName
      )}
      cmdk-input-wrapper=""
    >
      <Icon className="stroke-muted-foreground mr-3 h-5 w-5 shrink-0" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 font-sans text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

type CommandListProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
>;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "scrollbar-thin scrollbar-track-background scrollbar-thumb-border max-h-[300px] overflow-y-auto overflow-x-hidden",
      className
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="flex flex-col items-center py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

type CommandGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground border-border overflow-hidden border-t p-2 font-semibold first:border-t-0 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:pl-3 [&_[cmdk-group-heading]]:pr-2 [&_[cmdk-group-heading]]:font-sans [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-semibold",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

type CommandGroupHeadingProps = ViewProps;

const CommandGroupHeading = ({
  className,
  ...props
}: CommandGroupHeadingProps) => {
  return (
    <View
      className={cn(
        "flex flex-row ml-[-28px] gap-2 text-xs font-bold text-foreground",
        className
      )}
      {...props}
    />
  );
};
CommandGroupHeading.displayName = "CommandGroupHeading";

type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("bg-border -mx-1 h-px", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

type CommandItemProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, onSelect, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      { "hover:cursor-pointer": !!onSelect },
      "data-[selected=true]:bg-primary-soft data-[selected=true]:text-foreground relative flex cursor-default select-none items-center rounded-sm py-2 pl-10 pr-2 text-sm font-normal outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    onSelect={onSelect}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

type CommandShortcutProps = React.ComponentPropsWithoutRef<"span">;

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return (
    <span
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandProps,
  CommandDialog,
  CommandDialogProps,
  CommandInput,
  CommandInputProps,
  CommandList,
  CommandListProps,
  CommandLoading,
  CommandLoadingProps,
  CommandEmpty,
  CommandEmptyProps,
  CommandGroup,
  CommandGroupProps,
  CommandGroupHeading,
  CommandGroupHeadingProps,
  CommandItem,
  CommandItemProps,
  CommandShortcut,
  CommandShortcutProps,
  CommandSeparator,
  CommandSeparatorProps,
};
