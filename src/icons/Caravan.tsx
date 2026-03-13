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

export interface CaravanProps extends SvgProps {
  className?: string;
}

export const Caravan: React.FC<CaravanProps> = ({
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
        d="M2 9H6V13H2V9ZM2 9C2 7.93913 2.42143 6.92172 3.17157 6.17157C3.92172 5.42143 4.93913 5 6 5H14C15.0609 5 16.0783 5.42143 16.8284 6.17157C17.5786 6.92172 18 7.93913 18 9V19M2 9V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H6M10 19H14V9H10V19ZM10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19M10 19C10 17.8954 9.10457 17 8 17C6.89543 17 6 17.8954 6 19M10 19H22V17"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
