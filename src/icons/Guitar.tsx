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

export interface GuitarProps extends SvgProps {
  className?: string;
}

export const Guitar: React.FC<GuitarProps> = ({
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
        d="M17 7.00002V4.00002L18.7 2.30002C18.8869 2.11679 19.1382 2.01416 19.4 2.01416C19.6618 2.01416 19.9131 2.11679 20.1 2.30002L21.7 3.90002C21.8832 4.08695 21.9859 4.33826 21.9859 4.60002C21.9859 4.86177 21.8832 5.11309 21.7 5.30002L20 7.00002H17ZM17 7.00002L11.8999 12.1M6 16L8 18M12 12.5C12 12.7761 11.7761 13 11.5 13C11.2239 13 11 12.7761 11 12.5C11 12.2239 11.2239 12 11.5 12C11.7761 12 12 12.2239 12 12.5ZM6 12C6.38351 11.9936 6.75711 11.8771 7.07625 11.6644C7.39539 11.4516 7.64663 11.1516 7.8 10.8L8.2 9.9C8.7 8.8 9.8 8 11 8C13.8 8 16 10.2 16 13C16 14.2 15.2 15.3 14.1 15.8L13.2 16.2C12.8484 16.3534 12.5484 16.6046 12.3356 16.9237C12.1229 17.2429 12.0064 17.6165 12 18C12 19.0609 11.5786 20.0783 10.8284 20.8284C10.0783 21.5786 9.06087 22 8 22C4.7 22 2 19.3 2 16C2 14.9391 2.42143 13.9217 3.17157 13.1716C3.92172 12.4214 4.93913 12 6 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
