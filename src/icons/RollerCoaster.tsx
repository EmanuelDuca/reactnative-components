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

export interface RollerCoasterProps extends SvgProps {
  className?: string;
}

export const RollerCoaster: React.FC<RollerCoasterProps> = ({
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
        d="M6 19V5M6 5C4.93913 5 3.92172 5.42143 3.17157 6.17157C2.42143 6.92172 2 7.93913 2 9V19M6 5C8 5 10 6.33 12 9C14 11.67 16 13 18 13M10 19V6.80005M14 19V11.2M18 5V9M18 19V13M18 13C18.668 12.9994 19.3252 12.8315 19.9117 12.5116C20.4981 12.1917 20.9951 11.73 21.3573 11.1687C21.7195 10.6074 21.9353 9.96436 21.9851 9.29821C22.0349 8.63206 21.9171 7.96404 21.6424 7.35512C21.3677 6.74621 20.9449 6.21578 20.4125 5.81226C19.8801 5.40874 19.2552 5.14497 18.5947 5.04503C17.9342 4.94508 17.2592 5.01214 16.6313 5.24009C16.0034 5.46804 15.4426 5.84962 15 6.35M22 19V9"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
