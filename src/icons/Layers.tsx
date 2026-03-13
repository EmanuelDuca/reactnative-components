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

export interface LayersProps extends SvgProps {
  className?: string;
}

export const Layers: React.FC<LayersProps> = ({
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
        d="M22 17.6499L12.83 21.8099C12.5694 21.9288 12.2864 21.9903 12 21.9903C11.7136 21.9903 11.4306 21.9288 11.17 21.8099L2 17.6499M22 12.6499L12.83 16.8099C12.5694 16.9288 12.2864 16.9903 12 16.9903C11.7136 16.9903 11.4306 16.9288 11.17 16.8099L2 12.6499M12.83 2.18011C12.5694 2.06126 12.2864 1.99976 12 1.99976C11.7136 1.99976 11.4305 2.06126 11.17 2.18011L2.59996 6.08011C2.42251 6.15836 2.27164 6.28651 2.16573 6.44897C2.05981 6.61143 2.00342 6.80118 2.00342 6.99511C2.00342 7.18905 2.05981 7.3788 2.16573 7.54126C2.27164 7.70371 2.42251 7.83187 2.59996 7.91011L11.18 11.8201C11.4405 11.939 11.7236 12.0005 12.01 12.0005C12.2964 12.0005 12.5794 11.939 12.84 11.8201L21.42 7.92011C21.5974 7.84187 21.7483 7.71371 21.8542 7.55126C21.9601 7.3888 22.0165 7.19905 22.0165 7.00511C22.0165 6.81118 21.9601 6.62143 21.8542 6.45897C21.7483 6.29651 21.5974 6.16836 21.42 6.09011L12.83 2.18011Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
