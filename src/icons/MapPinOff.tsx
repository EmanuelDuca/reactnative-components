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

export interface MapPinOffProps extends SvgProps {
  className?: string;
}

export const MapPinOff: React.FC<MapPinOffProps> = ({
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
        d="M5.43 5.42993C4.50138 6.77322 4.0027 8.36691 4 9.99993C4 15.9999 12 21.9999 12 21.9999C13.8583 20.5366 15.5367 18.8583 17 16.9999M19.18 13.52C19.6978 12.4174 19.9773 11.218 20 10C20 7.87829 19.1571 5.84346 17.6568 4.34317C16.1565 2.84288 14.1217 2.00002 12 2.00002C10.779 1.99695 9.57394 2.27767 8.47998 2.82002M9.12991 9.12988C9.04068 9.41115 8.9968 9.70482 8.99991 9.99988C8.99991 10.7955 9.31598 11.5586 9.87859 12.1212C10.4412 12.6838 11.2043 12.9999 11.9999 12.9999C12.295 13.003 12.5886 12.9591 12.8699 12.8699M14.9 9.25009C14.7673 8.73082 14.4978 8.2566 14.1197 7.87674C13.7416 7.49688 13.2686 7.22524 12.75 7.09009M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
