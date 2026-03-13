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

export interface HeartOffProps extends SvgProps {
  className?: string;
}

export const HeartOff: React.FC<HeartOffProps> = ({
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
        d="M2 2L22 22M16.5 16.4999L12 20.9999L5 13.9999C3.5 12.5499 2 10.7999 2 8.4999C2.00067 7.65952 2.1939 6.83047 2.56487 6.0764C2.93584 5.32233 3.47467 4.6633 4.14 4.1499M8.76001 3.1C9.91001 3.32 10.89 3.88 12 5C13.5 3.5 14.74 3 16.5 3C17.9587 3 19.3576 3.57946 20.3891 4.61091C21.4205 5.64236 22 7.04131 22 8.5C22 10.62 20.7 12.28 19.33 13.67"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
