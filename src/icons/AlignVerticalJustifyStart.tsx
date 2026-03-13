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

export interface AlignVerticalJustifyStartProps extends SvgProps {
  className?: string;
}

export const AlignVerticalJustifyStart: React.FC<AlignVerticalJustifyStartProps> = ({
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
        d="M2 2H22M7 16H17C18.1046 16 19 16.8954 19 18V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V18C5 16.8954 5.89543 16 7 16ZM9 6H15C16.1046 6 17 6.89543 17 8V10C17 11.1046 16.1046 12 15 12H9C7.89543 12 7 11.1046 7 10V8C7 6.89543 7.89543 6 9 6Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
