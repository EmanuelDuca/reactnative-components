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

export interface CookingPotProps extends SvgProps {
  className?: string;
}

export const CookingPot: React.FC<CookingPotProps> = ({
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
        d="M2 12H22M20 12V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V12M4 8L20 4M8.86 6.78004L8.41 4.97004C8.34553 4.71527 8.33189 4.4503 8.36988 4.19026C8.40787 3.93022 8.49674 3.68022 8.6314 3.45454C8.76606 3.22887 8.94388 3.03194 9.15469 2.87503C9.3655 2.71811 9.60517 2.60428 9.86 2.54004L11.8 2.06004C12.0554 1.99573 12.3211 1.98251 12.5816 2.02114C12.8422 2.05977 13.0926 2.14949 13.3184 2.28515C13.5441 2.42081 13.7409 2.59974 13.8974 2.81166C14.0538 3.02358 14.1669 3.26431 14.23 3.52004L14.68 5.32004"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
