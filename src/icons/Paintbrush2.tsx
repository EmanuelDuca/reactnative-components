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

export interface Paintbrush2Props extends SvgProps {
  className?: string;
}

export const Paintbrush2: React.FC<Paintbrush2Props> = ({
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
        d="M6 12V2H18V12M14 2V6M10 2V4M14 19.9V16H17C17.5304 16 18.0391 15.7893 18.4142 15.4142C18.7893 15.0391 19 14.5304 19 14V12H5V14C5 15.1 5.9 16 7 16H10V19.9C10 20.4304 10.2107 20.9391 10.5858 21.3142C10.9609 21.6893 11.4696 21.9 12 21.9C12.5304 21.9 13.0391 21.6893 13.4142 21.3142C13.7893 20.9391 14 20.4304 14 19.9Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
