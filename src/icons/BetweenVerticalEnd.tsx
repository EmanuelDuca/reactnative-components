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

export interface BetweenVerticalEndProps extends SvgProps {
  className?: string;
}

export const BetweenVerticalEnd: React.FC<BetweenVerticalEndProps> = ({
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
        d="M9 22L12 19L15 22M4 3H9C9.55228 3 10 3.44772 10 4V15C10 15.5523 9.55228 16 9 16H4C3.44772 16 3 15.5523 3 15V4C3 3.44772 3.44772 3 4 3ZM15 3H20C20.5523 3 21 3.44772 21 4V15C21 15.5523 20.5523 16 20 16H15C14.4477 16 14 15.5523 14 15V4C14 3.44772 14.4477 3 15 3Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
