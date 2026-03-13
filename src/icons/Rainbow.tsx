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

export interface RainbowProps extends SvgProps {
  className?: string;
}

export const Rainbow: React.FC<RainbowProps> = ({
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
        d="M22 17C22 14.3478 20.9464 11.8043 19.0711 9.92893C17.1957 8.05357 14.6522 7 12 7C9.34784 7 6.8043 8.05357 4.92893 9.92893C3.05357 11.8043 2 14.3478 2 17M6 17C6 15.4087 6.63214 13.8826 7.75736 12.7574C8.88258 11.6321 10.4087 11 12 11C13.5913 11 15.1174 11.6321 16.2426 12.7574C17.3679 13.8826 18 15.4087 18 17M10 17C10 16.4696 10.2107 15.9609 10.5858 15.5858C10.9609 15.2107 11.4696 15 12 15C12.5304 15 13.0391 15.2107 13.4142 15.5858C13.7893 15.9609 14 16.4696 14 17"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
