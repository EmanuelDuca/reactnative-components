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

export interface BinaryProps extends SvgProps {
  className?: string;
}

export const Binary: React.FC<BinaryProps> = ({
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
        d="M6 20H10M14 10H18M6 14H8V20M14 4H16V10M16 14C17.1046 14 18 14.8954 18 16V18C18 19.1046 17.1046 20 16 20C14.8954 20 14 19.1046 14 18V16C14 14.8954 14.8954 14 16 14ZM8 4C9.10457 4 10 4.89543 10 6V8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8V6C6 4.89543 6.89543 4 8 4Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
