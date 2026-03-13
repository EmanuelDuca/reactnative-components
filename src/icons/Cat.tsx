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

export interface CatProps extends SvgProps {
  className?: string;
}

export const Cat: React.FC<CatProps> = ({
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
        d="M8 14V14.5M16 14V14.5M12.0001 5.00002C12.6701 5.00002 13.3501 5.09002 14.0001 5.26002C15.7801 3.26002 19.0301 2.42002 20.4201 3.00002C21.8201 3.58002 20.0001 10 20.0001 10C20.5701 11.07 21.0001 12.24 21.0001 13.44C21.0001 17.9 16.9701 21 12.0001 21C7.03008 21 3.00008 18 3.00008 13.44C3.00008 12.19 3.50008 11.04 4.00008 10C4.00008 10 2.11008 3.58002 3.50008 3.00002C4.89008 2.42002 8.22008 3.23002 10.0001 5.23002C10.6561 5.07913 11.3269 5.00198 12.0001 5.00002ZM11.25 16.25H12.75L12 17L11.25 16.25Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
