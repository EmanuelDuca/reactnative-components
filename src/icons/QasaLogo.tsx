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

export interface QasaLogoProps extends SvgProps {
  className?: string;
}

export const QasaLogo: React.FC<QasaLogoProps> = ({
  color = "#262626",
  className: classNameProp,
  strokeWidth,
  style,
  ...props
}) => {
  const className = cn("stroke-foreground", classNameProp);

  return (
    <Svg
      width={74}
      height={24}
      fill="none"
      viewBox="0 0 74 24"
      className={className}
      style={style}
      {...props}
    >
      <Path
        fill={color}
        d="M54.69 3.28c0 .64-.27 1.84-.45 2.72-.14.76-.35 1.79-1.64 1.79-2.67 0-2.3-3.4-4.47-3.4-.9 0-1.42.67-1.42 1.5 0 .63.38 1.22.97 1.65l2.15 1.62c1.8 1.25 2.53 2.9 2.53 4.17 0 2.4-2.09 4.2-4.61 4.2h-5.36c-2.01 0-3.03-.61-3.62-2.05-.15-.44-.98-2.56-.98-3.3 0-1.13.78-2 1.96-2 2.28 0 3.28 3.4 5.15 3.4.74 0 1.29-.64 1.29-1.3 0-.5-.32-1.02-.9-1.46L43.4 9.34c-1.57-1.19-2.46-2.56-2.46-4.02 0-2.67 2.1-5.1 5.38-5.1h5.38c1.73 0 2.98 1.54 2.98 3.06m-18.67 8.05c0 1.16.55 2.48.55 3.67 0 1.3-1.04 2.53-2.56 2.53-1.9 0-1.9-1.81-2.95-1.81s-1.12 2.03-4.44 2.03-6.98-3.53-6.98-8.29 3.14-9.02 8-9.02c2.79 0 3.8 1.7 4.76 1.7 1.25 0 1.26-2.14 3.52-2.14a2.55 2.55 0 012.53 2.56c0 2.22-2.43 5.56-2.43 8.77M31.43 9.1a3.33 3.33 0 10-6.66 0 3.33 3.33 0 006.66 0m40.15 2.23c0 1.16.54 2.48.54 3.67 0 1.3-1.03 2.53-2.55 2.53-1.9 0-1.9-1.81-2.95-1.81s-1.13 2.03-4.44 2.03-6.99-3.53-6.99-8.29 3.14-9.02 8-9.02c2.8 0 3.8 1.7 4.76 1.7C69.2 2.14 69.22 0 71.47 0A2.55 2.55 0 0174 2.56c0 2.22-2.42 5.56-2.42 8.77m-4.6-2.23a3.33 3.33 0 10-6.66 0 3.33 3.33 0 006.67 0M19.23 2.6c0 1.13-.7 2.86-1.62 6.53-.91 3.66-1.44 5.64-1.44 7.46 0 1.81.84 2.95.84 4.53S15.71 24 14.45 24h-2.22c-1.43 0-2.52-1.54-2.52-2.88 0-2.31 2.5-3.01 2.5-4.47 0-.62-.43-1.15-1.06-1.15-1.18 0-1.45 1.6-4.12 1.6C3.7 17.1 0 13.87 0 9.01 0 4.15 3.93.44 8.08.44c3 0 3.74 1.7 4.95 1.7 1.3 0 1.46-2.14 3.59-2.14a2.6 2.6 0 012.6 2.6m-7 6.5a3.33 3.33 0 10-6.68 0 3.33 3.33 0 006.67 0"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
