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

export interface CircleDotDashedProps extends SvgProps {
  className?: string;
}

export const CircleDotDashed: React.FC<CircleDotDashedProps> = ({
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
        d="M10.1001 2.18005C11.355 1.93543 12.6452 1.93543 13.9001 2.18005M17.6001 3.70996C18.6624 4.42822 19.5758 5.34503 20.2901 6.40996M21.8201 10.1001C22.0647 11.355 22.0647 12.6452 21.8201 13.9001M20.2901 17.6001C19.5718 18.6624 18.655 19.5758 17.5901 20.2901M13.9001 21.8201C12.6452 22.0644 11.355 22.0644 10.1001 21.8201M6.39996 20.2901C5.33769 19.5718 4.42427 18.655 3.70996 17.5901M2.18005 13.9001C1.93543 12.6452 1.93543 11.355 2.18005 10.1001M3.70996 6.39996C4.42822 5.33769 5.34503 4.42427 6.40996 3.70996M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
