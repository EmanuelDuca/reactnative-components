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

export interface LampCeilingProps extends SvgProps {
  className?: string;
}

export const LampCeiling: React.FC<LampCeilingProps> = ({
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
        d="M12 2V7M9.17 16C9.01087 16.4524 8.96249 16.9363 9.02894 17.4112C9.09538 17.8861 9.2747 18.3382 9.55188 18.7295C9.82905 19.1208 10.196 19.44 10.6219 19.6603C11.0479 19.8806 11.5205 19.9955 12 19.9955C12.4795 19.9955 12.9521 19.8806 13.3781 19.6603C13.804 19.44 14.171 19.1208 14.4481 18.7295C14.7253 18.3382 14.9046 17.8861 14.9711 17.4112C15.0375 16.9363 14.9891 16.4524 14.83 16M6 7H18L22 16H2L6 7Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
