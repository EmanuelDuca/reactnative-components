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

export interface DrumProps extends SvgProps {
  className?: string;
}

export const Drum: React.FC<DrumProps> = ({
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
        d="M2 2L10 10M22 2L14 10M22 9C22 11.7614 17.5228 14 12 14M22 9C22 6.23858 17.5228 4 12 4C6.47715 4 2 6.23858 2 9M22 9V17C22 18.3261 20.9464 19.5979 19.0711 20.5355C17.1957 21.4732 14.6522 22 12 22M12 14C6.47715 14 2 11.7614 2 9M12 14V22M2 9V17C2 18.3261 3.05357 19.5979 4.92893 20.5355C6.8043 21.4732 9.34784 22 12 22M7 13.3999V21.2999M17 13.3999V21.2999"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
