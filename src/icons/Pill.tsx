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

export interface PillProps extends SvgProps {
  className?: string;
}

export const Pill: React.FC<PillProps> = ({
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
        d="M8.5 8.5L15.5 15.5M10.5 20.5L20.5 10.5C20.9673 10.0421 21.3391 9.49606 21.5941 8.89352C21.849 8.29099 21.982 7.64389 21.9853 6.98965C21.9886 6.33541 21.8622 5.687 21.6133 5.08192C21.3645 4.47684 20.9982 3.92709 20.5355 3.46447C20.0729 3.00184 19.5232 2.63552 18.9181 2.38668C18.313 2.13783 17.6646 2.01141 17.0104 2.01471C16.3561 2.01802 15.709 2.15098 15.1065 2.40593C14.5039 2.66087 13.9579 3.03273 13.5 3.5L3.5 13.5C3.03273 13.9579 2.66087 14.5039 2.40593 15.1065C2.15098 15.709 2.01802 16.3561 2.01471 17.0104C2.01141 17.6646 2.13783 18.313 2.38668 18.9181C2.63552 19.5232 3.00184 20.0729 3.46447 20.5355C3.92709 20.9982 4.47684 21.3645 5.08192 21.6133C5.687 21.8622 6.33541 21.9886 6.98965 21.9853C7.64389 21.982 8.29099 21.849 8.89352 21.5941C9.49606 21.3391 10.0421 20.9673 10.5 20.5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
