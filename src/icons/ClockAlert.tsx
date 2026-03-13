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

export interface ClockAlertProps extends SvgProps {
  className?: string;
}

export const ClockAlert: React.FC<ClockAlertProps> = ({
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
        d="M12 6.00002V12L16 14M20 12V17M20 21H20.01M21.25 8.20002C20.4957 6.3614 19.2106 4.78922 17.5588 3.68415C15.9071 2.57908 13.9635 1.99123 11.9761 1.99563C9.98881 2.00003 8.04785 2.59648 6.40098 3.70886C4.75412 4.82124 3.47605 6.39909 2.72989 8.24104C1.98373 10.083 1.80332 12.1055 2.21169 14.0504C2.62005 15.9954 3.59868 17.7745 5.02265 19.1608C6.44663 20.5471 8.25138 21.4777 10.2066 21.8338C12.1617 22.1899 14.1787 21.9553 16 21.16"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
