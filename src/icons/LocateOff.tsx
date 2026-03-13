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

export interface LocateOffProps extends SvgProps {
  className?: string;
}

export const LocateOff: React.FC<LocateOffProps> = ({
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
        d="M2 12H5M5 12C5 10.1 5.83 8.39011 7.11 7.11011M5 12C5 15.87 8.13 19 12 19M19 12H22M19 12C19 12.67 18.9 13.33 18.71 13.96M19 12C19 8.13 15.87 5 12 5M12 2V5M12 5C11.33 5 10.67 5.1 10.04 5.29M12 19V22M12 19C13.9 19 15.61 18.1701 16.89 16.8901M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
