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

export interface MailOpenProps extends SvgProps {
  className?: string;
}

export const MailOpen: React.FC<MailOpenProps> = ({
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
        d="M22 10C22 9.37 21.7 8.78 21.2 8.4L13.2 2.4C12.8538 2.14036 12.4327 2 12 2C11.5673 2 11.1462 2.14036 10.8 2.4L2.8 8.4C2.55161 8.58629 2.35 8.82786 2.21115 9.10557C2.07229 9.38328 2 9.68951 2 10M22 10V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V10M22 10L13.03 15.7C12.7213 15.8934 12.3643 15.996 12 15.996C11.6357 15.996 11.2787 15.8934 10.97 15.7L2 10"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
