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

export interface CircleDashedProps extends SvgProps {
  className?: string;
}

export const CircleDashed: React.FC<CircleDashedProps> = ({
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
        d="M10.1001 2.18191C11.3551 1.93904 12.6451 1.93904 13.9001 2.18191M13.9001 21.8181C12.6451 22.061 11.3551 22.061 10.1001 21.8181M17.6089 3.72095C18.6704 4.44017 19.5836 5.35682 20.2989 6.42095M2.18191 13.9001C1.93904 12.6451 1.93904 11.3551 2.18191 10.1001M20.2791 17.6089C19.5599 18.6704 18.6432 19.5836 17.5791 20.2989M21.8181 10.1001C22.061 11.3551 22.061 12.6451 21.8181 13.9001M3.72095 6.39093C4.44017 5.32946 5.35682 4.41621 6.42095 3.70093M6.39093 20.2791C5.32946 19.5599 4.41621 18.6432 3.70093 17.5791"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
