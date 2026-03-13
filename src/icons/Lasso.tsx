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

export interface LassoProps extends SvgProps {
  className?: string;
}

export const Lasso: React.FC<LassoProps> = ({
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
        d="M7 22C6.37902 21.5343 5.875 20.9303 5.52786 20.2361C5.18073 19.5418 5 18.7762 5 18M5 18C5.53043 18 6.03914 17.7893 6.41421 17.4142C6.78929 17.0391 7 16.5304 7 16C7 15.4696 6.78929 14.9609 6.41421 14.5858C6.03914 14.2107 5.53043 14 5 14C4.46957 14 3.96086 14.2107 3.58579 14.5858C3.21071 14.9609 3 15.4696 3 16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18ZM3.3 14C2.45485 12.8376 1.99974 11.4372 2 10C2 5.6 6.5 2 12 2C17.5 2 22 5.6 22 10C22 14.4 17.5 18 12 18C10.2809 18.0287 8.57578 17.6877 7 17"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
