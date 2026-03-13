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

export interface Heading3Props extends SvgProps {
  className?: string;
}

export const Heading3: React.FC<Heading3Props> = ({
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
        d="M4 12H12M4 18V6M12 18V6M17.5 10.4999C19.2 9.49994 21 10.4999 21 11.9999C21 12.5304 20.7893 13.0391 20.4142 13.4142C20.0391 13.7892 19.5304 13.9999 19 13.9999C19.5304 13.9999 20.0391 14.2107 20.4142 14.5858C20.7893 14.9609 21 15.4696 21 16C21 17.8 19 19 17 17.5"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
