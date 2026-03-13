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

export interface SmilePlusProps extends SvgProps {
  className?: string;
}

export const SmilePlus: React.FC<SmilePlusProps> = ({
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
        d="M21.9999 10.9998V11.9998C21.9898 14.0181 21.3691 15.9862 20.2196 17.6452C19.0701 19.3042 17.4454 20.5765 15.5592 21.2949C13.6731 22.0132 11.6137 22.1441 9.65175 21.6701C7.68984 21.1961 5.91727 20.1396 4.56707 18.6394C3.21686 17.1391 2.35223 15.2655 2.08684 13.2646C1.82144 11.2638 2.1677 9.22951 3.08011 7.42916C3.99251 5.62882 5.42835 4.1467 7.19885 3.17766C8.96935 2.20862 10.9917 1.79802 12.9999 1.99983M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01M16 5H22M19 2V8"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
