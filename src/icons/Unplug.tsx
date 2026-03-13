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

export interface UnplugProps extends SvgProps {
  className?: string;
}

export const Unplug: React.FC<UnplugProps> = ({
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
        d="M19 5L22 2M2 22L5 19M7.5 13.5L10 11M10.5 16.5L13 14M6.30003 20.3C6.523 20.5237 6.78794 20.7013 7.07967 20.8224C7.37139 20.9435 7.68416 21.0059 8.00003 21.0059C8.31591 21.0059 8.62867 20.9435 8.9204 20.8224C9.21212 20.7013 9.47706 20.5237 9.70003 20.3L12 18L6.00003 12L3.70003 14.3C3.47629 14.523 3.29876 14.7879 3.17763 15.0796C3.05649 15.3714 2.99414 15.6841 2.99414 16C2.99414 16.3159 3.05649 16.6286 3.17763 16.9204C3.29876 17.2121 3.47629 17.477 3.70003 17.7L6.30003 20.3ZM12 6.00003L18 12L20.3 9.70003C20.5237 9.47706 20.7013 9.21212 20.8224 8.9204C20.9435 8.62867 21.0059 8.31591 21.0059 8.00003C21.0059 7.68416 20.9435 7.37139 20.8224 7.07967C20.7013 6.78794 20.5237 6.523 20.3 6.30003L17.7 3.70003C17.477 3.47629 17.2121 3.29876 16.9204 3.17763C16.6286 3.05649 16.3159 2.99414 16 2.99414C15.6841 2.99414 15.3714 3.05649 15.0796 3.17763C14.7879 3.29876 14.523 3.47629 14.3 3.70003L12 6.00003Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
