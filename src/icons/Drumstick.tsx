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

export interface DrumstickProps extends SvgProps {
  className?: string;
}

export const Drumstick: React.FC<DrumstickProps> = ({
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
        d="M8.29001 12.71L5.69001 15.31C5.37247 15.135 5.02068 15.0312 4.65903 15.0058C4.29739 14.9804 3.93454 15.0339 3.59564 15.1627C3.25674 15.2914 2.94991 15.4924 2.69641 15.7516C2.44291 16.0107 2.24881 16.3219 2.12757 16.6636C2.00634 17.0053 1.96086 17.3692 1.9943 17.7302C2.02774 18.0912 2.13929 18.4406 2.32122 18.7542C2.50315 19.0678 2.75111 19.3381 3.0479 19.5463C3.3447 19.7545 3.68322 19.8956 4.04001 19.96C4.11002 20.3121 4.25505 20.645 4.46525 20.9361C4.67545 21.2272 4.94588 21.4696 5.25814 21.6468C5.5704 21.824 5.91716 21.9318 6.27484 21.963C6.63252 21.9942 6.99272 21.948 7.33094 21.8275C7.66915 21.707 7.97745 21.5151 8.23486 21.2648C8.49226 21.0145 8.69274 20.7117 8.82264 20.377C8.95255 20.0423 9.00883 19.6835 8.98767 19.3251C8.96651 18.9667 8.8684 18.6171 8.70001 18.3L11.29 15.71M15.4001 15.6301C13.9034 16.1103 12.4187 16.1219 11.1644 15.6632C9.91012 15.2046 8.95249 14.2999 8.43248 13.0824C7.91247 11.8648 7.85753 10.3987 8.27576 8.8997C8.69398 7.40074 9.56329 5.94816 10.7557 4.75572C11.9482 3.56329 13.4007 2.69398 14.8997 2.27576C16.3987 1.85753 17.8648 1.91247 19.0824 2.43248C20.2999 2.95249 21.2046 3.91012 21.6632 5.16442C22.1219 6.41872 22.1103 7.90344 21.6301 9.40008C20.9353 9.00374 20.0544 8.90515 19.1355 9.1209C18.2166 9.33665 17.3159 9.85357 16.5847 10.5847C15.8536 11.3159 15.3367 12.2166 15.1209 13.1355C14.9052 14.0544 15.0037 14.9353 15.4001 15.6301Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
