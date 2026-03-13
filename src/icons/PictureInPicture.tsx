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

export interface PictureInPictureProps extends SvgProps {
  className?: string;
}

export const PictureInPicture: React.FC<PictureInPictureProps> = ({
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
        d="M8 4.5V9.5M8 9.5H3M8 9.5L2 3.5M21 9.5V6.5C21 5.34 20.16 4.5 19 4.5H12M3 13.5V15.5C3 16.55 3.95 17.5 5 17.5H8M14 13.5H20C21.1046 13.5 22 14.3954 22 15.5V18.5C22 19.6046 21.1046 20.5 20 20.5H14C12.8954 20.5 12 19.6046 12 18.5V15.5C12 14.3954 12.8954 13.5 14 13.5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
