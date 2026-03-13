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

export interface GlobeSearchProps extends SvgProps {
  className?: string;
}

export const GlobeSearch: React.FC<GlobeSearchProps> = ({
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
        d="M15.9151 15C15.359 17.6299 14.0828 20.0534 12.2291 22C9.66132 19.3038 8.22909 15.7233 8.22909 12C8.22909 8.27674 9.66132 4.69615 12.2291 2C10.381 2.00048 8.56911 2.51311 6.99468 3.48098C5.42025 4.44885 4.14484 5.8341 3.31003 7.48294C2.47521 9.13178 2.11366 10.9797 2.2655 12.8216C2.41735 14.6635 3.07664 16.4273 4.17021 17.9171C5.26377 19.407 6.74882 20.5647 8.46049 21.2616C10.1722 21.9586 12.0435 22.1676 13.8668 21.8654C15.69 21.5632 17.3939 20.7617 18.7892 19.5498C20.1845 18.3379 21.2166 16.763 21.7711 15M2.229 12H10.729M16.229 11C17.0247 11 17.7877 10.6839 18.3503 10.1213C18.9129 9.55871 19.229 8.79565 19.229 8M16.229 11C15.4334 11 14.6703 10.6839 14.1077 10.1213C13.5451 9.55871 13.229 8.79565 13.229 8M16.229 11C17.8859 11 19.229 9.65685 19.229 8M16.229 11C14.5721 11 13.229 9.65685 13.229 8M19.229 8C19.229 7.20435 18.9129 6.44129 18.3503 5.87868C17.7877 5.31607 17.0247 5 16.229 5M19.229 8C19.229 6.34315 17.8859 5 16.229 5M16.229 5C15.4334 5 14.6703 5.31607 14.1077 5.87868C13.5451 6.44129 13.229 7.20435 13.229 8M16.229 5C14.5721 5 13.229 6.34315 13.229 8M20.229 12L18.729 10.5"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
