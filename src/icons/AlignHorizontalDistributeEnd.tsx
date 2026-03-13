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

export interface AlignHorizontalDistributeEndProps extends SvgProps {
  className?: string;
}

export const AlignHorizontalDistributeEnd: React.FC<AlignHorizontalDistributeEndProps> = ({
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
        d="M10 2V22M20 2V22M6 5H8C9.10457 5 10 5.89543 10 7V17C10 18.1046 9.10457 19 8 19H6C4.89543 19 4 18.1046 4 17V7C4 5.89543 4.89543 5 6 5ZM16 7H18C19.1046 7 20 7.89543 20 9V15C20 16.1046 19.1046 17 18 17H16C14.8954 17 14 16.1046 14 15V9C14 7.89543 14.8954 7 16 7Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
