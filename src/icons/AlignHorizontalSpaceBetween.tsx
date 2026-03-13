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

export interface AlignHorizontalSpaceBetweenProps extends SvgProps {
  className?: string;
}

export const AlignHorizontalSpaceBetween: React.FC<AlignHorizontalSpaceBetweenProps> = ({
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
        d="M3 2V22M21 2V22M5 5H7C8.10457 5 9 5.89543 9 7V17C9 18.1046 8.10457 19 7 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5ZM17 7H19C20.1046 7 21 7.89543 21 9V15C21 16.1046 20.1046 17 19 17H17C15.8954 17 15 16.1046 15 15V9C15 7.89543 15.8954 7 17 7Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
