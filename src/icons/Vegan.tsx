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

export interface VeganProps extends SvgProps {
  className?: string;
}

export const Vegan: React.FC<VeganProps> = ({
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
        d="M2 2C5.0186 4.40804 7.47673 7.44442 9.20362 10.8982C10.9305 14.352 11.8847 18.1403 12 22C12.9 15.18 13.5 12.5 16 8M16 8C20 8 22 6 22 2C18 2 16 4 16 8ZM17.4099 3.60014C15.3347 2.26521 12.8393 1.74463 10.4035 2.13851C7.96763 2.5324 5.76343 3.81294 4.21474 5.73387C2.66606 7.65479 1.88224 10.0805 2.01404 12.5444C2.14584 15.0084 3.18394 17.3366 4.9287 19.0814C6.67346 20.8261 9.00169 21.8642 11.4656 21.996C13.9296 22.1278 16.3553 21.344 18.2762 19.7953C20.1971 18.2466 21.4776 16.0424 21.8715 13.6066C22.2654 11.1708 21.7448 8.67532 20.4099 6.60014"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
