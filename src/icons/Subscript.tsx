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

export interface SubscriptProps extends SvgProps {
  className?: string;
}

export const Subscript: React.FC<SubscriptProps> = ({
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
        d="M4 5L12 13M12 5L4 13M20 18.9998H16C16 17.4998 16.44 16.9998 17.5 16.4998C18.56 15.9998 20 15.3298 20 13.9998C20 13.5298 19.83 13.0698 19.52 12.7098C19.1999 12.3473 18.7649 12.1058 18.2879 12.0257C17.811 11.9456 17.321 12.0318 16.9 12.2698C16.48 12.5098 16.16 12.8898 16 13.3398"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
