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

export interface SmartphoneNfcProps extends SvgProps {
  className?: string;
}

export const SmartphoneNfc: React.FC<SmartphoneNfcProps> = ({
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
        d="M13 8.31982C13.6392 9.44097 13.9754 10.7093 13.9754 11.9998C13.9754 13.2904 13.6392 14.5587 13 15.6798M16.46 6.20996C17.459 7.97615 17.9841 9.97079 17.9841 12C17.9841 14.0291 17.459 16.0238 16.46 17.79M19.9099 4.1001C21.2875 6.50473 22.0131 9.22749 22.0148 11.9988C22.0166 14.77 21.2944 17.4937 19.9199 19.9001M3 6H8C8.55228 6 9 6.44772 9 7V17C9 17.5523 8.55228 18 8 18H3C2.44772 18 2 17.5523 2 17V7C2 6.44772 2.44772 6 3 6Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
