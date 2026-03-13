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

export interface MicVocalProps extends SvgProps {
  className?: string;
}

export const MicVocal: React.FC<MicVocalProps> = ({
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
        d="M12.0001 8L2.96006 17.06C2.67072 17.3147 2.43666 17.6259 2.27232 17.9746C2.10799 18.3232 2.01687 18.7019 2.0046 19.0871C1.99233 19.4724 2.05917 19.856 2.20099 20.2144C2.3428 20.5728 2.55658 20.8984 2.82913 21.1709C3.10168 21.4435 3.42721 21.6573 3.78562 21.7991C4.14402 21.9409 4.52769 22.0077 4.91294 21.9955C5.29819 21.9832 5.67683 21.8921 6.02549 21.7277C6.37414 21.5634 6.68541 21.3293 6.94006 21.04L16.0001 12M22 7C22 9.76142 19.7614 12 17 12C14.2386 12 12 9.76142 12 7C12 4.23858 14.2386 2 17 2C19.7614 2 22 4.23858 22 7Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
