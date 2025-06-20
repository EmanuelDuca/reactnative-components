import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import {
  Pressable,
  PressableProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { useControllableState } from "@usekeyhole/hooks";
import { cn } from "@usekeyhole/utils";
import { Button } from "@usekeyhole/nativewind";

/* -------------------------------------------------------------------------------------------------
 * File
 * -----------------------------------------------------------------------------------------------*/

const FileContext = React.createContext<{
  hovered: boolean;
  size: VariantProps<typeof fileVariants>["size"];
  variant: VariantProps<typeof fileVariants>["variant"];
}>({ hovered: false, size: "base", variant: "default" });

const fileVariants = cva(
  "flex-1 rounded-xl border bg-white dark:bg-neutral-900",
  {
    variants: {
      variant: {
        default: " border-neutral-200 dark:border-neutral-700",
        destructive: "border-dashed border-red-400 dark:border-red-400",
        failed:
          " ring-offset dark: border-red-800 ring-2 ring-red-400 ring-opacity-50 dark:border-red-300 dark:ring-red-400  ",
        uploading: "border-brand-50 dark:border-brand-900",
      },
      size: {
        base: "flex flex-row items-center gap-3 px-4 py-3 ",
        large: "flex flex-col items-center gap-3 p-8 ",
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      {
        variant: "default",
        hovered: true,
        className: "bg-neutral-50 dark:bg-neutral-800",
      },
      // Destructive
      {
        variant: "destructive",
        hovered: false,
        className: "bg-red-50 dark:bg-red-900",
      },
      {
        variant: "destructive",
        hovered: true,
        className: "bg-white dark:bg-neutral-900",
      },
      // Failed
      {
        variant: "failed",
        hovered: true,
        className: " bg-neutral-50 dark:bg-neutral-800",
      },
      // Large size
      {
        variant: "default",
        size: "large",
        hovered: false,
        className: "border-dashed",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "base",
      hovered: false,
    },
  }
);

type FileProps = PressableProps &
  VariantProps<typeof fileVariants> & {
    disabled?: boolean;
    onHoverIn?: () => void;
    onHoverOut?: () => void;
  };

const File = React.forwardRef<View, FileProps>(
  (
    {
      className,
      size = "base",
      hovered: isHovered,
      variant = "default",
      onHoverIn,
      onHoverOut,
      onPress,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
    });

    return (
      <FileContext.Provider value={{ hovered: !!hovered, size, variant }}>
        <Pressable
          ref={ref}
          className={cn(
            fileVariants({
              hovered,
              size,
              variant,
            }),
            className
          )}
          onHoverIn={(e) => {
            if (!disabled) setHovered(true);
            onHoverIn?.(e);
          }}
          onHoverOut={(e) => {
            if (!disabled) setHovered(false);
            onHoverOut?.(e);
          }}
          onPress={(e) => {
            onPress?.(e);
          }}
          {...props}
        />
      </FileContext.Provider>
    );
  }
);
File.displayName = "File";

/* -------------------------------------------------------------------------------------------------
 * FileIcon
 * -----------------------------------------------------------------------------------------------*/

type FileIconProps = ViewProps & {
  children?: JSX.Element;
};

const FileIcon = React.forwardRef<View, FileIconProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = React.useContext(FileContext);
    const sizeClassName = size == "large" ? "size-8" : undefined;
    if (children) {
      return React.cloneElement(children, {
        ref: ref,
        className: cn(
          "stroke-neutral-700 dark:stroke-neutral-100",
          sizeClassName,
          className
        ),
        ...props,
      });
    } else {
      return <></>;
    }
  }
);
FileIcon.displayName = "FileIcon";

/* -------------------------------------------------------------------------------------------------
 * FileContent
 * -----------------------------------------------------------------------------------------------*/

type FileContentProps = ViewProps;

const FileContent = React.forwardRef<View, FileContentProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} className={cn("flex-1", className)} {...props} />;
  }
);
FileContent.displayName = "FileContent";

/* -------------------------------------------------------------------------------------------------
 * FileLabel
 * -----------------------------------------------------------------------------------------------*/

const fileLabelVariants = cva(
  "text-sm font-semibold text-neutral-800 dark:text-neutral-100",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        failed: "text-red-800 dark:text-red-300",
        uploading: "",
      },
      size: {
        base: "",
        large: "text-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);

type FileLabelProps = TextProps;

const FileLabel = React.forwardRef<Text, FileLabelProps>(
  ({ className, ...props }, ref) => {
    const { size, variant } = React.useContext(FileContext);

    return (
      <Text
        ref={ref}
        className={cn(fileLabelVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);
FileLabel.displayName = "FileLabel";

/* -------------------------------------------------------------------------------------------------
 * FileDescription
 * -----------------------------------------------------------------------------------------------*/

const fileDescriptionVariants = cva(
  "text-sm text-neutral-600 dark:text-neutral-300",
  {
    variants: {
      size: {
        base: "",
        large: "text-center",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
);

type FileDescriptionProps = TextProps;

const FileDescription = React.forwardRef<Text, FileDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = React.useContext(FileContext);
    return (
      <Text
        ref={ref}
        className={cn(fileDescriptionVariants({ size }), className)}
        {...props}
      />
    );
  }
);
FileDescription.displayName = "FileDescription";

/* -------------------------------------------------------------------------------------------------
 * FileButtons
 * -----------------------------------------------------------------------------------------------*/

type FileButtonsProps = ViewProps;

const FileButtons = React.forwardRef<View, FileButtonsProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-row gap-4", className)}
        {...props}
      />
    );
  }
);
FileButtons.displayName = "FileButtons";

/* -------------------------------------------------------------------------------------------------
 * Export Components
 * -----------------------------------------------------------------------------------------------*/

export {
  File,
  FileProps,
  FileIcon,
  FileIconProps,
  FileContent,
  FileContentProps,
  FileLabel,
  FileLabelProps,
  FileDescription,
  FileDescriptionProps,
  FileButtons,
  FileButtonsProps,
};
