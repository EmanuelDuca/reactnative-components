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

export interface PopsicleProps extends SvgProps {
  className?: string;
}

export const Popsicle: React.FC<PopsicleProps> = ({
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
        d="M22 22L16.5 16.5M18.5999 14.4C19.3999 13.6 19.3999 12.4 18.5999 11.6L10.4999 3.5C9.55838 2.55848 8.28141 2.02954 6.9499 2.02954C5.61839 2.02954 4.34142 2.55848 3.3999 3.5C2.45838 4.44152 1.92944 5.71849 1.92944 7.05C1.92944 8.38151 2.45838 9.65848 3.3999 10.6L11.4999 18.7C12.3999 19.4 13.5999 19.4 14.3999 18.6L18.5999 14.4Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
