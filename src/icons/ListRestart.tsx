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

export interface ListRestartProps extends SvgProps {
  className?: string;
}

export const ListRestart: React.FC<ListRestartProps> = ({
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
        d="M21 6H3M7 12H3M7 18H3M12 18C12.6296 18.8395 13.5075 19.4597 14.5092 19.7726C15.5108 20.0855 16.5856 20.0753 17.5811 19.7434C18.5767 19.4116 19.4426 18.7749 20.0562 17.9236C20.6698 17.0722 21 16.0494 21 15C21 13.8065 20.5259 12.6619 19.682 11.818C18.8381 10.9741 17.6935 10.5 16.5 10.5C15.17 10.5 13.96 11.04 13.09 11.91L11 14M11 14V10M11 14H15"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
