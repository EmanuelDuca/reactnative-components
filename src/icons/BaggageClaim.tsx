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

export interface BaggageClaimProps extends SvgProps {
  className?: string;
}

export const BaggageClaim: React.FC<BaggageClaimProps> = ({
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
        d="M22 18H6C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16V7C4 6.46957 3.78929 5.96086 3.41421 5.58579C3.03914 5.21071 2.53043 5 2 5M17 14V4C17 3.46957 16.7893 2.96086 16.4142 2.58579C16.0391 2.21071 15.5304 2 15 2H14C13.4696 2 12.9609 2.21071 12.5858 2.58579C12.2107 2.96086 12 3.46957 12 4V14M9 6H20C20.5523 6 21 6.44772 21 7V13C21 13.5523 20.5523 14 20 14H9C8.44772 14 8 13.5523 8 13V7C8 6.44772 8.44772 6 9 6ZM20 20C20 21.1046 19.1046 22 18 22C16.8954 22 16 21.1046 16 20C16 18.8954 16.8954 18 18 18C19.1046 18 20 18.8954 20 20ZM11 20C11 21.1046 10.1046 22 9 22C7.89543 22 7 21.1046 7 20C7 18.8954 7.89543 18 9 18C10.1046 18 11 18.8954 11 20Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
