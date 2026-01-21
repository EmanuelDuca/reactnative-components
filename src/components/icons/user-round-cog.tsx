import * as React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { cssInterop } from "nativewind";
import { ecn } from "@usekeyhole/utils";

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
    // @ts-ignore
    nativeStyleToProp: {
      // @ts-ignore
      stroke: true,
      // @ts-ignore
      strokeWidth: true,
      fill: true,
    },
  },
});

export interface UserRoundCogProps extends SvgProps {
  className?: string;
}

export const UserRoundCog: React.FC<UserRoundCogProps> = ({
  color = "#262626",
  className,
  style,
  ...props
}) => {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      // @ts-ignore
      className={className}
      style={style}
      {...props}
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2 21a8 8 0 0 1 10.434-7.62m7.066.92l-.4.9m-2.2 5.6l-.4.9m5.2-2.2l-.9-.4m-5.6-2.2l-.9-.4m7.4 0l-.9.4m-5.6 2.2l-.9.4m5.2 2.2l-.4-.9m-2.2-5.6l-.4-.9M15 8A5 5 0 1 1 5 8a5 5 0 0 1 10 0m6 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
