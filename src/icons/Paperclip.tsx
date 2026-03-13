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

export interface PaperclipProps extends SvgProps {
  className?: string;
}

export const Paperclip: React.FC<PaperclipProps> = ({
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
        d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.5972 21.9983 8.00502 21.9983C6.41283 21.9983 4.88586 21.3658 3.76002 20.24C2.63417 19.1142 2.00168 17.5872 2.00168 15.995C2.00168 14.4028 2.63417 12.8758 3.76002 11.75L12.33 3.18C13.0806 2.42811 14.0991 2.00518 15.1615 2.00424C16.2239 2.00331 17.2431 2.42444 17.995 3.175C18.7469 3.92557 19.1698 4.94407 19.1708 6.00647C19.1717 7.06886 18.7506 8.08811 18 8.84L9.41002 17.41C9.03473 17.7853 8.52574 17.9961 7.99502 17.9961C7.46429 17.9961 6.9553 17.7853 6.58002 17.41C6.20473 17.0347 5.9939 16.5257 5.9939 15.995C5.9939 15.4643 6.20473 14.9553 6.58002 14.58L15.07 6.1"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
