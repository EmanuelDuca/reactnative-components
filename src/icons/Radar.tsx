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

export interface RadarProps extends SvgProps {
  className?: string;
}

export const Radar: React.FC<RadarProps> = ({
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
        d="M6.98999 3.34005C8.89743 2.23728 11.1157 1.79532 13.3001 2.08284C15.4845 2.37036 17.5129 3.37126 19.07 4.93005L13.4099 10.5899M4 6H4.01M2.29011 9.6201C1.9152 11.1472 1.90569 12.7411 2.26233 14.2725C2.61898 15.804 3.33174 17.2297 4.34274 18.434C5.35374 19.6383 6.63449 20.5872 8.08101 21.2037C9.52752 21.8202 11.099 22.0869 12.6679 21.9822C14.2369 21.8774 15.759 21.4041 17.1107 20.6008C18.4624 19.7975 19.6056 18.6867 20.4475 17.3587C21.2894 16.0306 21.8063 14.5228 21.9562 12.9575C22.1061 11.3923 21.8847 9.81376 21.3101 8.3501M16.24 7.75992C15.6646 7.18108 14.977 6.72575 14.2195 6.42179C13.462 6.11783 12.6504 5.97163 11.8344 5.99213C11.0184 6.01263 10.2152 6.1994 9.47391 6.54103C8.7326 6.88265 8.0688 7.37193 7.5231 7.97894C6.97741 8.58594 6.56131 9.29791 6.30025 10.0713C6.0392 10.8446 5.93868 11.6631 6.00486 12.4767C6.07103 13.2902 6.30251 14.0817 6.68512 14.8027C7.06772 15.5237 7.59342 16.1591 8.23004 16.6699M12 18H12.01M17.99 11.6599C18.0444 12.6113 17.8714 13.5619 17.4854 14.4332C17.0993 15.3044 16.5113 16.0711 15.77 16.6699M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
