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

export interface BluetoothSearchingProps extends SvgProps {
  className?: string;
}

export const BluetoothSearching: React.FC<BluetoothSearchingProps> = ({
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
        d="M7 7L17 17L12 22V2L17 7L7 17M20.8301 14.8299C21.202 14.4584 21.497 14.0173 21.6983 13.5317C21.8996 13.0461 22.0032 12.5256 22.0032 11.9999C22.0032 11.4743 21.8996 10.9538 21.6983 10.4682C21.497 9.98257 21.202 9.54141 20.8301 9.16992M18 12H18.01"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
