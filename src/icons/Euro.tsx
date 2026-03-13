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

export interface EuroProps extends SvgProps {
  className?: string;
}

export const Euro: React.FC<EuroProps> = ({
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
        d="M4 10H16M4 14H13M19.0002 6.00003C17.5772 4.70768 15.7224 3.99427 13.8002 4.00003C12.7627 4.01308 11.7379 4.23037 10.7845 4.63949C9.83098 5.0486 8.96742 5.64153 8.24311 6.38442C7.5188 7.1273 6.94792 8.00559 6.56307 8.96913C6.17822 9.93266 5.98694 10.9626 6.00015 12C6.00015 16.4 9.50015 20 13.8002 20C15.8002 20 17.6002 19.2 19.0002 18"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
