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

export interface AlignVerticalDistributeEndProps extends SvgProps {
  className?: string;
}

export const AlignVerticalDistributeEnd: React.FC<AlignVerticalDistributeEndProps> = ({
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
        d="M2 20H22M2 10H22M7 14H17C18.1046 14 19 14.8954 19 16V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V16C5 14.8954 5.89543 14 7 14ZM9 4H15C16.1046 4 17 4.89543 17 6V8C17 9.10457 16.1046 10 15 10H9C7.89543 10 7 9.10457 7 8V6C7 4.89543 7.89543 4 9 4Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
