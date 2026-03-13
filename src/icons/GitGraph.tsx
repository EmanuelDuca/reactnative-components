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

export interface GitGraphProps extends SvgProps {
  className?: string;
}

export const GitGraph: React.FC<GitGraphProps> = ({
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
        d="M5 9C6.65685 9 8 7.65685 8 6C8 4.34315 6.65685 3 5 3C3.34315 3 2 4.34315 2 6C2 7.65685 3.34315 9 5 9ZM5 9V15M5 15C3.34315 15 2 16.3431 2 18C2 19.6569 3.34315 21 5 21C6.65685 21 8 19.6569 8 18C8 16.3431 6.65685 15 5 15ZM12 3V21M19 9C20.6569 9 22 7.65685 22 6C22 4.34315 20.6569 3 19 3C17.3431 3 16 4.34315 16 6C16 7.65685 17.3431 9 19 9ZM19 9C18.9988 10.2649 18.7311 11.5153 18.2142 12.6698C17.6972 13.8242 16.9428 14.8567 16 15.7"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
