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

export interface RouteOffProps extends SvgProps {
  className?: string;
}

export const RouteOff: React.FC<RouteOffProps> = ({
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
        d="M9 19C9 20.6569 7.65685 22 6 22C4.34315 22 3 20.6569 3 19C3 17.3431 4.34315 16 6 16C7.65685 16 9 17.3431 9 19ZM9 19L17.5 18.9998C17.9 18.9998 18.4 18.8998 18.8 18.7998M5.20007 5.19995C4.44959 5.5077 3.8282 6.06849 3.44188 6.78669C3.05556 7.5049 2.92824 8.33602 3.08162 9.13833C3.235 9.94063 3.65959 10.6644 4.28298 11.1863C4.90637 11.7081 5.68994 11.9957 6.50007 12H12.0001M2 2L22 22M21 15.3C20.9521 14.4404 20.589 13.6285 19.9802 13.0197C19.3714 12.4109 18.5596 12.0479 17.7 12M15 5H10.7M15 5C15 6.65685 16.3431 8 18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
