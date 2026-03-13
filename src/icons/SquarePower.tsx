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

export interface SquarePowerProps extends SvgProps {
  className?: string;
}

export const SquarePower: React.FC<SquarePowerProps> = ({
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
        d="M12 7V12M7.99977 9C7.49257 9.75476 7.19468 10.6306 7.13651 11.5381C7.07833 12.4455 7.26195 13.3522 7.66862 14.1656C8.0753 14.9789 8.69047 15.6698 9.45137 16.1678C10.2123 16.6657 11.0916 16.9529 11.9998 17C12.9362 17.0193 13.8589 16.7726 14.6607 16.2884C15.4625 15.8042 16.1104 15.1025 16.5293 14.2648C16.9482 13.427 17.1208 12.4876 17.027 11.5557C16.9333 10.6238 16.5771 9.73755 15.9998 9M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
