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

export interface ContainerProps extends SvgProps {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
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
        d="M10.0001 21.9001V14.0001M10.0001 14.0001L2.1001 9.1001M10.0001 14.0001L21.9 7.1001M14 19.7999V11.7M18 17.4999V9.3999M22 7.6999C22 7.0999 21.6 6.4999 21.2 6.1999L14.9 2.2999C14.6409 2.15263 14.348 2.0752 14.05 2.0752C13.752 2.0752 13.4591 2.15263 13.2 2.2999L2.9 8.2999C2.4 8.4999 2 9.0999 2 9.6999V16.2999C2 16.7999 2.4 17.4999 2.8 17.7999L9.1 21.6999C9.35908 21.8472 9.65198 21.9246 9.95 21.9246C10.248 21.9246 10.5409 21.8472 10.8 21.6999L21.1 15.6999C21.6 15.3999 22 14.6999 22 14.1999V7.6999Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
