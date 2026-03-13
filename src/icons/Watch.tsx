import * as React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { cssInterop } from "nativewind";
import { cn, ecn } from "@usekeyhole/utils";

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true },
  },
});

cssInterop(Path, {
  className: {
    // @ts-ignore
    target: "style",
    nativeStyleToProp: {
      stroke: true,
      // @ts-ignore
      strokeWidth: true,
      fill: true,
    },
  },
});

export interface WatchProps extends SvgProps {
  className?: string;
}

export const Watch: React.FC<WatchProps> = ({
  color = "#262626",
  className: classNameProp,
  strokeWidth,
  style,
  ...props
}) => {
  const className = cn("stroke-foreground", classNameProp);

  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      style={style}
      {...props}
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M12 10V12L13 13M16.1301 7.65988L15.3201 3.60988C15.2287 3.14948 14.9782 2.73592 14.6126 2.44158C14.2469 2.14724 13.7894 1.99089 13.3201 1.99988H10.6401C10.1708 1.99089 9.71329 2.14724 9.34765 2.44158C8.98202 2.73592 8.73155 3.14948 8.64011 3.60988L7.86011 7.65988M7.87988 16.3601L8.67988 20.3601C8.77133 20.8205 9.02179 21.234 9.38743 21.5284C9.75307 21.8227 10.2106 21.9791 10.6799 21.9701H13.3999C13.8692 21.9791 14.3267 21.8227 14.6923 21.5284C15.058 21.234 15.3084 20.8205 15.3999 20.3601L16.2099 16.3101M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
