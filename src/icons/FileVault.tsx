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

export interface FileVaultProps extends SvgProps {
  className?: string;
}

export const FileVault: React.FC<FileVaultProps> = ({
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
        d="M4.5 13.5L6.22217 15.2222M7.77772 15.2222L9.5 13.5M4.5 18.5L6.22217 16.7777M7.77772 16.7777L9.5 18.5M14.5 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V8M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20M3.11111 11H10.8889C11.5025 11 12 11.4975 12 12.1111V19.8889C12 20.5025 11.5025 21 10.8889 21H3.11111C2.49746 21 2 20.5025 2 19.8889V12.1111C2 11.4975 2.49746 11 3.11111 11ZM4.77778 13.5C4.77778 13.6534 4.65341 13.7778 4.5 13.7778C4.34659 13.7778 4.22222 13.6534 4.22222 13.5C4.22222 13.3466 4.34659 13.2222 4.5 13.2222C4.65341 13.2222 4.77778 13.3466 4.77778 13.5ZM9.77778 13.5C9.77778 13.6534 9.65341 13.7778 9.5 13.7778C9.34659 13.7778 9.22222 13.6534 9.22222 13.5C9.22222 13.3466 9.34659 13.2222 9.5 13.2222C9.65341 13.2222 9.77778 13.3466 9.77778 13.5ZM4.77778 18.5C4.77778 18.6534 4.65341 18.7778 4.5 18.7778C4.34659 18.7778 4.22222 18.6534 4.22222 18.5C4.22222 18.3466 4.34659 18.2222 4.5 18.2222C4.65341 18.2222 4.77778 18.3466 4.77778 18.5ZM9.77778 18.5C9.77778 18.6534 9.65341 18.7778 9.5 18.7778C9.34659 18.7778 9.22222 18.6534 9.22222 18.5C9.22222 18.3466 9.34659 18.2222 9.5 18.2222C9.65341 18.2222 9.77778 18.3466 9.77778 18.5ZM8.11111 16C8.11111 16.6136 7.61365 17.1111 7 17.1111C6.38635 17.1111 5.88889 16.6136 5.88889 16C5.88889 15.3864 6.38635 14.8889 7 14.8889C7.61365 14.8889 8.11111 15.3864 8.11111 16Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
