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

export interface GroupProps extends SvgProps {
  className?: string;
}

export const Group: React.FC<GroupProps> = ({
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
        d="M3 7V5C3 3.9 3.9 3 5 3H7M17 3H19C20.1 3 21 3.9 21 5V7M21 17V19C21 20.1 20.1 21 19 21H17M7 21H5C3.9 21 3 20.1 3 19V17M8 7H13C13.5523 7 14 7.44772 14 8V11C14 11.5523 13.5523 12 13 12H8C7.44772 12 7 11.5523 7 11V8C7 7.44772 7.44772 7 8 7ZM11 12H16C16.5523 12 17 12.4477 17 13V16C17 16.5523 16.5523 17 16 17H11C10.4477 17 10 16.5523 10 16V13C10 12.4477 10.4477 12 11 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
