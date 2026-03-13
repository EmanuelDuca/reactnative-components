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

export interface AlignStartVerticalProps extends SvgProps {
  className?: string;
}

export const AlignStartVertical: React.FC<AlignStartVerticalProps> = ({
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
        d="M2 2V22M8 14H13C14.1046 14 15 14.8954 15 16V18C15 19.1046 14.1046 20 13 20H8C6.89543 20 6 19.1046 6 18V16C6 14.8954 6.89543 14 8 14ZM8 4H20C21.1046 4 22 4.89543 22 6V8C22 9.10457 21.1046 10 20 10H8C6.89543 10 6 9.10457 6 8V6C6 4.89543 6.89543 4 8 4Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
