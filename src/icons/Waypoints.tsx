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

export interface WaypointsProps extends SvgProps {
  className?: string;
}

export const Waypoints: React.FC<WaypointsProps> = ({
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
        d="M10.2 6.2998L6.30005 10.1998M7 12C7 13.3807 5.88071 14.5 4.5 14.5C3.11929 14.5 2 13.3807 2 12C2 10.6193 3.11929 9.5 4.5 9.5C5.88071 9.5 7 10.6193 7 12ZM7 12H17M17 12C17 13.3807 18.1193 14.5 19.5 14.5C20.8807 14.5 22 13.3807 22 12C22 10.6193 20.8807 9.5 19.5 9.5C18.1193 9.5 17 10.6193 17 12ZM13.8 17.6998L17.7 13.7998M14.5 4.5C14.5 5.88071 13.3807 7 12 7C10.6193 7 9.5 5.88071 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5ZM14.5 19.5C14.5 20.8807 13.3807 22 12 22C10.6193 22 9.5 20.8807 9.5 19.5C9.5 18.1193 10.6193 17 12 17C13.3807 17 14.5 18.1193 14.5 19.5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
