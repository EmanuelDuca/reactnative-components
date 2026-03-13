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

export interface SparkleProps extends SvgProps {
  className?: string;
}

export const Sparkle: React.FC<SparkleProps> = ({
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
        d="M12 3L10.1 8.8C10.0027 9.10122 9.83531 9.37504 9.61157 9.59895C9.38783 9.82287 9.11414 9.99048 8.813 10.088L3 12L8.8 13.9C9.10122 13.9973 9.37504 14.1647 9.59895 14.3884C9.82287 14.6122 9.99048 14.8859 10.088 15.187L12 21L13.9 15.2C13.9973 14.8988 14.1647 14.625 14.3884 14.401C14.6122 14.1771 14.8859 14.0095 15.187 13.912L21 12L15.2 10.1C14.8988 10.0027 14.625 9.83531 14.401 9.61157C14.1771 9.38783 14.0095 9.11414 13.912 8.813L12 3Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
