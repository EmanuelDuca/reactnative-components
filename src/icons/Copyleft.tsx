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

export interface CopyleftProps extends SvgProps {
  className?: string;
}

export const Copyleft: React.FC<CopyleftProps> = ({
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
        d="M9.16992 14.83C9.72951 15.389 10.4422 15.7695 11.2181 15.9235C11.9939 16.0774 12.7979 15.998 13.5285 15.6951C14.2592 15.3922 14.8836 14.8795 15.323 14.2218C15.7623 13.5641 15.9968 12.7909 15.9968 12C15.9968 11.2091 15.7623 10.4359 15.323 9.77818C14.8836 9.12048 14.2592 8.60779 13.5285 8.30491C12.7979 8.00203 11.9939 7.92255 11.2181 8.07654C10.4422 8.23052 9.72951 8.61104 9.16992 9.17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
