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

export interface MicrowaveProps extends SvgProps {
  className?: string;
}

export const Microwave: React.FC<MicrowaveProps> = ({
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
        d="M18 8V15M6 19V21M18 19V21M4 4H20C21.1046 4 22 4.89543 22 6V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V6C2 4.89543 2.89543 4 4 4ZM7 8H13C13.5523 8 14 8.44772 14 9V14C14 14.5523 13.5523 15 13 15H7C6.44772 15 6 14.5523 6 14V9C6 8.44772 6.44772 8 7 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
