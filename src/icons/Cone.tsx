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

export interface ConeProps extends SvgProps {
  className?: string;
}

export const Cone: React.FC<ConeProps> = ({
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
        d="M20.9001 18.55L12.9001 2.56997C12.8182 2.4009 12.6904 2.25831 12.5312 2.15854C12.372 2.05877 12.188 2.00586 12.0001 2.00586C11.8122 2.00586 11.6282 2.05877 11.469 2.15854C11.3098 2.25831 11.182 2.4009 11.1001 2.56997L3.1001 18.55M21 19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19C3 17.3431 7.02944 16 12 16C16.9706 16 21 17.3431 21 19Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
