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

export interface TrafficConeProps extends SvgProps {
  className?: string;
}

export const TrafficCone: React.FC<TrafficConeProps> = ({
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
        d="M9.2998 6.2002C10.0819 6.77681 11.0281 7.08789 11.9998 7.08789C12.9715 7.08789 13.9177 6.77681 14.6998 6.2002M7.8999 10.7002C8.7999 11.5002 10.2999 12.0002 11.9999 12.0002C13.6999 12.0002 15.1999 11.5002 16.0999 10.7002M7.5 12.2001L2.8 14.9001C2.3 15.2001 2 15.6001 2 16.0001C2 16.4001 2.3 16.8001 2.8 17.1001L10.4 21.6001C11.3 22.1001 12.5 22.1001 13.4 21.6001L21 17.1001C21.7 16.8001 22 16.4001 22 16.0001C22 15.6001 21.7 15.2001 21.2 14.9001L16.5 12.1001M13.9 3.49984C13.833 3.05109 13.61 2.6403 13.2702 2.33962C12.9304 2.03894 12.4955 1.86758 12.042 1.85565C11.5884 1.84371 11.1451 1.99196 10.79 2.27435C10.4348 2.55675 10.1905 2.95523 10.1 3.39984L7.1 13.3998C7 13.5998 7 13.7998 7 13.9998C7 15.6998 9.2 16.9998 12 16.9998C14.8 16.9998 17 15.6998 17 13.9998C17 13.7998 17 13.5998 16.9 13.4998L13.9 3.49984Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
