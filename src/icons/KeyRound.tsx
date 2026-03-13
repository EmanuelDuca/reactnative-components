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

export interface KeyRoundProps extends SvgProps {
  className?: string;
}

export const KeyRound: React.FC<KeyRoundProps> = ({
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
        fill={color}
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M16.5 8C16.7761 8 17 7.77614 17 7.5C17 7.22386 16.7761 7 16.5 7C16.2239 7 16 7.22386 16 7.5C16 7.77614 16.2239 8 16.5 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M2 17.9999V20.9999C2 21.5999 2.4 21.9999 3 21.9999H7V18.9999H10V15.9999H12L13.4 14.5999C14.7898 15.0841 16.3028 15.0822 17.6915 14.5947C19.0801 14.1071 20.2622 13.1628 21.0444 11.916C21.8265 10.6693 22.1624 9.19409 21.9971 7.73165C21.8318 6.26922 21.1751 4.90617 20.1344 3.86549C19.0937 2.8248 17.7307 2.1681 16.2683 2.00281C14.8058 1.83751 13.3306 2.17341 12.0839 2.95556C10.8372 3.7377 9.89279 4.91979 9.40525 6.30844C8.91771 7.69708 8.91585 9.21008 9.4 10.5999L2 17.9999Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M16.5 8C16.7761 8 17 7.77614 17 7.5C17 7.22386 16.7761 7 16.5 7C16.2239 7 16 7.22386 16 7.5C16 7.77614 16.2239 8 16.5 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
