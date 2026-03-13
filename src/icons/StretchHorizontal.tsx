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

export interface StretchHorizontalProps extends SvgProps {
  className?: string;
}

export const StretchHorizontal: React.FC<StretchHorizontalProps> = ({
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
        d="M20 4H4C2.89543 4 2 4.89543 2 6V8C2 9.10457 2.89543 10 4 10H20C21.1046 10 22 9.10457 22 8V6C22 4.89543 21.1046 4 20 4Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M20 14H4C2.89543 14 2 14.8954 2 16V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V16C22 14.8954 21.1046 14 20 14Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
