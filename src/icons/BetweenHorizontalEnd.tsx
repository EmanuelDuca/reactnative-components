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

export interface BetweenHorizontalEndProps extends SvgProps {
  className?: string;
}

export const BetweenHorizontalEnd: React.FC<BetweenHorizontalEndProps> = ({
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
        d="M22 15L19 12L22 9M4 3H15C15.5523 3 16 3.44772 16 4V9C16 9.55228 15.5523 10 15 10H4C3.44772 10 3 9.55228 3 9V4C3 3.44772 3.44772 3 4 3ZM4 14H15C15.5523 14 16 14.4477 16 15V20C16 20.5523 15.5523 21 15 21H4C3.44772 21 3 20.5523 3 20V15C3 14.4477 3.44772 14 4 14Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
