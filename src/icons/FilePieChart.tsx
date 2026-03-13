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

export interface FilePieChartProps extends SvgProps {
  className?: string;
}

export const FilePieChart: React.FC<FilePieChartProps> = ({
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
        d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20M16 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V7.5M4.01695 11.512C3.40532 12.0547 2.9111 12.7168 2.56464 13.4576C2.21818 14.1983 2.02679 15.002 2.00222 15.8194C1.97765 16.6368 2.12043 17.4505 2.42178 18.2107C2.72313 18.9709 3.17669 19.6615 3.75462 20.24C4.33254 20.8186 5.02263 21.2729 5.7825 21.575C6.54238 21.8772 7.35599 22.0208 8.1734 21.9971C8.9908 21.9734 9.79472 21.7829 10.5358 21.4372C11.2769 21.0915 11.9395 20.598 12.4829 19.987M8 16V10C9.5913 10 11.1174 10.6321 12.2426 11.7574C13.3679 12.8826 14 14.4087 14 16H8Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
