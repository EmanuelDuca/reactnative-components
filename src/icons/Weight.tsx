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

export interface WeightProps extends SvgProps {
  className?: string;
}

export const Weight: React.FC<WeightProps> = ({
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
        d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M6.49997 8C6.06723 8.00449 5.64761 8.14923 5.30412 8.41248C4.96063 8.67573 4.71179 9.0433 4.59497 9.46L2.09997 18.5C2.02437 18.7926 2.01606 19.0985 2.07565 19.3947C2.13525 19.691 2.2612 19.9699 2.44405 20.2105C2.6269 20.4511 2.8619 20.6471 3.13138 20.7839C3.40086 20.9206 3.69783 20.9945 3.99997 21H20C20.3086 20.9999 20.6131 20.9283 20.8895 20.7909C21.1659 20.6535 21.4068 20.454 21.5932 20.208C21.7796 19.962 21.9066 19.6762 21.9642 19.3729C22.0217 19.0697 22.0083 18.7572 21.925 18.46L19.4 9.5C19.2898 9.07341 19.0419 8.69512 18.6947 8.42388C18.3476 8.15265 17.9205 8.00364 17.48 8H6.49997Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
