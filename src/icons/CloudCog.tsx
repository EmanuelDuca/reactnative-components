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

export interface CloudCogProps extends SvgProps {
  className?: string;
}

export const CloudCog: React.FC<CloudCogProps> = ({
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
        d="M4.2001 15.1001C3.41932 14.3632 2.81849 13.4566 2.44409 12.4504C2.06969 11.4442 1.93175 10.3654 2.04094 9.29737C2.15012 8.22934 2.50351 7.20074 3.07377 6.29111C3.64403 5.38149 4.41587 4.61523 5.32961 4.05158C6.24334 3.48794 7.27448 3.14203 8.34327 3.04059C9.41207 2.93916 10.4899 3.08492 11.4933 3.46661C12.4968 3.84831 13.399 4.45569 14.1302 5.2418C14.8614 6.02791 15.4019 6.97167 15.7101 8.00009H17.5001C18.454 8.01295 19.3791 8.32861 20.1419 8.9015C20.9046 9.47439 21.4656 10.2749 21.7438 11.1874C22.022 12.0999 22.0031 13.0772 21.6896 13.9782C21.3762 14.8792 20.7846 15.6573 20.0001 16.2001M15.7 18.4001L14.8 18.1001M9.20005 15.9001L8.30005 15.6001M10.6001 20.7001L10.9001 19.8M13.1001 14.2L13.4001 13.3M13.6 20.7L13.2 19.7M10.7999 14.3L10.3999 13.3M8.30005 18.6L9.30005 18.2M14.7 15.7999L15.7 15.3999M15 17C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
