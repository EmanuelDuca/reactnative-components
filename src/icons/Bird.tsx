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

export interface BirdProps extends SvgProps {
  className?: string;
}

export const Bird: React.FC<BirdProps> = ({
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
        d="M16 7H16.01M3.4 18.0001H12C14.1217 18.0001 16.1566 17.1572 17.6569 15.6569C19.1571 14.1566 20 12.1218 20 10.0001V7.00007M20 7.00007C20.0023 6.14798 19.7323 5.31743 19.2296 4.62946C18.7269 3.94148 18.0175 3.43203 17.205 3.17533C16.3925 2.91863 15.5193 2.9281 14.7125 3.20237C13.9058 3.47663 13.2077 4.00135 12.72 4.70007L2 20.0001M20 7.00007L22 7.5L20 8M10 18V21M14 17.75V21M7 17.9999C8.23312 17.9998 9.43627 17.6198 10.4457 16.9116C11.4552 16.2034 12.2219 15.2013 12.6416 14.0418C13.0612 12.8823 13.1134 11.6216 12.7911 10.4314C12.4687 9.24116 11.7874 8.17915 10.84 7.38989"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
