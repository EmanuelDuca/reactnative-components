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

export interface AlignEndHorizontalProps extends SvgProps {
  className?: string;
}

export const AlignEndHorizontal: React.FC<AlignEndHorizontalProps> = ({
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
        d="M22 22H2M6 2H8C9.10457 2 10 2.89543 10 4V16C10 17.1046 9.10457 18 8 18H6C4.89543 18 4 17.1046 4 16V4C4 2.89543 4.89543 2 6 2ZM16 9H18C19.1046 9 20 9.89543 20 11V16C20 17.1046 19.1046 18 18 18H16C14.8954 18 14 17.1046 14 16V11C14 9.89543 14.8954 9 16 9Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
