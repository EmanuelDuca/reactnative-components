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

export interface QuoteProps extends SvgProps {
  className?: string;
}

export const Quote: React.FC<QuoteProps> = ({
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
        d="M3 21C6 21 10 20 10 13V5.00003C10 3.75003 9.244 2.98303 8 3.00003H4C2.75 3.00003 2 3.75003 2 4.97203V11C2 12.25 2.75 13 4 13C5 13 5 13 5 14V15C5 16 4 17 3 17C2 17 2 17.008 2 18.031V20C2 21 2 21 3 21Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M15 21C18 21 22 20 22 13V5.00003C22 3.75003 21.243 2.98303 20 3.00003H16C14.75 3.00003 14 3.75003 14 4.97203V11C14 12.25 14.75 13 16 13H16.75C16.75 15.25 17 17 14 17V20C14 21 14 21 15 21Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
