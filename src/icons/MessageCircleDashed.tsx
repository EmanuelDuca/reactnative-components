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

export interface MessageCircleDashedProps extends SvgProps {
  className?: string;
}

export const MessageCircleDashed: React.FC<MessageCircleDashedProps> = ({
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
        d="M13.5 3.1C13 3.1 12.5 3 12 3C11.5 3 11 3.1 10.5 3.1M19.3002 6.79995C18.7037 6.00355 17.9966 5.29641 17.2002 4.69995M20.8999 13.5C20.9999 13 20.9999 12.5 20.9999 12C20.9999 11.5 20.8999 11 20.8999 10.5M17.2002 19.2999C17.9966 18.7035 18.7037 17.9964 19.3002 17.2M10.5 20.8999C11 20.9999 11.5 20.9999 12 20.9999C12.5 20.9999 13 20.8999 13.5 20.8999M3.5 17.5L2 22L6.5 20.5M3.1 10.5C3.1 11 3 11.5 3 12C3 12.5 3.1 13 3.1 13.5M6.8002 4.69995C6.00379 5.29641 5.29665 6.00355 4.7002 6.79995"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
