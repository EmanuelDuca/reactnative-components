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

export interface PowerProps extends SvgProps {
  className?: string;
}

export const Power: React.FC<PowerProps> = ({
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
        d="M12 2V12M18.4 6.6001C19.6567 7.8572 20.513 9.45827 20.8609 11.2014C21.2087 12.9445 21.0327 14.7516 20.3549 16.3948C19.6771 18.038 18.5279 19.4437 17.0523 20.4346C15.5766 21.4255 13.8406 21.9573 12.0631 21.9628C10.2856 21.9684 8.5463 21.4475 7.06447 20.4659C5.58264 19.4842 4.42467 18.0857 3.7366 16.4468C3.04852 14.8079 2.86115 13.002 3.19812 11.2567C3.53509 9.51145 4.3813 7.90505 5.63005 6.6401"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
