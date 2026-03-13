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

export interface SuperscriptProps extends SvgProps {
  className?: string;
}

export const Superscript: React.FC<SuperscriptProps> = ({
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
        d="M4 19L12 11M12 19L4 11M20 11.9998H16C16 10.4998 16.442 9.99978 17.5 9.49978C18.558 8.99978 20 8.33378 20 7.00178C20 6.52978 19.83 6.07178 19.516 5.71178C19.196 5.34985 18.7613 5.10899 18.2848 5.0296C17.8083 4.95021 17.319 5.03713 16.899 5.27578C16.479 5.51478 16.161 5.88978 16 6.33578"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
