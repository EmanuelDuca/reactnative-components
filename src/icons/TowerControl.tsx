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

export interface TowerControlProps extends SvgProps {
  className?: string;
}

export const TowerControl: React.FC<TowerControlProps> = ({
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
        d="M8 13V22M16 22V13M9 6L10 13M15 6L14 13M12 6V2M13 2H11M18.2 12.27L20 6H4L5.8 12.27C5.85829 12.4779 5.98233 12.6614 6.15358 12.793C6.32482 12.9246 6.53406 12.9972 6.75 13H17.25C17.4677 12.9994 17.6792 12.9278 17.8524 12.796C18.0257 12.6643 18.1512 12.4796 18.21 12.27H18.2Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
