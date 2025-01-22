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

/* -------------------------------------------------------------------------------------------------
 * File
 * -----------------------------------------------------------------------------------------------*/

const FileContext = React.createContext<{
  hovered: boolean;
  size: VariantProps<typeof fileVariants>["size"];
  variant: VariantProps<typeof fileVariants>["variant"];
}>({ hovered: false, size: "base", variant: "default" });

const fileVariants = cva("border rounded-xl", {
  variants: {
    variant: {
      default: "border-neutral-200",
      destructive: "",
      failed: "",
    },
    size: {
      base: "flex flex-row items-center gap-3 px-4 py-3 ",
      large: undefined,
    },
    hovered: {
      false: undefined,
      true: undefined,
    },
  },
});

type FileProps = ViewProps & PressableProps & VariantProps<typeof fileVariants>;

const File = React.forwardRef<View, FileProps>(
  (
    {
      className,
      size = "base",
      hovered: isHovered,
      variant = "default",
      onHoverIn,
      onHoverOut,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
    });
    return (
      <FileContext.Provider value={{ hovered, size, variant }}>
        <View
          ref={ref}
          className={cn(
            fileVariants({
              hovered,
              size,
              variant,
            }),
            className
          )}
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
        className: cn(sizeClassName, className),
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
    return <View ref={ref} className={cn("", className)} {...props} />;
  }
);
FileContent.displayName = "FileContent";

/* -------------------------------------------------------------------------------------------------
 * FileLabel
 * -----------------------------------------------------------------------------------------------*/

type FileLabelProps = TextProps;

const FileLabel = React.forwardRef<Text, FileLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-sm font-semibold text-neutral-800 dark:text-neutral-100",
          className
        )}
        {...props}
      />
    );
  }
);
FileLabel.displayName = "FileLabel";

/* -------------------------------------------------------------------------------------------------
 * FileDescription
 * -----------------------------------------------------------------------------------------------*/

type FileDescriptionProps = TextProps;

const FileDescription = React.forwardRef<Text, FileDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-sm text-neutral-600 dark:text-neutral-300",
          className
        )}
        {...props}
      />
    );
  }
);
FileDescription.displayName = "FileDescription";

/* -------------------------------------------------------------------------------------------------
 * FileIconAction
 * -----------------------------------------------------------------------------------------------*/

type FileIconActionProps = ViewProps & {
  children?: JSX.Element;
};

const FileIconAction = React.forwardRef<View, FileIconActionProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = React.useContext(FileContext);
    const sizeClassName = size == "large" ? "size-8" : undefined;
    if (children) {
      return React.cloneElement(children, {
        className: cn(sizeClassName, className),
        ...props,
      });
    } else {
      return <></>;
    }
  }
);
FileIconAction.displayName = "FileIconAction";

/* -------------------------------------------------------------------------------------------------
 * FileButtons
 * -----------------------------------------------------------------------------------------------*/

type FileButtonsProps = ViewProps;

const FileButtons = React.forwardRef<View, FileButtonsProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-row gap-2 mt-2", className)}
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
  FileContent,
  FileLabel,
  FileDescription,
  FileIconAction,
  FileButtons,
};
