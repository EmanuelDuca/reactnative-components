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

export interface PartyPopperProps extends SvgProps {
  className?: string;
}

export const PartyPopper: React.FC<PartyPopperProps> = ({
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
        d="M5.8 11.3L2 22L12.7 18.21M4 3H4.01M22 8H22.01M15 2H15.01M22 20H22.01M22 2L19.76 2.75C19.1224 2.96239 18.5783 3.38964 18.2208 3.95872C17.8633 4.52781 17.7146 5.20339 17.8 5.87C17.9 6.73 17.23 7.5 16.35 7.5H15.97C15.11 7.5 14.37 8.1 14.21 8.94L14 10M22 12.9999L21.18 12.6699C20.32 12.3299 19.36 12.8699 19.2 13.7799C19.09 14.4799 18.48 14.9999 17.77 14.9999H17M11 2L11.33 2.82C11.67 3.68 11.13 4.64 10.22 4.8C9.52 4.9 9 5.52 9 6.23V7M11 13C12.93 14.93 13.83 17.17 13 18C12.17 18.83 9.93002 17.93 8.00002 16C6.07002 14.07 5.17002 11.83 6.00002 11C6.83002 10.17 9.07002 11.07 11 13Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
