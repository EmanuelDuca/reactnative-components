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

export interface SquareParkingOffProps extends SvgProps {
  className?: string;
}

export const SquareParkingOff: React.FC<SquareParkingOffProps> = ({
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
        d="M3.6001 3.6C3.96936 3.22317 4.47256 3.00751 5.0001 3H19.0001C19.5305 3 20.0392 3.21071 20.4143 3.58579C20.7894 3.96086 21.0001 4.46957 21.0001 5V19C20.9979 19.5296 20.7857 20.0366 20.4101 20.41M3 8.7002V19.0002C3 19.5306 3.21071 20.0393 3.58579 20.4144C3.96086 20.7895 4.46957 21.0002 5 21.0002H15.3M2 2L22 22M13 13C13.7956 13 14.5587 12.6839 15.1213 12.1213C15.6839 11.5587 16 10.7956 16 10C16 9.20435 15.6839 8.44129 15.1213 7.87868C14.5587 7.31607 13.7956 7 13 7H9V9M9 17.0002V14.7002"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
