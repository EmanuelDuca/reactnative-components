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

export interface RadiationProps extends SvgProps {
  className?: string;
}

export const Radiation: React.FC<RadiationProps> = ({
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
        d="M12 12H12.01M7.50011 4.19989C7.20011 3.69989 6.60011 3.49989 6.20011 3.79989C3.90011 5.49989 2.30011 8.09989 2.00011 10.9999C1.90011 11.4999 2.40011 11.9999 3.00011 11.9999H8.00011C8.00011 10.4999 8.80011 9.19989 10.0001 8.59989C8.90011 6.69989 8.00011 5.09989 7.50011 4.19989ZM21 12C21.6 12 22 11.6 22 11C21.7 8.09995 20.2 5.49995 17.9 3.89995C17.5 3.59995 16.8 3.69995 16.6 4.19995C16 5.09995 15.1 6.69995 14 8.49995C15.2 9.19995 16 10.5 16 12H21ZM7.50008 19.8C7.20008 20.3 7.40008 20.9 7.90008 21.1C10.5001 22.3 13.5001 22.3 16.1001 21.1C16.6001 20.9 16.8001 20.3 16.5001 19.8C16.0001 18.9 15.1001 17.3 14.0001 15.5C12.8001 16.2 11.2001 16.2 10.0001 15.5C8.90008 17.3 8.00008 18.9 7.50008 19.8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
