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

export interface HandHelpingProps extends SvgProps {
  className?: string;
}

export const HandHelping: React.FC<HandHelpingProps> = ({
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
        d="M11 12H13C13.5304 12 14.0391 11.7893 14.4142 11.4142C14.7893 11.0391 15 10.5304 15 10C15 9.46957 14.7893 8.96086 14.4142 8.58579C14.0391 8.21071 13.5304 8 13 8H10C9.4 8 8.9 8.2 8.6 8.6L3 14M7 18L8.6 16.6C8.9 16.2 9.4 16 10 16H14C15.1 16 16.1 15.6 16.8 14.8L21.4 10.4C21.7859 10.0354 22.0111 9.53232 22.0261 9.0016C22.0411 8.47087 21.8447 7.95592 21.48 7.57003C21.1153 7.18414 20.6123 6.95892 20.0816 6.94392C19.5508 6.92891 19.0359 7.12535 18.65 7.49003L14.45 11.39M2 13L8 19"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
