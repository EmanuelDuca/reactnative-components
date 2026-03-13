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

export interface ClockFadingProps extends SvgProps {
  className?: string;
}

export const ClockFading: React.FC<ClockFadingProps> = ({
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
        d="M12 2C13.9401 1.99965 15.8385 2.56368 17.4637 3.62336C19.0889 4.68303 20.3707 6.19259 21.153 7.96804C21.9352 9.74349 22.1841 11.7082 21.8693 13.6226C21.5545 15.537 20.6896 17.3185 19.38 18.75M12 6V12L16 14M2.5 8.875C2.18135 9.84366 2.01273 10.8554 2 11.875M2.83 16C3.3915 17.2918 4.21958 18.4505 5.26 19.4M4.636 5.235C4.91504 4.93123 5.21261 4.64502 5.527 4.378M8.644 21.42C11.1377 22.3084 13.8819 22.1717 16.275 21.04"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
