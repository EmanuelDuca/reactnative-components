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

export interface ShuffleProps extends SvgProps {
  className?: string;
}

export const Shuffle: React.FC<ShuffleProps> = ({
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
        d="M2 18H3.4C4.7 18 5.9 17.4 6.7 16.3L12.8 7.7C13.5 6.6 14.8 6 16.1 6H22M22 6L18 2M22 6L18 10M2 6H3.9C5.4 6 6.8 6.9 7.5 8.2M22 17.9999H16.1C14.8 17.9999 13.5 17.2999 12.8 16.1999L12.3 15.3999M22 17.9999L18 14M22 17.9999L18 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
