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

export interface ShrubProps extends SvgProps {
  className?: string;
}

export const Shrub: React.FC<ShrubProps> = ({
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
        d="M12 22V15L10 13M14 14L12 16M16.9999 8V8.8C18.1624 9.46723 19.068 10.5045 19.5723 11.7464C20.0766 12.9883 20.1505 14.3633 19.7823 15.6521C19.4141 16.9409 18.6249 18.0693 17.5406 18.8574C16.4564 19.6454 15.1394 20.0476 13.7999 20H9.9999C8.62885 19.9069 7.32257 19.3817 6.26869 18.4998C5.21481 17.6178 4.46756 16.4246 4.13426 15.0914C3.80097 13.7582 3.89878 12.3537 4.41365 11.0796C4.92852 9.80549 5.83395 8.72734 6.9999 8C6.9999 6.67392 7.52669 5.40215 8.46437 4.46447C9.40205 3.52678 10.6738 3 11.9999 3C13.326 3 14.5978 3.52678 15.5354 4.46447C16.4731 5.40215 16.9999 6.67392 16.9999 8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
