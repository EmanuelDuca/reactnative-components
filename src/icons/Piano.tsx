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

export interface PianoProps extends SvgProps {
  className?: string;
}

export const Piano: React.FC<PianoProps> = ({
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
        d="M2 14H22M6 14V18M10 14V18M14 14V18M18 14V18M18.5 7.99996C17.1 7.99996 15.9 7.19996 15.3 5.99996C14.732 4.4246 13.6081 3.11097 12.1396 2.30599C10.6712 1.501 8.95925 1.26011 7.32565 1.62859C5.69206 1.99707 4.24931 2.94954 3.2686 4.30697C2.28789 5.6644 1.83677 7.3333 2.00002 8.99996V20C2.00002 20.5304 2.21074 21.0391 2.58581 21.4142C2.96088 21.7892 3.46959 22 4.00002 22H20C20.5305 22 21.0392 21.7892 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V11.5C22 9.59996 20.4 7.99996 18.5 7.99996Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
