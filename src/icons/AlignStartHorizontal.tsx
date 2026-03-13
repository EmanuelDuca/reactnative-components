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

export interface AlignStartHorizontalProps extends SvgProps {
  className?: string;
}

export const AlignStartHorizontal: React.FC<AlignStartHorizontalProps> = ({
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
        d="M22 2H2M6 6H8C9.10457 6 10 6.89543 10 8V20C10 21.1046 9.10457 22 8 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6ZM16 6H18C19.1046 6 20 6.89543 20 8V13C20 14.1046 19.1046 15 18 15H16C14.8954 15 14 14.1046 14 13V8C14 6.89543 14.8954 6 16 6Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
