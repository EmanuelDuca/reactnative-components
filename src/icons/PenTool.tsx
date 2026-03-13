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

export interface PenToolProps extends SvgProps {
  className?: string;
}

export const PenTool: React.FC<PenToolProps> = ({
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
        d="M18 13L16.625 6.12601C16.5876 5.93899 16.4975 5.76656 16.3653 5.62907C16.2331 5.49157 16.0644 5.39475 15.879 5.35001L3.23501 2.02801C3.06843 1.98773 2.89431 1.99094 2.72933 2.03733C2.56436 2.08371 2.41407 2.17172 2.29289 2.29289C2.17172 2.41407 2.08371 2.56436 2.03733 2.72933C1.99094 2.89431 1.98773 3.06843 2.02801 3.23501L5.35001 15.879C5.39475 16.0644 5.49157 16.2331 5.62907 16.3653C5.76656 16.4975 5.93899 16.5876 6.12601 16.625L13 18M2.30005 2.30005L9.58605 9.58605M15.7071 21.2931C15.5196 21.4806 15.2653 21.5859 15.0001 21.5859C14.7349 21.5859 14.4806 21.4806 14.2931 21.2931L12.7071 19.7071C12.5196 19.5196 12.4143 19.2653 12.4143 19.0001C12.4143 18.7349 12.5196 18.4806 12.7071 18.2931L18.2931 12.7071C18.4806 12.5196 18.7349 12.4143 19.0001 12.4143C19.2653 12.4143 19.5196 12.5196 19.7071 12.7071L21.2931 14.2931C21.4806 14.4806 21.5859 14.7349 21.5859 15.0001C21.5859 15.2653 21.4806 15.5196 21.2931 15.7071L15.7071 21.2931ZM13 11C13 12.1046 12.1046 13 11 13C9.89543 13 9 12.1046 9 11C9 9.89543 9.89543 9 11 9C12.1046 9 13 9.89543 13 11Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
