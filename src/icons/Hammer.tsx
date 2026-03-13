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

export interface HammerProps extends SvgProps {
  className?: string;
}

export const Hammer: React.FC<HammerProps> = ({
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
        d="M14.9999 12L6.62694 20.373C6.22911 20.7708 5.68954 20.9943 5.12694 20.9943C4.56433 20.9943 4.02476 20.7708 3.62694 20.373C3.22911 19.9752 3.00562 19.4356 3.00562 18.873C3.00562 18.3104 3.22911 17.7708 3.62694 17.373L11.9999 9M18 15L22 11M21.5 11.5L19.586 9.58596C19.2109 9.21098 19.0001 8.70235 19 8.17196V6.99996L16.74 4.73996C15.6245 3.62515 14.115 2.99432 12.538 2.98396L9 2.95996L9.92 3.77996C10.5735 4.35935 11.0967 5.07066 11.4552 5.867C11.8137 6.66335 11.9994 7.52663 12 8.39996V9.99996L14 12H15.172C15.7024 12.0001 16.211 12.2109 16.586 12.586L18.5 14.5"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
