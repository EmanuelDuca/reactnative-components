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

export interface WarehouseProps extends SvgProps {
  className?: string;
}

export const Warehouse: React.FC<WarehouseProps> = ({
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
        d="M6 18H18M6 14H18M22 8.35014V20.0001C22 20.5306 21.7893 21.0393 21.4142 21.4144C21.0391 21.7894 20.5304 22.0001 20 22.0001H4C3.46957 22.0001 2.96086 21.7894 2.58579 21.4144C2.21071 21.0393 2 20.5306 2 20.0001V8.35014C2.00161 7.95129 2.12244 7.56203 2.34696 7.23237C2.57149 6.90271 2.88945 6.64771 3.26 6.50014L11.26 3.30014C11.7352 3.11089 12.2648 3.11089 12.74 3.30014L20.74 6.50014C21.1106 6.64771 21.4285 6.90271 21.653 7.23237C21.8776 7.56203 21.9984 7.95129 22 8.35014ZM6 10H18V22H6V10Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
