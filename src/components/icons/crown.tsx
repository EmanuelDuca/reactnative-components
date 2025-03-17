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
    //@ts-ignore
    target: "style",
    nativeStyleToProp: {
      stroke: true,
      //@ts-ignore
      strokeWidth: true,
      fill: true,
    },
  },
});

export interface CrownProps extends SvgProps {
  className?: string;
}

export const Crown: React.FC<CrownProps> = ({
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M5 21h14M11.562 3.266a.5.5 0 01.876 0L15.39 8.87a1 1 0 001.516.294L21.183 5.5a.5.5 0 01.798.519l-2.834 10.246a.999.999 0 01-.956.734H5.81a1 1 0 01-.957-.734L2.02 6.02a.5.5 0 01.798-.52l4.276 3.665A1 1 0 008.61 8.87l2.952-5.605z"
        //@ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
