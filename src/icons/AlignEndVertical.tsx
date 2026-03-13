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

export interface AlignEndVerticalProps extends SvgProps {
  className?: string;
}

export const AlignEndVertical: React.FC<AlignEndVerticalProps> = ({
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
        d="M22 22V2M4 4H16C17.1046 4 18 4.89543 18 6V8C18 9.10457 17.1046 10 16 10H4C2.89543 10 2 9.10457 2 8V6C2 4.89543 2.89543 4 4 4ZM11 14H16C17.1046 14 18 14.8954 18 16V18C18 19.1046 17.1046 20 16 20H11C9.89543 20 9 19.1046 9 18V16C9 14.8954 9.89543 14 11 14Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
