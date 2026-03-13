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

export interface QrCodeProps extends SvgProps {
  className?: string;
}

export const QrCode: React.FC<QrCodeProps> = ({
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
        d="M21 16H18C17.4696 16 16.9609 16.2107 16.5858 16.5858C16.2107 16.9609 16 17.4696 16 18V21M21 21V21.01M12 7V10C12 10.5304 11.7893 11.0391 11.4142 11.4142C11.0391 11.7893 10.5304 12 10 12H7M3 12H3.01M12 3H12.01M12 16V16.01M16 12H17M21 12V12.01M12 21V20M4 3H7C7.55228 3 8 3.44772 8 4V7C8 7.55228 7.55228 8 7 8H4C3.44772 8 3 7.55228 3 7V4C3 3.44772 3.44772 3 4 3ZM17 3H20C20.5523 3 21 3.44772 21 4V7C21 7.55228 20.5523 8 20 8H17C16.4477 8 16 7.55228 16 7V4C16 3.44772 16.4477 3 17 3ZM4 16H7C7.55228 16 8 16.4477 8 17V20C8 20.5523 7.55228 21 7 21H4C3.44772 21 3 20.5523 3 20V17C3 16.4477 3.44772 16 4 16Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
