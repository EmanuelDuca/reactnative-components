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

export interface ComputerProps extends SvgProps {
  className?: string;
}

export const Computer: React.FC<ComputerProps> = ({
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
        d="M6 18H8M12 18H18M7 2H17C18.1046 2 19 2.89543 19 4V8C19 9.10457 18.1046 10 17 10H7C5.89543 10 5 9.10457 5 8V4C5 2.89543 5.89543 2 7 2ZM4 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V16C2 14.8954 2.89543 14 4 14Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
