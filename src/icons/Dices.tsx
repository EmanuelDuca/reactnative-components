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

export interface DicesProps extends SvgProps {
  className?: string;
}

export const Dices: React.FC<DicesProps> = ({
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
        d="M17.92 14.0001L21.42 10.5001C21.791 10.0885 21.9964 9.55413 21.9964 9.00005C21.9964 8.44597 21.791 7.91156 21.42 7.50005L16.42 2.58005C16.0085 2.20902 15.4741 2.00366 14.92 2.00366C14.3659 2.00366 13.8315 2.20902 13.42 2.58005L10 6.00005M6 18H6.01M10 14H10.01M15 6H15.01M18 9H18.01M4 10H12C13.1046 10 14 10.8954 14 12V20C14 21.1046 13.1046 22 12 22H4C2.89543 22 2 21.1046 2 20V12C2 10.8954 2.89543 10 4 10Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
