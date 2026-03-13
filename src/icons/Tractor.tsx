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

export interface TractorProps extends SvgProps {
  className?: string;
}

export const Tractor: React.FC<TractorProps> = ({
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
        d="M10 11L21 11.9C21.6 11.9 21.9 12.4 21.8 13L21 18H20M20 18C20 19.1046 19.1046 20 18 20C16.8954 20 16 19.1046 16 18M20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18M16 18H11M18 5C17.7348 5 17.4804 5.10536 17.2929 5.29289C17.1054 5.48043 17 5.73478 17 6V11.573M3 4H12L13 11.246M4 11V4M7 15H7.01M8 10.1V4M12 15C12 17.7614 9.76142 20 7 20C4.23858 20 2 17.7614 2 15C2 12.2386 4.23858 10 7 10C9.76142 10 12 12.2386 12 15Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
