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

export interface FileShieldCheckProps extends SvgProps {
  className?: string;
}

export const FileShieldCheck: React.FC<FileShieldCheckProps> = ({
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
        d="M11 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V9.5M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20M5.5 16.0002L6.5 17.0002L8.5 15.0002M11 16.5002C11 19.0002 9.25 20.2502 7.17 20.9752C7.06108 21.0121 6.94277 21.0104 6.835 20.9702C4.75 20.2502 3 19.0002 3 16.5002V13.0002C3 12.8676 3.05268 12.7404 3.14645 12.6467C3.24021 12.5529 3.36739 12.5002 3.5 12.5002C4.5 12.5002 5.75 11.9002 6.62 11.1402C6.72593 11.0497 6.86068 11 7 11C7.13932 11 7.27407 11.0497 7.38 11.1402C8.255 11.9052 9.5 12.5002 10.5 12.5002C10.6326 12.5002 10.7598 12.5529 10.8536 12.6467C10.9473 12.7404 11 12.8676 11 13.0002V16.5002Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
