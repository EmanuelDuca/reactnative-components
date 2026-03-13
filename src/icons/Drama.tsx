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

export interface DramaProps extends SvgProps {
  className?: string;
}

export const Drama: React.FC<DramaProps> = ({
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
        d="M10 11H10.01M14 6H14.01M18 6H18.01M6.5 13.1001H6.51M17.4001 9.8999C16.6001 10.6999 15.4001 10.6999 14.6001 9.8999M10.0999 7.1001C8.99995 7.2001 7.69995 7.7001 5.99995 8.6001C2.49995 10.6001 1.29995 12.5001 2.29995 14.2001C6.79995 22.0001 11.7999 22.6001 13.4999 21.6001C14.3999 21.1001 15.3999 19.5001 15.3999 16.9001M9.1001 16.4999C9.4001 15.3999 10.5001 14.7999 11.5001 15.0999M22 5C22 14 18 17 16 17C14 17 10 14 10 5C10 3 12 2 16 2C20 2 22 3 22 5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
