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

export interface ShieldHalfProps extends SvgProps {
  className?: string;
}

export const ShieldHalf: React.FC<ShieldHalfProps> = ({
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
        d="M12 1.99951C11.7214 1.99951 11.4519 2.09896 11.24 2.27996C9.5 3.79996 7 4.99996 5 4.99996C4.73478 4.99996 4.48043 5.10532 4.29289 5.29285C4.10536 5.48039 4 5.73474 4 5.99996V13C4 18 7.5 20.5 11.67 21.94C11.8855 22.0202 12.1222 22.0238 12.34 21.95C16.5 20.5 20 18 20 13V5.99996C20 5.73474 19.8946 5.48039 19.7071 5.29285C19.5196 5.10532 19.2652 4.99996 19 4.99996C17 4.99996 14.51 3.80996 12.76 2.27996C12.5481 2.09896 12.2786 1.99951 12 1.99951ZM12 1.99951V22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
