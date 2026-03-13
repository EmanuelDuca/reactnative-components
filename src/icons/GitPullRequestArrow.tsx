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

export interface GitPullRequestArrowProps extends SvgProps {
  className?: string;
}

export const GitPullRequestArrow: React.FC<GitPullRequestArrowProps> = ({
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
        d="M5 9C6.65685 9 8 7.65685 8 6C8 4.34315 6.65685 3 5 3C3.34315 3 2 4.34315 2 6C2 7.65685 3.34315 9 5 9ZM5 9V21M19 15C17.3431 15 16 16.3431 16 18C16 19.6569 17.3431 21 19 21C20.6569 21 22 19.6569 22 18C22 16.3431 20.6569 15 19 15ZM19 15V8C19 7.46957 18.7893 6.96086 18.4142 6.58579C18.0391 6.21071 17.5304 6 17 6H12M15 9L12 6M12 6L15 3"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
