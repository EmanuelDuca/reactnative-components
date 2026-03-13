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

export interface RadiusProps extends SvgProps {
  className?: string;
}

export const Radius: React.FC<RadiusProps> = ({
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
        d="M20.34 17.52C21.708 15.4531 22.2596 12.9517 21.8879 10.501C21.5161 8.05041 20.2474 5.82518 18.3279 4.25694C16.4084 2.6887 13.9749 1.88923 11.4993 2.01358C9.02376 2.13792 6.68261 3.17723 4.92992 4.92992C3.17723 6.68261 2.13792 9.02376 2.01358 11.4993C1.88923 13.9749 2.6887 16.4084 4.25694 18.3279C5.82518 20.2474 8.05041 21.5161 10.501 21.8879C12.9517 22.2596 15.4531 21.708 17.52 20.34M13.4102 13.4099L17.5902 17.5899M21 19C21 20.1046 20.1046 21 19 21C17.8954 21 17 20.1046 17 19C17 17.8954 17.8954 17 19 17C20.1046 17 21 17.8954 21 19ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
