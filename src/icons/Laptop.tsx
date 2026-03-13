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

export interface LaptopProps extends SvgProps {
  className?: string;
}

export const Laptop: React.FC<LaptopProps> = ({
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
        d="M20 16V7C20 6.46957 19.7893 5.96086 19.4142 5.58579C19.0392 5.21071 18.5305 5 18 5H6.00002C5.46959 5 4.96088 5.21071 4.58581 5.58579C4.21073 5.96086 4.00002 6.46957 4.00002 7V16M20 16H4.00002M20 16L21.28 18.55C21.3571 18.703 21.3936 18.8732 21.386 19.0444C21.3784 19.2155 21.327 19.3818 21.2366 19.5274C21.1463 19.6729 21.0201 19.7928 20.8701 19.8756C20.7201 19.9584 20.5513 20.0012 20.38 20H3.62002C3.44871 20.0012 3.27997 19.9584 3.12997 19.8756C2.97997 19.7928 2.85374 19.6729 2.7634 19.5274C2.67305 19.3818 2.62162 19.2155 2.61402 19.0444C2.60643 18.8732 2.64293 18.703 2.72002 18.55L4.00002 16"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
