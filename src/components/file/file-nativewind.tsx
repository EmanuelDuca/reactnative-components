import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Pressable, PressableProps, View, ViewProps } from "react-native";
import { useControllableState } from "@usekeyhole/hooks";
import { cn } from "@usekeyhole/utils";
import { Text, TextProps } from "../text";

/* -------------------------------------------------------------------------------------------------
 * File
 * -----------------------------------------------------------------------------------------------*/

const FileContext = React.createContext<{
  hovered: boolean;
  size: VariantProps<typeof fileVariants>["size"];
  variant: VariantProps<typeof fileVariants>["variant"];
}>({ hovered: false, size: "base", variant: "default" });

const fileVariants = cva("bg-background flex-1 rounded-xl border", {
  variants: {
    variant: {
      default: " border-border",
      destructive: "border-destructive border-dashed",
      failed: "ring-offset ring-destructive-soft border-destructive ring-2",
      uploading: "border-primary",
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
      className: "bg-accent/light-50",
    },
    // Destructive
    {
      variant: "destructive",
      hovered: false,
      className: "bg-destructive-soft",
    },
    {
      variant: "destructive",
      hovered: true,
      className: "bg-background",
    },
    // Failed
    {
      variant: "failed",
      hovered: true,
      className: "bg-background",
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
});

type FileProps = PressableProps &
  VariantProps<typeof fileVariants> & {
    disabled?: boolean;
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
  onPress?: () => void;
};

const FileIcon = React.forwardRef<View, FileIconProps>(
  ({ className, children, onPress, ...props }, ref) => {
    const { size } = React.useContext(FileContext);
    const sizeClassName = size == "large" ? "size-8" : undefined;
    if (children) {
      return React.cloneElement(children, {
        ref: ref,
        className: cn("stroke-accent-foreground", sizeClassName, className),
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

const fileLabelVariants = cva("text-accent-foreground text-sm font-semibold", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      failed: "text-destructive",
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
});

type FileLabelProps = TextProps;

const FileLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  FileLabelProps
>(({ className, ...props }, ref) => {
  const { size, variant } = React.useContext(FileContext);

  return (
    <Text
      ref={ref}
      className={cn(fileLabelVariants({ size, variant }), className)}
      {...props}
    />
  );
});
FileLabel.displayName = "FileLabel";

/* -------------------------------------------------------------------------------------------------
 * FileDescription
 * -----------------------------------------------------------------------------------------------*/

const fileDescriptionVariants = cva("text-muted-foreground text-sm", {
  variants: {
    size: {
      base: "",
      large: "text-center",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type FileDescriptionProps = TextProps;

const FileDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  FileDescriptionProps
>(({ className, ...props }, ref) => {
  const { size } = React.useContext(FileContext);
  return (
    <Text
      ref={ref}
      className={cn(fileDescriptionVariants({ size }), className)}
      {...props}
    />
  );
});
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
