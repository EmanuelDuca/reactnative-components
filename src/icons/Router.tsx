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

export interface RouterProps extends SvgProps {
  className?: string;
}

export const Router: React.FC<RouterProps> = ({
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
        d="M6.01 18H6M10.01 18H10M15 10V14M17.8399 7.16997C17.4684 6.79807 17.0273 6.50303 16.5417 6.30173C16.0561 6.10044 15.5356 5.99683 15.0099 5.99683C14.4843 5.99683 13.9638 6.10044 13.4782 6.30173C12.9926 6.50303 12.5514 6.79807 12.1799 7.16997M20.6601 4.34007C19.16 2.84091 17.1259 1.99878 15.0051 1.99878C12.8843 1.99878 10.8502 2.84091 9.3501 4.34007M4 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V16C2 14.8954 2.89543 14 4 14Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
