import * as React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { cssInterop } from "nativewind";
import { ecn } from "@usekeyhole/utils";

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

export interface GlobeProps extends SvgProps {
  className?: string;
}

export const Globe: React.FC<GlobeProps> = ({
  color = "#404040",
  className,
  style,
  ...props
}) => {
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
        strokeWidth={1.5}
        d="M22 12a10 10 0 01-10 10m10-10A10 10 0 0012 2m10 10H2m10 10A10 10 0 012 12m10 10a14.5 14.5 0 010-20m0 20a14.5 14.5 0 000-20M2 12A10 10 0 0112 2"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
