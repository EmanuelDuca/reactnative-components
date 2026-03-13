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

export interface WebhookOffProps extends SvgProps {
  className?: string;
}

export const WebhookOff: React.FC<WebhookOffProps> = ({
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
        d="M17.0001 17H12.0001C10.9101 16.98 10.0601 17.92 9.5001 18.9C9.24402 19.355 8.90083 19.7552 8.49011 20.0776C8.07939 20.4 7.6092 20.6383 7.10637 20.779C6.60354 20.9197 6.07792 20.9599 5.55953 20.8975C5.04114 20.835 4.54013 20.6711 4.0851 20.415C3.63007 20.1589 3.22993 19.8157 2.90754 19.405C2.58514 18.9943 2.3468 18.5241 2.20612 18.0213C2.06544 17.5184 2.02517 16.9928 2.08763 16.4744C2.15008 15.956 2.31402 15.455 2.5701 15M9 3.40013C9.42001 2.91318 9.95123 2.53468 10.5486 2.29669C11.146 2.05871 11.792 1.96827 12.4318 2.03303C13.0716 2.0978 13.6863 2.31586 14.2239 2.66873C14.7615 3.02161 15.2061 3.49889 15.52 4.06013M6 16.9999L9.1 11.1999C9.2539 10.8817 9.33855 10.5344 9.34838 10.181C9.3582 9.82765 9.29298 9.47621 9.157 9.1499M20.3 20.2998C19.6233 20.7635 18.8203 21.0078 18 20.9998M18.6001 13C19.453 13.1308 20.2408 13.534 20.8458 14.1492C21.4508 14.7645 21.8407 15.559 21.9571 16.414M12 6L12.6 7M2 2L22 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
