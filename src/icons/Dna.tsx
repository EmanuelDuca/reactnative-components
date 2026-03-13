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

export interface DnaProps extends SvgProps {
  className?: string;
}

export const Dna: React.FC<DnaProps> = ({
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
        d="M2 15C8.667 9 15.333 15 22 9M9 22.0001C10.798 20.0021 11.518 18.0051 11.807 16.0071M15.0001 2C13.2021 3.998 12.4821 5.995 12.1931 7.993M17 6L14.5 3.5M14 8L13 7M7 18L9.5 20.5M3.5 14.5L4 15M20 9L20.5 9.5M6.5 12.5L7.5 13.5M16.5 10.5L17.5 11.5M10 16L11.5 17.5"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
