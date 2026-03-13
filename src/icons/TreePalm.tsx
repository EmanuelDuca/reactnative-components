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

export interface TreePalmProps extends SvgProps {
  className?: string;
}

export const TreePalm: React.FC<TreePalmProps> = ({
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
        d="M10 8H6L5 7L4 8H2C2 5.24 4.46 3 7.5 3C10.54 3 13 5.24 13 8C13.5 10 16 16.5 14 22H10C10.83 20 11.5 18 11 15.5M13 7.14014C14.0126 6.39149 15.2407 5.99147 16.5 6.00014C19.54 6.00014 22 8.24014 22 11.0001H19L18 10.0001L17 11.0001H14M5.89009 9.70997C3.74009 11.86 3.59009 15.18 5.54009 17.14L9.78009 12.89L13.3101 9.35997C11.3601 7.39997 8.04009 7.55997 5.89009 9.70997Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
