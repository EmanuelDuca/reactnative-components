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

export interface LightbulbOffProps extends SvgProps {
  className?: string;
}

export const LightbulbOff: React.FC<LightbulbOffProps> = ({
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
        d="M16.8 11.2C17.6 10.3 18 9.20001 18 8.00001C17.998 6.91781 17.7033 5.8563 17.1473 4.9279C16.5912 3.99951 15.7943 3.23879 14.8412 2.72634C13.888 2.21388 12.814 1.96876 11.7329 2.01694C10.6517 2.06511 9.60376 2.4048 8.69995 3.00001M2 2L22 22M6.2999 6.30005C5.94477 7.1856 5.86941 8.15867 6.08395 9.08834C6.29849 10.018 6.79263 10.8597 7.4999 11.5C8.1999 12.2 8.7999 13 8.9999 14M9 18H15M10 22H14"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
