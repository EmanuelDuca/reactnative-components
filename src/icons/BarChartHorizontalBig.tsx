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

export interface BarChartHorizontalBigProps extends SvgProps {
  className?: string;
}

export const BarChartHorizontalBig: React.FC<BarChartHorizontalBigProps> = ({
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
        d="M3 3V21H21M8 5H18C18.5523 5 19 5.44772 19 6V8C19 8.55228 18.5523 9 18 9H8C7.44772 9 7 8.55228 7 8V6C7 5.44772 7.44772 5 8 5ZM8 13H13C13.5523 13 14 13.4477 14 14V16C14 16.5523 13.5523 17 13 17H8C7.44772 17 7 16.5523 7 16V14C7 13.4477 7.44772 13 8 13Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
