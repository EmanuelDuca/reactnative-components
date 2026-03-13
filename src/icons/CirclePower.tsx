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

export interface CirclePowerProps extends SvgProps {
  className?: string;
}

export const CirclePower: React.FC<CirclePowerProps> = ({
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
        d="M12 12V7M16 9C16.5571 9.74285 16.8964 10.6262 16.9798 11.551C17.0632 12.4758 16.8874 13.4055 16.4721 14.2361C16.0569 15.0666 15.4185 15.7651 14.6287 16.2533C13.8388 16.7414 12.9286 17 12 17C11.0714 17 10.1612 16.7414 9.37135 16.2533C8.58147 15.7651 7.94313 15.0666 7.52787 14.2361C7.1126 13.4055 6.93682 12.4758 7.02021 11.551C7.1036 10.6262 7.44287 9.74285 8 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
