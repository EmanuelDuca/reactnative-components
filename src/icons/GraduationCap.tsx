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

export interface GraduationCapProps extends SvgProps {
  className?: string;
}

export const GraduationCap: React.FC<GraduationCapProps> = ({
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
        d="M22 10V16M6 12.5V16C6 16.7956 6.63214 17.5587 7.75736 18.1213C8.88258 18.6839 10.4087 19 12 19C13.5913 19 15.1174 18.6839 16.2426 18.1213C17.3679 17.5587 18 16.7956 18 16V12.5M21.42 10.9221C21.5991 10.8431 21.751 10.7134 21.857 10.5489C21.963 10.3845 22.0184 10.1925 22.0164 9.99685C22.0143 9.8012 21.955 9.61044 21.8456 9.4482C21.7362 9.28596 21.5817 9.15937 21.401 9.08411L12.83 5.18011C12.5695 5.06126 12.2864 4.99976 12 4.99976C11.7137 4.99976 11.4306 5.06126 11.17 5.18011L2.60004 9.08011C2.42201 9.15809 2.27056 9.28625 2.16421 9.44893C2.05786 9.61161 2.00122 9.80176 2.00122 9.99611C2.00122 10.1905 2.05786 10.3806 2.16421 10.5433C2.27056 10.706 2.42201 10.8341 2.60004 10.9121L11.17 14.8201C11.4306 14.939 11.7137 15.0005 12 15.0005C12.2864 15.0005 12.5695 14.939 12.83 14.8201L21.42 10.9221Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
