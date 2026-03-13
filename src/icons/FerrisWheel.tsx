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

export interface FerrisWheelProps extends SvgProps {
  className?: string;
}

export const FerrisWheel: React.FC<FerrisWheelProps> = ({
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
        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM12 14L9 22M12 14L15 22M12 2V6M6.80005 15L3.30005 17M20.7 7L17.2 9M6.80005 9L3.30005 7M20.7 17L17.2 15M8 22H16M18 18.6999C19.3586 17.4848 20.3162 15.8857 20.7461 14.1144C21.176 12.3431 21.0579 10.483 20.4076 8.7803C19.7572 7.07756 18.6051 5.61243 17.1038 4.57879C15.6025 3.54514 13.8227 2.9917 12 2.9917C10.1773 2.9917 8.39751 3.54514 6.89621 4.57879C5.39491 5.61243 4.24284 7.07756 3.59245 8.7803C2.94206 10.483 2.82401 12.3431 3.25392 14.1144C3.68382 15.8857 4.64142 17.4848 6 18.6999"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
