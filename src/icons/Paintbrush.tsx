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

export interface PaintbrushProps extends SvgProps {
  className?: string;
}

export const Paintbrush: React.FC<PaintbrushProps> = ({
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
        d="M9 8C7 11 5 11.5 2 12L10 22C12 21 16 17 16 15M14.5 17.5L4.5 15M18.37 2.63011L14 7.00011L12.41 5.41011C12.0353 5.03761 11.5284 4.82852 11 4.82852C10.4716 4.82852 9.96473 5.03761 9.59 5.41011L8 7.00011L17 16.0001L18.59 14.4101C18.9625 14.0354 19.1716 13.5285 19.1716 13.0001C19.1716 12.4717 18.9625 11.9648 18.59 11.5901L17 10.0001L21.37 5.63011C21.7678 5.23228 21.9913 4.69272 21.9913 4.13011C21.9913 3.5675 21.7678 3.02793 21.37 2.63011C20.9722 2.23228 20.4326 2.00879 19.87 2.00879C19.3074 2.00879 18.7678 2.23228 18.37 2.63011Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
