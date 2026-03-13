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

export interface ParkingMeterProps extends SvgProps {
  className?: string;
}

export const ParkingMeter: React.FC<ParkingMeterProps> = ({
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
        d="M9 9C9 8.20435 9.31607 7.44129 9.87868 6.87868C10.4413 6.31607 11.2044 6 12 6C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9M12 12V15M11 15H13M12 19V22M18.9999 8.99995C19.0046 7.97921 18.786 6.9698 18.3594 6.04246C17.9329 5.11512 17.3086 4.29229 16.5305 3.63164C15.7524 2.971 14.8392 2.48852 13.855 2.21803C12.8707 1.94753 11.8392 1.89557 10.8328 2.06578C9.8263 2.23599 8.86924 2.62425 8.02867 3.20335C7.1881 3.78246 6.48434 4.53839 5.96674 5.41817C5.44913 6.29794 5.13019 7.28028 5.03228 8.29632C4.93437 9.31236 5.05985 10.3375 5.39993 11.2999C6.39993 14.3999 7.99993 18.9999 7.99993 18.9999H15.9999C15.9999 18.9999 17.5999 14.3999 18.5999 11.2999C18.8999 10.4999 18.9999 9.79995 18.9999 8.99995Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
