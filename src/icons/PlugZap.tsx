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

export interface PlugZapProps extends SvgProps {
  className?: string;
}

export const PlugZap: React.FC<PlugZapProps> = ({
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
        d="M2 22L5 19M7.5 13.5L10 11M10.5 16.5L13 14M18 3L14 7H20L16 11M6.30003 20.3C6.523 20.5237 6.78794 20.7013 7.07967 20.8224C7.37139 20.9435 7.68416 21.0059 8.00003 21.0059C8.31591 21.0059 8.62867 20.9435 8.9204 20.8224C9.21212 20.7013 9.47706 20.5237 9.70003 20.3L12 18L6.00003 12L3.70003 14.3C3.47629 14.523 3.29876 14.7879 3.17763 15.0796C3.05649 15.3714 2.99414 15.6841 2.99414 16C2.99414 16.3159 3.05649 16.6286 3.17763 16.9204C3.29876 17.2121 3.47629 17.477 3.70003 17.7L6.30003 20.3Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
