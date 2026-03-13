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

export interface BetweenVerticalStartProps extends SvgProps {
  className?: string;
}

export const BetweenVerticalStart: React.FC<BetweenVerticalStartProps> = ({
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
        d="M15 2L12 5L9 2M4 8H9C9.55228 8 10 8.44772 10 9V20C10 20.5523 9.55228 21 9 21H4C3.44772 21 3 20.5523 3 20V9C3 8.44772 3.44772 8 4 8ZM15 8H20C20.5523 8 21 8.44772 21 9V20C21 20.5523 20.5523 21 20 21H15C14.4477 21 14 20.5523 14 20V9C14 8.44772 14.4477 8 15 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
