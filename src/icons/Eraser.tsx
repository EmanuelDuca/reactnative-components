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

export interface EraserProps extends SvgProps {
  className?: string;
}

export const Eraser: React.FC<EraserProps> = ({
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
        d="M13.0002 21L21.3002 12.7C22.3002 11.8 22.3002 10.3 21.3002 9.29995L15.7002 3.69995C14.8002 2.69995 13.3002 2.69995 12.3002 3.69995L2.7002 13.3C1.7002 14.2 1.7002 15.7 2.7002 16.7L7.0002 21L22 21M5 11L14 20"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
