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

export interface PocketKnifeProps extends SvgProps {
  className?: string;
}

export const PocketKnife: React.FC<PocketKnifeProps> = ({
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
        d="M3 2V3C3 4 5 4 5 5C5 6 3 6 3 7C3 8 5 8 5 9C5 10 3 10 3 11C3 12 5 12 5 13M18 6H18.01M6 18H6.01M18 11.66V22C19.0609 22 20.0783 21.5786 20.8284 20.8284C21.5786 20.0783 22 19.0609 22 18V6M20.83 8.83003C21.2017 8.45839 21.4965 8.01718 21.6976 7.53161C21.8987 7.04604 22.0023 6.52561 22.0023 6.00003C22.0023 5.47445 21.8987 4.95401 21.6976 4.46844C21.4965 3.98287 21.2017 3.54167 20.83 3.17003C20.4584 2.79839 20.0172 2.50358 19.5316 2.30245C19.046 2.10132 18.5256 1.9978 18 1.9978C17.4744 1.9978 16.954 2.10132 16.4684 2.30245C15.9829 2.50358 15.5417 2.79839 15.17 3.17003L3.17003 15.17C2.41946 15.9206 1.9978 16.9386 1.9978 18C1.9978 18.5256 2.10132 19.046 2.30245 19.5316C2.50358 20.0172 2.79839 20.4584 3.17003 20.83C3.54167 21.2017 3.98287 21.4965 4.46844 21.6976C4.95401 21.8987 5.47445 22.0023 6.00003 22.0023C7.06148 22.0023 8.07946 21.5806 8.83003 20.83L20.83 8.83003Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
