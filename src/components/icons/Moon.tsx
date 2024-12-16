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

export interface MoonProps extends SvgProps {
  className?: string;
}

export const Moon: React.FC<MoonProps> = ({
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
        d="M12 3a6.364 6.364 0 109 9 9 9 0 01-10.756 8.827A9 9 0 017 4.517 9 9 0 0112 3z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
