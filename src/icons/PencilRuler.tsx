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

export interface PencilRulerProps extends SvgProps {
  className?: string;
}

export const PencilRuler: React.FC<PencilRulerProps> = ({
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
        d="M15 5L19 9M13 7.00005L8.70005 2.70005C8.24842 2.2506 7.6372 1.99829 7.00005 1.99829C6.36289 1.99829 5.75167 2.2506 5.30005 2.70005L2.70005 5.30005C2.2506 5.75167 1.99829 6.36289 1.99829 7.00005C1.99829 7.6372 2.2506 8.24842 2.70005 8.70005L7.00005 13M8 6L10 4M18 16L20 14M17 11L21.3 15.3C22.24 16.24 22.24 17.76 21.3 18.7L18.7 21.3C17.76 22.24 16.24 22.24 15.3 21.3L11 17M2 21.9999L7.5 20.4999L21.17 6.82989C21.7004 6.29946 21.9984 5.58004 21.9984 4.82989C21.9984 4.07975 21.7004 3.36032 21.17 2.82989C20.6396 2.29946 19.9201 2.00146 19.17 2.00146C18.4199 2.00146 17.7004 2.29946 17.17 2.82989L3.5 16.4999L2 21.9999Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
