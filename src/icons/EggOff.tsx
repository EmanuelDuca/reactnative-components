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

export interface EggOffProps extends SvgProps {
  className?: string;
}

export const EggOff: React.FC<EggOffProps> = ({
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
        d="M6.39891 6.39893C5.36191 8.15693 4.64991 10.1889 4.49991 11.9999C4.12991 16.4299 5.76991 21.9499 11.9999 21.9999C15.2559 21.9739 17.2589 20.4529 18.3749 18.3749M19.5321 13.875C19.5631 13.25 19.5525 12.6236 19.5001 12C19.1401 7.66 15.5501 2.04 12.0001 2C10.9601 2.012 9.9181 2.502 8.9541 3.297M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
