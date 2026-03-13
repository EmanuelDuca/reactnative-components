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

export interface MedalProps extends SvgProps {
  className?: string;
}

export const Medal: React.FC<MedalProps> = ({
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
        d="M7.20996 15L2.65996 7.14C2.46376 6.80087 2.37149 6.41159 2.3946 6.02048C2.41771 5.62937 2.55518 5.25366 2.78996 4.94L4.39996 2.8C4.58625 2.55161 4.82782 2.35 5.10553 2.21115C5.38324 2.07229 5.68947 2 5.99996 2H18C18.3104 2 18.6167 2.07229 18.8944 2.21115C19.1721 2.35 19.4137 2.55161 19.6 2.8L21.2 4.94C21.4363 5.25265 21.5755 5.62784 21.6004 6.01897C21.6253 6.4101 21.5347 6.79992 21.34 7.14L16.79 15M11.0001 12L5.12012 2.19995M13 12L18.88 2.19995M8 7H16M12 18V16H11.5M17 17C17 19.7614 14.7614 22 12 22C9.23858 22 7 19.7614 7 17C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
