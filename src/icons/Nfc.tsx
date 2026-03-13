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

export interface NfcProps extends SvgProps {
  className?: string;
}

export const Nfc: React.FC<NfcProps> = ({
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
        d="M6 8.32007C6.6392 9.44121 6.97535 10.7095 6.97535 12.0001C6.97535 13.2906 6.6392 14.5589 6 15.6801M9.45996 6.20996C10.459 7.97615 10.9841 9.97079 10.9841 12C10.9841 14.0291 10.459 16.0238 9.45996 17.79M12.9099 4.1001C14.2875 6.50473 15.0131 9.22749 15.0148 11.9988C15.0166 14.77 14.2944 17.4937 12.9199 19.9001M16.3701 2C18.11 5.04561 19.0251 8.49246 19.0251 12C19.0251 15.5075 18.11 18.9544 16.3701 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
