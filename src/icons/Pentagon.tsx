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

export interface PentagonProps extends SvgProps {
  className?: string;
}

export const Pentagon: React.FC<PentagonProps> = ({
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
        d="M3.5 8.70001C2.8 9.20001 2.5 10.1 2.8 10.9L5.6 19.6C5.9 20.4 6.6 21 7.5 21H16.6C17.5 21 18.2 20.4 18.5 19.6L21.3 10.9C21.6 10.1 21.3 9.20001 20.6 8.70001L13.2 3.40001C12.8479 3.15482 12.4291 3.02338 12 3.02338C11.5709 3.02338 11.1521 3.15482 10.8 3.40001L3.5 8.70001Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
