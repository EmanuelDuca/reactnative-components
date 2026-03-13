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

export interface KeySquareProps extends SvgProps {
  className?: string;
}

export const KeySquare: React.FC<KeySquareProps> = ({
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
        d="M14 7L17 10M9.4 10.6001L2 18.0001V21.0001C2 21.6001 2.4 22.0001 3 22.0001H7V19.0001H10V16.0001H12L13.4 14.6001M12.3999 2.6999C13.2999 1.7999 14.8999 1.7999 15.7999 2.6999L21.2999 8.1999C22.1999 9.0999 22.1999 10.6999 21.2999 11.5999L17.5999 15.2999C16.6999 16.1999 15.0999 16.1999 14.1999 15.2999L8.6999 9.7999C7.7999 8.8999 7.7999 7.2999 8.6999 6.3999L12.3999 2.6999Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
