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

export interface HeartCrackProps extends SvgProps {
  className?: string;
}

export const HeartCrack: React.FC<HeartCrackProps> = ({
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
        d="M12 5C13.5 3.5 14.74 3 16.5 3C17.9587 3 19.3576 3.57946 20.3891 4.61091C21.4205 5.64236 22 7.04131 22 8.5C22 10.79 20.49 12.54 19 14L12 21L5 14C3.5 12.55 2 10.8 2 8.5C2 7.04131 2.57946 5.64236 3.61091 4.61091C4.64236 3.57946 6.04131 3 7.5 3C9.26 3 10.5 3.5 12 5ZM12 5L10 7L13 10L11 12L12 13"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
