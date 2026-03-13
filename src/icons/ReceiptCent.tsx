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

export interface ReceiptCentProps extends SvgProps {
  className?: string;
}

export const ReceiptCent: React.FC<ReceiptCentProps> = ({
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
        d="M12 6.5V17.5M15.0002 9.4C14.4687 8.77864 13.7596 8.33507 12.9683 8.12905C12.177 7.92303 11.3416 7.96446 10.5746 8.24774C9.80761 8.53102 9.14583 9.04256 8.67843 9.71344C8.21103 10.3843 7.96045 11.1823 7.96045 12C7.96045 12.8177 8.21103 13.6157 8.67843 14.2866C9.14583 14.9574 9.80761 15.469 10.5746 15.7523C11.3416 16.0355 12.177 16.077 12.9683 15.8709C13.7596 15.6649 14.4687 15.2214 15.0002 14.6M4 2V22L6 21L8 22L10 21L12 22L14 21L16 22L18 21L20 22V2L18 3L16 2L14 3L12 2L10 3L8 2L6 3L4 2Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
