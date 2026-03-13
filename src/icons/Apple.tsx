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

export interface AppleProps extends SvgProps {
  className?: string;
}

export const Apple: React.FC<AppleProps> = ({
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
        d="M12 7.00007C13 6.44007 14.78 5.00007 17 5.00007C18.2955 4.97588 19.548 5.46474 20.4846 6.36012C21.4212 7.2555 21.9659 8.4848 22 9.78007C22 14.0001 19 22.0001 16 22.0001C14.75 22.0001 13.5 20.9401 12 20.9401C10.5 20.9401 9.25 22.0001 8 22.0001C5 22.0001 2 14.0001 2 9.78007C2.03147 8.48393 2.57536 7.25309 3.51253 6.35716C4.4497 5.46122 5.70375 4.97323 7 5.00007C9.22 5.00007 11 6.44007 12 7.00007ZM12 7.00007C12 4.00007 11 2.5 10 2"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
