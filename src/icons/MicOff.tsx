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

export interface MicOffProps extends SvgProps {
  className?: string;
}

export const MicOff: React.FC<MicOffProps> = ({
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
        d="M2 2L22 22M18.8899 13.23C18.9621 12.824 18.9989 12.4124 18.9999 12V10M5.00001 10V12C4.97966 13.3992 5.37913 14.7723 6.14684 15.9422C6.91456 17.1121 8.01529 18.0251 9.30696 18.5633C10.5986 19.1015 12.022 19.2402 13.3933 18.9616C14.7645 18.6829 16.0208 17.9997 17 17M15.0001 9.33999V4.99999C14.996 4.32636 14.7653 3.6737 14.3452 3.14711C13.9251 2.62053 13.34 2.25066 12.6841 2.09708C12.0282 1.94349 11.3397 2.01514 10.7295 2.30046C10.1192 2.58579 9.62278 3.06819 9.32007 3.66999M9 9V12C9.00052 12.593 9.17675 13.1725 9.50643 13.6653C9.83611 14.1582 10.3045 14.5423 10.8523 14.7691C11.4002 14.996 12.0029 15.0554 12.5845 14.9399C13.1661 14.8243 13.7005 14.539 14.12 14.12M12 19V22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
