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

export interface HamProps extends SvgProps {
  className?: string;
}

export const Ham: React.FC<HamProps> = ({
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
        d="M13.144 21.1439C14.114 20.1739 14.9414 19.0804 15.5791 17.9257C16.2167 16.771 16.6521 15.5778 16.8603 14.4143C17.0686 13.2507 17.0456 12.1395 16.7927 11.1442C16.5398 10.1489 16.0619 9.28898 15.3864 8.61346C14.7109 7.93794 13.8509 7.46009 12.8556 7.2072C11.8603 6.9543 10.7492 6.93131 9.58561 7.13955C8.42205 7.34778 7.22887 7.78315 6.0742 8.42081C4.91952 9.05846 3.82596 9.88591 2.85596 10.8559M13.144 21.1439C13.9626 20.3252 14.206 18.9983 13.8202 17.4547C13.4344 15.9112 12.4512 14.2775 11.0869 12.9133C9.72265 11.549 8.08903 10.5658 6.54545 10.18C5.00188 9.79423 3.67464 10.0372 2.85596 10.8559M13.144 21.1439C12.3253 21.9626 10.9983 22.206 9.45474 21.8202C7.91116 21.4344 6.27755 20.4512 4.91327 19.0869C3.549 17.7226 2.56582 16.089 2.18003 14.5455C1.79423 13.0019 2.03728 11.6746 2.85596 10.8559M16.5649 10.4351L18.5999 8.40006C18.9176 8.57609 19.2698 8.68081 19.6321 8.70695C19.9943 8.73309 20.3579 8.68001 20.6976 8.55141C21.0373 8.42282 21.3448 8.22179 21.599 7.96229C21.8531 7.7028 22.0476 7.39108 22.1691 7.04879C22.2905 6.70651 22.336 6.34188 22.3023 5.98025C22.2685 5.61862 22.1565 5.26868 21.9738 4.95475C21.7912 4.64082 21.5424 4.37043 21.2447 4.16239C20.947 3.95435 20.6075 3.81365 20.2499 3.75006C20.1799 3.39792 20.0349 3.06498 19.8247 2.77391C19.6145 2.48284 19.344 2.24046 19.0318 2.06326C18.7195 1.88605 18.3728 1.77819 18.0151 1.747C17.6574 1.71581 17.2972 1.76203 16.959 1.88251C16.6208 2.00299 16.3125 2.19491 16.0551 2.4452C15.7977 2.6955 15.5972 2.9983 15.4673 3.33301C15.3374 3.66773 15.2811 4.02649 15.3023 4.3849C15.3234 4.74331 15.4215 5.09296 15.5899 5.41006L13.5659 7.43506M8.5 16.5L7.5 15.5"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
