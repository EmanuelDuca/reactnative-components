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

export interface FileAudio2Props extends SvgProps {
  className?: string;
}

export const FileAudio2: React.FC<FileAudio2Props> = ({
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
        d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V6M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20M2 17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17C4 16.4477 3.55228 16 3 16C2.44772 16 2 16.4477 2 17ZM2 17V14C2 12.9391 2.42143 11.9217 3.17157 11.1716C3.92172 10.4214 4.93913 10 6 10C7.06087 10 8.07828 10.4214 8.82843 11.1716C9.57857 11.9217 10 12.9391 10 14V17M10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
