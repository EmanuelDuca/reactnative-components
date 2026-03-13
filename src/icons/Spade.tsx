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

export interface SpadeProps extends SvgProps {
  className?: string;
}

export const Spade: React.FC<SpadeProps> = ({
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
        d="M12 18C10.5 19.5 9.3 20 7.5 20C6.04131 20 4.64236 19.4205 3.61091 18.3891C3.10019 17.8784 2.69506 17.272 2.41866 16.6048C2.14226 15.9375 2 15.2223 2 14.5C2 12.2 3.5 10.5 5 9L12 2L19 9C20.5 10.5 22 12.2 22 14.5C22 15.2223 21.8577 15.9375 21.5813 16.6048C21.3049 17.272 20.8998 17.8784 20.3891 18.3891C19.8784 18.8998 19.272 19.3049 18.6048 19.5813C17.9375 19.8577 17.2223 20 16.5 20C14.7 20 13.5 19.5 12 18ZM12 18V22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
