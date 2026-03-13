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

export interface BarChartBigProps extends SvgProps {
  className?: string;
}

export const BarChartBig: React.FC<BarChartBigProps> = ({
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
        d="M3 3V21H21M8 10H10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17H8C7.44772 17 7 16.5523 7 16V11C7 10.4477 7.44772 10 8 10ZM16 5H18C18.5523 5 19 5.44772 19 6V16C19 16.5523 18.5523 17 18 17H16C15.4477 17 15 16.5523 15 16V6C15 5.44772 15.4477 5 16 5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
