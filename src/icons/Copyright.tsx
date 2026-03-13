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

export interface CopyrightProps extends SvgProps {
  className?: string;
}

export const Copyright: React.FC<CopyrightProps> = ({
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
        d="M14.83 14.83C14.2704 15.389 13.5577 15.7695 12.7819 15.9235C12.0061 16.0774 11.2021 15.998 10.4714 15.6951C9.74077 15.3922 9.11632 14.8795 8.67699 14.2218C8.23766 13.5641 8.00317 12.7909 8.00317 12C8.00317 11.2091 8.23766 10.4359 8.67699 9.77818C9.11632 9.12048 9.74077 8.60779 10.4714 8.30491C11.2021 8.00203 12.0061 7.92255 12.7819 8.07654C13.5577 8.23052 14.2704 8.61104 14.83 9.17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
