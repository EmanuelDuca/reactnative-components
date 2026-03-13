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

export interface CarFrontProps extends SvgProps {
  className?: string;
}

export const CarFront: React.FC<CarFrontProps> = ({
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
        d="M21 8.00004L19 10M19 10L17.5 6.30004C17.3585 5.92138 17.1057 5.59446 16.7747 5.36239C16.4437 5.13032 16.0502 5.00399 15.646 5.00004H8.4C7.9925 4.99068 7.59188 5.10605 7.25177 5.3307C6.91166 5.55536 6.64832 5.87856 6.497 6.25704L5 10M19 10H5M19 10C20.1046 10 21 10.8954 21 12V16C21 17.1046 20.1046 18 19 18M5 10L3 8.00004M5 10C3.89543 10 3 10.8954 3 12V16C3 17.1046 3.89543 18 5 18M7 14H7.01M17 14H17.01M19 18H5M19 18V20M5 18V20"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
