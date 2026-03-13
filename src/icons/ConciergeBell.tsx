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

export interface ConciergeBellProps extends SvgProps {
  className?: string;
}

export const ConciergeBell: React.FC<ConciergeBellProps> = ({
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
        d="M4 16C3.46957 16 2.96086 16.2107 2.58579 16.5858C2.21071 16.9609 2 17.4696 2 18V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H21C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V18C22 17.4696 21.7893 16.9609 21.4142 16.5858C21.0391 16.2107 20.5304 16 20 16M4 16H20M4 16C4 13.8783 4.84285 11.8434 6.34315 10.3431C7.84344 8.84285 9.87827 8 12 8M20 16C20 13.8783 19.1571 11.8434 17.6569 10.3431C16.1566 8.84285 14.1217 8 12 8M12 8V4M10 4H14"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
