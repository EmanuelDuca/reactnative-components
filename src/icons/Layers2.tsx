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

export interface Layers2Props extends SvgProps {
  className?: string;
}

export const Layers2: React.FC<Layers2Props> = ({
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
        d="M16.0201 12L21.5001 15.13C21.654 15.2172 21.782 15.3437 21.8711 15.4965C21.9601 15.6494 22.0071 15.8231 22.0071 16C22.0071 16.1769 21.9601 16.3506 21.8711 16.5035C21.782 16.6563 21.654 16.7828 21.5001 16.87L13.0001 21.74C12.6961 21.9155 12.3512 22.0079 12.0001 22.0079C11.649 22.0079 11.3042 21.9155 11.0001 21.74L2.50011 16.87C2.34621 16.7828 2.21821 16.6563 2.12915 16.5035C2.04009 16.3506 1.99316 16.1769 1.99316 16C1.99316 15.8231 2.04009 15.6494 2.12915 15.4965C2.21821 15.3437 2.34621 15.2172 2.50011 15.13L7.98011 12M13.0001 13.7399C12.6961 13.9154 12.3512 14.0078 12.0001 14.0078C11.649 14.0078 11.3042 13.9154 11.0001 13.7399L2.50011 8.86989C2.34621 8.78267 2.21821 8.65619 2.12915 8.50335C2.04009 8.35051 1.99316 8.17679 1.99316 7.99989C1.99316 7.823 2.04009 7.64927 2.12915 7.49643C2.21821 7.34359 2.34621 7.21711 2.50011 7.12989L11.0001 2.25989C11.3042 2.08436 11.649 1.99194 12.0001 1.99194C12.3512 1.99194 12.6961 2.08436 13.0001 2.25989L21.5001 7.12989C21.654 7.21711 21.782 7.34359 21.8711 7.49643C21.9601 7.64927 22.0071 7.823 22.0071 7.99989C22.0071 8.17679 21.9601 8.35051 21.8711 8.50335C21.782 8.65619 21.654 8.78267 21.5001 8.86989L13.0001 13.7399Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
