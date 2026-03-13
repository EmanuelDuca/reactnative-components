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

export interface RadioTowerProps extends SvgProps {
  className?: string;
}

export const RadioTower: React.FC<RadioTowerProps> = ({
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
        d="M4.9001 16.0999C1.0001 12.1999 1.0001 5.7999 4.9001 1.8999M7.80015 4.69995C6.85145 5.68293 6.25766 6.95422 6.11277 8.31263C5.96787 9.67104 6.28014 11.039 7.00015 12.2M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11ZM12 11L8 22M12 11L16 22M16.2002 4.80005C18.2002 6.80005 18.4602 9.91005 17.0002 12.27M19.1001 1.8999C20.0271 2.82504 20.7626 3.92393 21.2644 5.13366C21.7662 6.34339 22.0245 7.64022 22.0245 8.9499C22.0245 10.2596 21.7662 11.5564 21.2644 12.7661C20.7626 13.9759 20.0271 15.0748 19.1001 15.9999M9.5 18H14.5"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
