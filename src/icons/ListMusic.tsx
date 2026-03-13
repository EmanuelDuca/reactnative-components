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

export interface ListMusicProps extends SvgProps {
  className?: string;
}

export const ListMusic: React.FC<ListMusicProps> = ({
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
        d="M21 15V6M12 12H3M16 6H3M12 18H3M18.5 18C19.163 18 19.7989 17.7366 20.2678 17.2678C20.7366 16.7989 21 16.163 21 15.5C21 14.837 20.7366 14.2011 20.2678 13.7322C19.7989 13.2634 19.163 13 18.5 13C17.837 13 17.2011 13.2634 16.7322 13.7322C16.2634 14.2011 16 14.837 16 15.5C16 16.163 16.2634 16.7989 16.7322 17.2678C17.2011 17.7366 17.837 18 18.5 18Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
