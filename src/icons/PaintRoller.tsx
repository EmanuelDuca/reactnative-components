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

export interface PaintRollerProps extends SvgProps {
  className?: string;
}

export const PaintRoller: React.FC<PaintRollerProps> = ({
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
        d="M10 16V14C10 13.4696 10.2107 12.9609 10.5858 12.5858C10.9609 12.2107 11.4696 12 12 12H20C20.5304 12 21.0391 11.7893 21.4142 11.4142C21.7893 11.0391 22 10.5304 22 10V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5H18M4 2H16C17.1046 2 18 2.89543 18 4V6C18 7.10457 17.1046 8 16 8H4C2.89543 8 2 7.10457 2 6V4C2 2.89543 2.89543 2 4 2ZM9 16H11C11.5523 16 12 16.4477 12 17V21C12 21.5523 11.5523 22 11 22H9C8.44772 22 8 21.5523 8 21V17C8 16.4477 8.44772 16 9 16Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
