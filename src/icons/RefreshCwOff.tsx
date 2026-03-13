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

export interface RefreshCwOffProps extends SvgProps {
  className?: string;
}

export const RefreshCwOff: React.FC<RefreshCwOffProps> = ({
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
        d="M20.9999 8L18.7399 5.74C16.9309 3.99122 14.5159 3.00947 11.9999 3C10.9999 3 10.0299 3.16 9.12988 3.47M20.9999 8L21 3M20.9999 8H16M8 16H3M3 16V21M3 16L5.26 18.26C7.06897 20.0088 9.48395 20.9905 12 21C14.49 21 16.74 20 18.36 18.36M3 11.9999C3 9.50989 4 7.25989 5.64 5.63989M21 12C21 13 20.84 13.97 20.53 14.87M22 22L2 2"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
