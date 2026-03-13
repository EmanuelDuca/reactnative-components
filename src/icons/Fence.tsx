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

export interface FenceProps extends SvgProps {
  className?: string;
}

export const Fence: React.FC<FenceProps> = ({
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
        d="M6 8H10M6 18H10M14 8H18M14 18H18M4 3L2 5V20C2 20.6 2.4 21 3 21H5C5.6 21 6 20.6 6 20V5L4 3ZM12 3L10 5V20C10 20.6 10.4 21 11 21H13C13.6 21 14 20.6 14 20V5L12 3ZM20 3L18 5V20C18 20.6 18.4 21 19 21H21C21.6 21 22 20.6 22 20V5L20 3Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
