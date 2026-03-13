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

export interface CloudLightningProps extends SvgProps {
  className?: string;
}

export const CloudLightning: React.FC<CloudLightningProps> = ({
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
        d="M6.00009 16.326C4.94632 15.8256 4.03431 15.0698 3.34695 14.1273C2.65959 13.1848 2.21867 12.0855 2.06427 10.9292C1.90987 9.77291 2.04689 8.59638 2.46287 7.50653C2.87885 6.41669 3.5606 5.44808 4.44616 4.68874C5.33171 3.9294 6.393 3.40342 7.53356 3.15859C8.67411 2.91376 9.85777 2.95785 10.9769 3.28686C12.0961 3.61587 13.1153 4.21935 13.9419 5.04247C14.7686 5.86559 15.3764 6.88223 15.7101 8.00001H17.5001C18.6516 7.998 19.76 8.43748 20.5973 9.22801C21.4345 10.0185 21.9369 11.0999 22.001 12.2496C22.065 13.3993 21.6859 14.5299 20.9417 15.4085C20.1974 16.2872 19.1447 16.8471 18.0001 16.973M13 12L10 17H14L11 22"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
