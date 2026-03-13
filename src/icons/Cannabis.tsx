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

export interface CannabisProps extends SvgProps {
  className?: string;
}

export const Cannabis: React.FC<CannabisProps> = ({
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
        d="M12 22V18M12 18C10.5 19.5 8.5 21 6 21C6 19.5 6.5 17.5 8 16C8 16 5.5 16.5 2 15C2.5 13.5 5.5 12 7 12C5.5 11 3 8 3 6C5.5 6 8.5 7.5 10 9C10 6.5 10.5 4 12 2C13.5 4 14 6.5 14 9C15.5 7.5 18.5 6 21 6C21 8 18.5 11 17 12C18.5 12 21.5 13.5 22 15C18.5 16.5 16 16 16 16C17.5 17.5 18 19.5 18 21C15.5 21 13.5 19.5 12 18Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
