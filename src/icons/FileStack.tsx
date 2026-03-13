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

export interface FileStackProps extends SvgProps {
  className?: string;
}

export const FileStack: React.FC<FileStackProps> = ({
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
        d="M21 7H18C17.4696 7 16.9609 6.78929 16.5858 6.41421C16.2107 6.03914 16 5.53043 16 5V2M7 8V16.8C7 17.1 7.2 17.4 7.4 17.6C7.6 17.8 7.9 18 8.2 18H15M3 12V20.8C3 21.1 3.2 21.4 3.4 21.6C3.6 21.8 3.9 22 4.2 22H11M21 6V12.5C21 13.3 20.3 14 19.5 14H12.5C11.7 14 11 13.3 11 12.5V3.5C11 2.7 11.7 2 12.5 2H17L21 6Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
