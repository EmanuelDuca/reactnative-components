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

export interface TimerResetProps extends SvgProps {
  className?: string;
}

export const TimerReset: React.FC<TimerResetProps> = ({
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
        d="M10 2H14M12 14V10M4 12.9998C4.24486 11.0557 5.19466 9.26916 6.66925 7.9789C8.14384 6.68863 10.0407 5.9844 12 5.99976C13.294 6.00113 14.5684 6.3164 15.7139 6.91852C16.8593 7.52064 17.8416 8.39163 18.5764 9.45678C19.3113 10.5219 19.7768 11.7495 19.933 13.034C20.0892 14.3186 19.9315 15.6219 19.4733 16.8322C19.0152 18.0424 18.2703 19.1234 17.3025 19.9825C16.3348 20.8416 15.1731 21.4531 13.9171 21.7646C12.6611 22.076 11.3482 22.0782 10.0912 21.7708C8.83422 21.4634 7.67054 20.8557 6.7 19.9998L4 17.5998M9 17H4V22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
