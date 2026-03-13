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

export interface FlaskRoundProps extends SvgProps {
  className?: string;
}

export const FlaskRound: React.FC<FlaskRoundProps> = ({
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
        d="M10 2V9.31M14 1.98999V9.29999C15.4733 9.77644 16.7282 10.7633 17.5386 12.0827C18.3491 13.4021 18.6619 14.9675 18.4207 16.4971C18.1795 18.0266 17.4002 19.4198 16.2231 20.4259C15.046 21.4319 13.5485 21.9847 12 21.9847C10.4516 21.9847 8.95398 21.4319 7.77688 20.4259C6.59978 19.4198 5.8205 18.0266 5.57933 16.4971C5.33817 14.9675 5.65096 13.4021 6.4614 12.0827C7.27184 10.7633 8.52669 9.77649 10 9.30005M8.5 2H15.5M5.52002 16H18.48"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
