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

export interface GavelProps extends SvgProps {
  className?: string;
}

export const Gavel: React.FC<GavelProps> = ({
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
        d="M14.5002 12.5L6.50023 20.5C6.1024 20.8978 5.56284 21.1213 5.00023 21.1213C4.43762 21.1213 3.89805 20.8978 3.50023 20.5C3.1024 20.1022 2.87891 19.5626 2.87891 19C2.87891 18.4374 3.1024 17.8978 3.50023 17.5L11.5002 9.5M16 16L22 10M8 8L14 2M9 7L17 15M21 11L13 3"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
