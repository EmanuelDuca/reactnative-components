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

export interface BellElectricProps extends SvgProps {
  className?: string;
}

export const BellElectric: React.FC<BellElectricProps> = ({
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
        d="M18.8 4C19.5646 5.45539 19.9838 7.20214 20 9M9 9H9.01M14 18.9999C17 18.9999 18.6 17.3999 18.6 17.3999M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9ZM6 16H12C13.1046 16 14 16.8954 14 18V20C14 21.1046 13.1046 22 12 22H6C4.89543 22 4 21.1046 4 20V18C4 16.8954 4.89543 16 6 16ZM22 16C22 17.1046 21.1046 18 20 18C18.8954 18 18 17.1046 18 16C18 14.8954 18.8954 14 20 14C21.1046 14 22 14.8954 22 16Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
