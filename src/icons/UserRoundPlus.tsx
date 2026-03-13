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

export interface UserRoundPlusProps extends SvgProps {
  className?: string;
}

export const UserRoundPlus: React.FC<UserRoundPlusProps> = ({
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
        d="M2 21C1.99992 19.4603 2.44413 17.9533 3.27935 16.6598C4.11456 15.3664 5.30527 14.3414 6.7086 13.708C8.11193 13.0745 9.66824 12.8595 11.1908 13.0886C12.7133 13.3178 14.1373 13.9815 15.292 15M19 16V22M22 19H16M15 8C15 10.7614 12.7614 13 10 13C7.23858 13 5 10.7614 5 8C5 5.23858 7.23858 3 10 3C12.7614 3 15 5.23858 15 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
