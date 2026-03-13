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

export interface DogProps extends SvgProps {
  className?: string;
}

export const Dog: React.FC<DogProps> = ({
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
        d="M9.99998 5.17211C9.99998 3.78211 8.42298 2.67911 6.49998 3.00011C3.67698 3.47011 2.38698 9.00611 2.49998 10.0001C2.57998 10.7031 4.22498 11.7221 6.15598 11.0001C7.41698 10.5281 8.11598 9.55011 8.49998 8.50011M14.2671 5.17211C14.2671 3.78211 15.8441 2.67911 17.7671 3.00011C20.5901 3.47011 21.8801 9.00611 21.7671 10.0001C21.6871 10.7031 20.0421 11.7221 18.1111 11.0001C16.8501 10.5281 16.2561 9.55011 15.8721 8.50011M8 14V14.5M16 14V14.5M4.42001 11.2471C4.14014 12.3278 3.999 13.4397 4.00001 14.5561C4.00001 18.7281 7.58201 21.0001 12 21.0001C16.418 21.0001 20 18.7281 20 14.5561C20 13.4951 19.838 12.3561 19.507 11.2471M10.264 5.16509C10.8358 5.05275 11.4173 4.99748 12 5.00009C12.78 5.00009 13.5 5.10809 14.161 5.30609M11.25 16.25H12.75L12 17L11.25 16.25Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
