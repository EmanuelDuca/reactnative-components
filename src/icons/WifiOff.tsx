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

export interface WifiOffProps extends SvgProps {
  className?: string;
}

export const WifiOff: React.FC<WifiOffProps> = ({
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
        d="M12 20H12.01M8.5 16.4288C9.43464 15.5127 10.6912 14.9995 12 14.9995C13.3088 14.9995 14.5654 15.5127 15.5 16.4288M5 12.8589C6.41803 11.4689 8.21781 10.5324 10.17 10.1689M19.0002 12.8589C18.398 12.2687 17.7237 11.757 16.9932 11.3359M2 8.81976C3.2366 7.71383 4.64809 6.82071 6.177 6.17676M21.9999 8.81991C20.4746 7.45573 18.6864 6.41806 16.7451 5.77074C14.8039 5.12343 12.7507 4.88016 10.7119 5.05591M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
