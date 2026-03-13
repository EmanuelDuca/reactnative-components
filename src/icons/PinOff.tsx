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

export interface PinOffProps extends SvgProps {
  className?: string;
}

export const PinOff: React.FC<PinOffProps> = ({
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
        d="M2 2L22 22M12 17V22M9 9V10.76C8.9998 11.1321 8.89581 11.4967 8.69972 11.813C8.50363 12.1292 8.22321 12.3844 7.89 12.55L6.11 13.45C5.77679 13.6156 5.49637 13.8708 5.30028 14.187C5.10419 14.5033 5.0002 14.8679 5 15.24V17H17M15.0001 9.34V6H16.0001C16.5306 6 17.0393 5.78929 17.4144 5.41421C17.7894 5.03914 18.0001 4.53043 18.0001 4C18.0001 3.46957 17.7894 2.96086 17.4144 2.58579C17.0393 2.21071 16.5306 2 16.0001 2H7.89014"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
