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

export interface GlobeQuestionProps extends SvgProps {
  className?: string;
}

export const GlobeQuestion: React.FC<GlobeQuestionProps> = ({
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
        d="M15.9151 15C15.359 17.6299 14.0828 20.0534 12.2291 22C9.66132 19.3038 8.22909 15.7233 8.22909 12C8.22909 8.27674 9.66132 4.69615 12.2291 2C10.381 2.00048 8.56911 2.51311 6.99468 3.48098C5.42025 4.44885 4.14484 5.8341 3.31003 7.48294C2.47521 9.13178 2.11366 10.9797 2.2655 12.8216C2.41735 14.6635 3.07664 16.4273 4.17021 17.9171C5.26377 19.407 6.74882 20.5647 8.46049 21.2616C10.1722 21.9586 12.0435 22.1676 13.8668 21.8654C15.69 21.5632 17.3939 20.7617 18.7892 19.5498C20.1845 18.3379 21.2166 16.763 21.7711 15M2.229 12H10.729M15.229 5.27002C15.429 4.87002 15.729 4.47002 16.129 4.27002C16.5431 4.03059 17.0266 3.93973 17.4994 4.01247C17.9722 4.08521 18.406 4.31719 18.729 4.67002C19.029 5.07002 19.229 5.47002 19.229 5.97002C19.229 7.27002 17.229 7.97002 17.229 7.97002M17.229 11.99V12"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
