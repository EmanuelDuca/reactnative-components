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

export interface RecycleProps extends SvgProps {
  className?: string;
}

export const Recycle: React.FC<RecycleProps> = ({
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
        d="M7.00001 19H4.81501C4.49958 19.0009 4.18927 18.9203 3.91418 18.7659C3.6391 18.6116 3.40859 18.3887 3.24501 18.119C3.08792 17.8481 3.00486 17.5407 3.00415 17.2275C3.00345 16.9144 3.08514 16.6066 3.24101 16.335L7.19601 9.5M7.19601 9.5L8.2931 13.596M7.19601 9.5L3.1001 10.598M11 19.0001H19.203C19.5169 18.9977 19.8249 18.9145 20.0974 18.7586C20.3699 18.6028 20.5978 18.3794 20.759 18.1101C20.9139 17.84 20.9954 17.534 20.9954 17.2226C20.9954 16.9112 20.9139 16.6052 20.759 16.3351L19.533 14.2151M11 19.0001L14 16M11 19.0001L14 22M9.34399 5.811L10.437 3.919C10.5939 3.6454 10.8189 3.41701 11.0902 3.25599C11.3614 3.09497 11.6696 3.00679 11.985 3C12.2979 2.99942 12.6055 3.08116 12.8769 3.23703C13.1482 3.39289 13.3738 3.6174 13.531 3.888L17.474 10.731M17.474 10.731L13.3779 9.63301M17.474 10.731L18.5709 6.63501"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
