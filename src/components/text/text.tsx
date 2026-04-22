import { cn } from "@usekeyhole/utils";
import { useFontClassName } from "@usekeyhole/hooks";
import React from "react";
import { Text as RnText, TextProps as RnTextProps } from "react-native";

type TextProps = RnTextProps;

const Text = React.forwardRef<RnText, TextProps>(
  ({ className: classNameProp, ...props }, ref) => {
    const { fontClassName, sanitizedClassName: className } =
      useFontClassName(classNameProp);
    return (
      <RnText
        ref={ref}
        className={cn(
          "text-foreground text-sm leading-5",
          fontClassName,
          className,
        )}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, TextProps };
