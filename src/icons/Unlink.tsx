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

export interface UnlinkProps extends SvgProps {
  className?: string;
}

export const Unlink: React.FC<UnlinkProps> = ({
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
        d="M18.84 12.25L20.56 10.54H20.54C21.4606 9.58603 21.9651 8.30572 21.9426 6.98017C21.9201 5.65461 21.3725 4.39216 20.42 3.46999C19.4869 2.57019 18.2412 2.06738 16.945 2.06738C15.6488 2.06738 14.4031 2.57019 13.47 3.46999L11.75 5.17999M5.16994 11.75L3.45994 13.46C2.53931 14.414 2.03486 15.6943 2.05736 17.0198C2.07986 18.3454 2.62746 19.6078 3.57994 20.53C4.51299 21.4298 5.7587 21.9326 7.05494 21.9326C8.35118 21.9326 9.59689 21.4298 10.5299 20.53L12.2399 18.82M8 2V5M2 8H5M16 19V22M19 16H22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
