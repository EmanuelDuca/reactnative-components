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

export interface DnaOffProps extends SvgProps {
  className?: string;
}

export const DnaOff: React.FC<DnaOffProps> = ({
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
        d="M15 2C13.65 3.5 12.908 5 12.5 6.5L14 8M9 22C10.35 20.5 11.092 19 11.5 17.5L10 16M2 15C5.333 12 8.667 12 12 12M22 9C20.5 10.35 19 11.092 17.5 11.5L16.5 10.5M17 6L14.5 3.5M7 18L9.5 20.5M3.5 14.5L4 15M20 9L20.5 9.5M6.5 12.5L7.5 13.5M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
