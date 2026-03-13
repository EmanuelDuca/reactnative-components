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

export interface ThermometerSunProps extends SvgProps {
  className?: string;
}

export const ThermometerSun: React.FC<ThermometerSunProps> = ({
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
        d="M12 9.00003C11.1077 8.98565 10.2363 9.27007 9.52424 9.80803C8.81222 10.346 8.30055 11.1066 8.07061 11.9689C7.84067 12.8311 7.90568 13.7455 8.25529 14.5666C8.6049 15.3876 9.21903 16.0682 10 16.5M12 3V5M6.59995 18.3999L5.19995 19.7999M4 13H2M6.33993 7.34018L4.92993 5.93018M20 4V14.54C20.7626 14.9803 21.3586 15.6599 21.6955 16.4734C22.0325 17.2869 22.0916 18.1888 21.8637 19.0394C21.6358 19.8899 21.1336 20.6415 20.435 21.1775C19.7365 21.7136 18.8805 22.0041 18 22.0041C17.1195 22.0041 16.2635 21.7136 15.565 21.1775C14.8664 20.6415 14.3642 19.8899 14.1363 19.0394C13.9084 18.1888 13.9675 17.2869 14.3045 16.4734C14.6415 15.6599 15.2374 14.9803 16 14.54V4C16 3.46957 16.2107 2.96086 16.5858 2.58579C16.9609 2.21071 17.4696 2 18 2C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
