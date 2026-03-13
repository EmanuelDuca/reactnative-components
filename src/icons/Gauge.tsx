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

export interface GaugeProps extends SvgProps {
  className?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
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
        d="M12 14L16 10M3.34 19C2.46222 17.4798 2.00007 15.7553 2 13.9999C1.99993 12.2445 2.46195 10.52 3.33962 8.99973C4.21729 7.47948 5.47967 6.21705 6.99989 5.33932C8.52011 4.4616 10.2446 3.99951 12 3.99951C13.7554 3.99951 15.4799 4.4616 17.0001 5.33932C18.5203 6.21705 19.7827 7.47948 20.6604 8.99973C21.538 10.52 22.0001 12.2445 22 13.9999C21.9999 15.7553 21.5378 17.4798 20.66 19"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
