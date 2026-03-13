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

export interface SproutProps extends SvgProps {
  className?: string;
}

export const Sprout: React.FC<SproutProps> = ({
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
        d="M7 20H17M10 20C15.5 17.5 10.8 13.6 13 10M13 10C12.9541 8.58615 13.3374 7.19156 14.0998 6C14.9998 5 16.2998 4.1 18.9998 4C18.8998 6.3 18.2998 7.6 17.2998 8.6C16.2998 9.4 14.9 9.9 13 10ZM9.5 9.40009C10.6 10.2001 11.3 11.6001 11.8 13.1001C9.8 13.5001 8.3 13.5001 7 12.8001C5.8 12.2001 4.7 10.9001 4 8.60009C6.8 8.10009 8.4 8.60009 9.5 9.40009Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
