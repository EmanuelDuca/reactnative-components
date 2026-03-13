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

export interface SoupProps extends SvgProps {
  className?: string;
}

export const Soup: React.FC<SoupProps> = ({
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
        d="M7 21H17M19.5 12L22 6M16.25 3C16.52 3.1 17.05 3.53 17 4.36C16.94 5.19 16.07 5.56 16 6.38C15.95 7.16 16.34 7.62 16.73 8M11.25 3C11.52 3.1 12.05 3.53 11.99 4.36C11.94 5.19 11.06 5.56 11.01 6.38C10.95 7.16 11.34 7.62 11.73 8M6.24995 3C6.51995 3.1 7.04995 3.53 6.99995 4.36C6.93995 5.19 6.06995 5.56 5.99995 6.38C5.94995 7.16 6.33995 7.62 6.73995 8M12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12H3C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
