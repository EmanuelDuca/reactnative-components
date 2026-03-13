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

export interface PenProps extends SvgProps {
  className?: string;
}

export const Pen: React.FC<PenProps> = ({
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
        d="M17 3C17.2547 2.69903 17.5697 2.45405 17.925 2.28068C18.2803 2.1073 18.6681 2.00933 19.0636 1.99301C19.4592 1.97669 19.8538 2.04238 20.2224 2.18588C20.5909 2.32939 20.9254 2.54757 21.2043 2.82652C21.4833 3.10546 21.7006 3.43906 21.8425 3.80604C21.9845 4.17302 22.0478 4.56533 22.0286 4.95797C22.0094 5.35062 21.908 5.73498 21.7309 6.08656C21.5538 6.43814 21.3049 6.74923 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
