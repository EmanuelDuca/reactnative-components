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
    // @ts-ignore
    nativeStyleToProp: {
      // @ts-ignore
      stroke: true,
      // @ts-ignore
      strokeWidth: true,
      fill: true,
    },
  },
});

export interface BellProps extends SvgProps {
  className?: string;
}

export const Bell: React.FC<BellProps> = ({
  color = "#262626",
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
      // @ts-ignore
      className={className}
      style={style}
      {...props}
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.3 21a1.94 1.94 0 0 0 2.688.735A1.94 1.94 0 0 0 13.7 21M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
