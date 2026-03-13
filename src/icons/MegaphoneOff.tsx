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

export interface MegaphoneOffProps extends SvgProps {
  className?: string;
}

export const MegaphoneOff: React.FC<MegaphoneOffProps> = ({
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
        d="M9.26 9.26001L3 11V14L17.14 17.14M20.9999 15.34V6L13.6899 8.03M11.6 16.8C11.4949 17.1808 11.3159 17.5372 11.0731 17.8488C10.8303 18.1605 10.5285 18.4212 10.1849 18.6162C9.84132 18.8112 9.4627 18.9367 9.07065 18.9853C8.6786 19.034 8.28081 19.005 7.89997 18.9C7.51914 18.7949 7.16273 18.6159 6.85109 18.3731C6.53945 18.1303 6.27868 17.8285 6.08368 17.4849C5.88867 17.1413 5.76325 16.7627 5.71457 16.3706C5.6659 15.9786 5.69492 15.5808 5.79997 15.2M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
