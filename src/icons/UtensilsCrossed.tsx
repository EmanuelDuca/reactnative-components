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

export interface UtensilsCrossedProps extends SvgProps {
  className?: string;
}

export const UtensilsCrossed: React.FC<UtensilsCrossedProps> = ({
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
        d="M15.9999 2L13.6999 4.3C13.1502 4.86079 12.8423 5.61474 12.8423 6.4C12.8423 7.18526 13.1502 7.93921 13.6999 8.5L15.4999 10.3C16.0606 10.8497 16.8146 11.1576 17.5999 11.1576C18.3851 11.1576 19.1391 10.8497 19.6999 10.3L21.9999 8M15.0002 14.9998L3.30016 3.2998C2.90104 3.69086 2.58397 4.15762 2.36751 4.67276C2.15105 5.18789 2.03955 5.74104 2.03955 6.2998C2.03955 6.85857 2.15105 7.41172 2.36751 7.92685C2.58397 8.44199 2.90104 8.90875 3.30016 9.2998L10.6002 16.5998C11.3002 17.2998 12.6002 17.2998 13.4002 16.5998L15.0002 14.9998ZM15.0002 14.9998L22.0002 21.9998M2.1001 21.8L8.5001 15.5M19 5L12 12"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
