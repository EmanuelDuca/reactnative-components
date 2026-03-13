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

export interface TheaterProps extends SvgProps {
  className?: string;
}

export const Theater: React.FC<TheaterProps> = ({
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
        d="M2 10C2 10 5 7 5 2M2 10C6.4 10 10 6.4 10 2M2 10C2 10 4 12 4 15M22 10C22 10 19 7 19 2M22 10C17.6 10 14 6.4 14 2M22 10C22 10 20 12 20 15M8 15H16M2 22V21C2 20.4696 2.21071 19.9609 2.58579 19.5858C2.96086 19.2107 3.46957 19 4 19H8C8.53043 19 9.03914 19.2107 9.41421 19.5858C9.78929 19.9609 10 20.4696 10 21V22M14 22V21C14 20.4696 14.2107 19.9609 14.5858 19.5858C14.9609 19.2107 15.4696 19 16 19H20C20.5304 19 21.0391 19.2107 21.4142 19.5858C21.7893 19.9609 22 20.4696 22 21V22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
