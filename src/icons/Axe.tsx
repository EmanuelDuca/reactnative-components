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

export interface AxeProps extends SvgProps {
  className?: string;
}

export const Axe: React.FC<AxeProps> = ({
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
        d="M14 12L5.49998 20.5C5.10216 20.8978 4.56259 21.1213 3.99998 21.1213C3.43737 21.1213 2.89781 20.8978 2.49998 20.5C2.10216 20.1022 1.87866 19.5626 1.87866 19C1.87866 18.4374 2.10216 17.8978 2.49998 17.5L11 9M15 13L9 7L13 3L19 9H22C21.7881 10.7831 20.9825 12.443 19.7128 13.7128C18.443 14.9825 16.7831 15.7881 15 16V13Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
