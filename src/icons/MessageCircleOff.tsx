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

export interface MessageCircleOffProps extends SvgProps {
  className?: string;
}

export const MessageCircleOff: React.FC<MessageCircleOffProps> = ({
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
        d="M20.5001 14.9001C21.0344 13.3119 21.1147 11.6061 20.732 9.97469C20.3493 8.34332 19.5187 6.85119 18.3339 5.66631C17.149 4.48144 15.6569 3.65088 14.0255 3.26816C12.3941 2.88545 10.6883 2.96577 9.1001 3.50008M2 2L22 22M5.6 5.6001C3 8.3001 2.2 12.5001 4 16.0001L2 22.0001L8 20.0001C11.4 21.8001 15.6 21.1001 18.3 18.3001"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
