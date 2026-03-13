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

export interface AlignVerticalJustifyEndProps extends SvgProps {
  className?: string;
}

export const AlignVerticalJustifyEnd: React.FC<AlignVerticalJustifyEndProps> = ({
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
        d="M2 22H22M7 12H17C18.1046 12 19 12.8954 19 14V16C19 17.1046 18.1046 18 17 18H7C5.89543 18 5 17.1046 5 16V14C5 12.8954 5.89543 12 7 12ZM9 2H15C16.1046 2 17 2.89543 17 4V6C17 7.10457 16.1046 8 15 8H9C7.89543 8 7 7.10457 7 6V4C7 2.89543 7.89543 2 9 2Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
