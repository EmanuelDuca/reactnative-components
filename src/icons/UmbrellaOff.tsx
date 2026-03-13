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

export interface UmbrellaOffProps extends SvgProps {
  className?: string;
}

export const UmbrellaOff: React.FC<UmbrellaOffProps> = ({
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
        d="M12 2V3M15.5 20.9998C15.3083 21.3882 14.9864 21.697 14.5904 21.8724C14.1943 22.0478 13.7493 22.0787 13.3329 21.9597C12.9164 21.8407 12.5549 21.5794 12.3113 21.2212C12.0678 20.8631 11.9576 20.4308 12 19.9998V11.9998H2C2.25786 9.44982 3.48497 7.09619 5.428 5.4248M17.4999 12.0001H21.9999C21.8537 10.5162 21.3775 9.08371 20.6062 7.8076C19.8349 6.53149 18.7879 5.44403 17.542 4.62482C16.2961 3.80562 14.8827 3.27541 13.4054 3.07302C11.9281 2.87062 10.4242 3.00116 9.00391 3.45508M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
