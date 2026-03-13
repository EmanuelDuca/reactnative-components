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

export interface BetweenHorizontalStartProps extends SvgProps {
  className?: string;
}

export const BetweenHorizontalStart: React.FC<BetweenHorizontalStartProps> = ({
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
        d="M2 9L5 12L2 15M9 3H20C20.5523 3 21 3.44772 21 4V9C21 9.55228 20.5523 10 20 10H9C8.44772 10 8 9.55228 8 9V4C8 3.44772 8.44772 3 9 3ZM9 14H20C20.5523 14 21 14.4477 21 15V20C21 20.5523 20.5523 21 20 21H9C8.44772 21 8 20.5523 8 20V15C8 14.4477 8.44772 14 9 14Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
