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

export interface AlignHorizontalJustifyCenterProps extends SvgProps {
  className?: string;
}

export const AlignHorizontalJustifyCenter: React.FC<AlignHorizontalJustifyCenterProps> = ({
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
        d="M12 2V22M4 5H6C7.10457 5 8 5.89543 8 7V17C8 18.1046 7.10457 19 6 19H4C2.89543 19 2 18.1046 2 17V7C2 5.89543 2.89543 5 4 5ZM18 7H20C21.1046 7 22 7.89543 22 9V15C22 16.1046 21.1046 17 20 17H18C16.8954 17 16 16.1046 16 15V9C16 7.89543 16.8954 7 18 7Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
