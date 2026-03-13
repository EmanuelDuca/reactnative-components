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

export interface EggFriedProps extends SvgProps {
  className?: string;
}

export const EggFried: React.FC<EggFriedProps> = ({
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
        d="M11.5 16C13.433 16 15 14.433 15 12.5C15 10.567 13.433 9 11.5 9C9.567 9 8 10.567 8 12.5C8 14.433 9.567 16 11.5 16Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M3 8C3 4.5 5.5 2 9.5 2C14.5 2 14.33 5 17 7C19.67 9 22 9 22 13C22 17.5 19.5 19.5 15 19.5C12.5 19.5 12.5 22 9 22C5.5 22 2 20 2 16.5C2 13.5 3.5 13.5 3.5 11.5C3.5 10 3 9 3 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
