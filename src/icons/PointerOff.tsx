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

export interface PointerOffProps extends SvgProps {
  className?: string;
}

export const PointerOff: React.FC<PointerOffProps> = ({
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
        d="M10.0001 4.49996V3.99996C10 3.70257 9.93361 3.40894 9.80573 3.14045C9.67785 2.87196 9.4917 2.63537 9.26084 2.44791C9.02998 2.26044 8.76021 2.12682 8.47119 2.05676C8.18217 1.98671 7.88116 1.982 7.59009 2.04296M13.8999 8.39998C13.8062 8.10039 13.6434 7.82706 13.4245 7.60208C13.2056 7.37711 12.9368 7.20682 12.6399 7.10498M21.7001 16.2001C21.9019 15.4842 22.0029 14.7438 22.0001 14.0001V11.0001C22.0001 10.4696 21.7894 9.96091 21.4143 9.58584C21.0393 9.21077 20.5305 9.00005 20.0001 9.00005C19.4697 9.00005 18.961 9.21077 18.5859 9.58584C18.2108 9.96091 18.0001 10.4696 18.0001 11.0001V10.0001C17.9999 9.57602 17.865 9.16303 17.6147 8.8207C17.3645 8.47838 17.0119 8.22445 16.608 8.09558C16.204 7.96671 15.7695 7.96957 15.3673 8.10374C14.965 8.23792 14.6158 8.49647 14.3701 8.84205M7.0001 15L5.2001 13.2C4.81554 12.8591 4.31448 12.6792 3.80088 12.6978C3.28728 12.7165 2.80055 12.9321 2.44167 13.2999C2.08279 13.6678 1.8793 14.1598 1.87342 14.6737C1.86754 15.1876 2.05973 15.684 2.4101 16.06L6.0001 19.7C6.77715 20.4907 7.71498 21.1053 8.75014 21.5021C9.7853 21.8989 10.8936 22.0687 12.0001 22H14.0001C15.0507 22.0001 16.091 21.7932 17.0616 21.3911C18.0323 20.9891 18.9142 20.3999 19.6571 19.657M6 6V14M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
