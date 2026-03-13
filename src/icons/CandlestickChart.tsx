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

export interface CandlestickChartProps extends SvgProps {
  className?: string;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
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
        d="M9 5V9M9 15V17M17 3V5M17 13V16M3 3V21H21M8 9H10C10.5523 9 11 9.44772 11 10V14C11 14.5523 10.5523 15 10 15H8C7.44772 15 7 14.5523 7 14V10C7 9.44772 7.44772 9 8 9ZM16 5H18C18.5523 5 19 5.44772 19 6V12C19 12.5523 18.5523 13 18 13H16C15.4477 13 15 12.5523 15 12V6C15 5.44772 15.4477 5 16 5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
