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

export interface MouseOffProps extends SvgProps {
  className?: string;
}

export const MouseOff: React.FC<MouseOffProps> = ({
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
        d="M12 6V6.343M18.218 18.218C17.4974 19.6117 16.3294 20.7229 14.9015 21.3733C13.4736 22.0236 11.8687 22.1754 10.3442 21.8043C8.81969 21.4331 7.4641 20.5606 6.49496 19.3267C5.52582 18.0927 4.99934 16.569 5 15V8.99998C4.99953 7.88021 5.2677 6.77666 5.782 5.78198M19.0001 13.3431V9.00011C19.0003 7.77708 18.6802 6.57531 18.0714 5.51453C17.4627 4.45374 16.5867 3.57095 15.5306 2.9541C14.4745 2.33724 13.2753 2.00785 12.0523 1.99873C10.8293 1.98961 9.62522 2.30108 8.56006 2.90211M22 22L2 2"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
