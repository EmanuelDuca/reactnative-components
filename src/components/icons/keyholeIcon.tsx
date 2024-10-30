import * as React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { cssInterop } from "nativewind";
import { ecn } from "@usekeyhole/utils";

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
      // @ts-ignore
      stroke: true,
      // @ts-ignore
      strokeWidth: true,
      fill: true,
    },
  },
});

export interface KeyholeIconProps extends SvgProps {
  className?: string;
}

export const KeyholeIcon: React.FC<KeyholeIconProps> = ({
  color = "#404040",
  className,
  style,
  ...props
}) => {
  return (
    <Svg
      width={32}
      height={32}
      fill="none"
      viewBox="0 0 32 32"
      className={className}
      style={style}
      {...props}
    >
      <Path
        fill={color}
        d="m17.502 16.7671 1.6438 5.3542h-6.2776l1.6594-5.3542-.4853-.3287c-1.0019-.6732-1.6124-1.7848-1.6124-2.9903 0-1.9726 1.6124-3.585 3.5849-3.585 1.6907 0 3.131 1.1584 3.491 2.8023h-3.491v1.5655h5.1505v-.7828c0-2.8493-2.317-5.1506-5.1505-5.1506-2.8491 0-5.1504 2.317-5.1504 5.1506 0 1.5343.6732 2.959 1.8316 3.9453l-1.9568 6.3091h10.5513l-2.2856-7.405-1.5029.4696Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        fill={color}
        d="M30.7617 9.769c-.7984-1.9099-1.9568-3.632-3.4284-5.088-1.4716-1.4716-3.1779-2.6301-5.0878-3.4285C20.273.4227 18.1752 0 16.0149 0c-2.1604 0-4.2581.4227-6.2306 1.2525-1.91.7984-3.632 1.9569-5.0879 3.4285-1.4715 1.456-2.63 3.1781-3.444 5.088C.4227 11.7418 0 13.8396 0 16s.4227 4.2583 1.2524 6.2309c.814 1.91 1.9568 3.6165 3.4284 5.0881 1.4715 1.4716 3.178 2.6301 5.0878 3.4286C11.7411 31.5773 13.8389 32 15.9992 32c2.1604 0 4.2581-.4227 6.2306-1.2524 1.9099-.8141 3.6163-1.957 5.0878-3.4286 1.4716-1.4716 2.6301-3.1781 3.4284-5.0881.8298-1.9726 1.2524-4.0704 1.2524-6.2309.0313-2.1605-.407-4.2583-1.2367-6.231Zm-4.5869 16.3915c-2.7082 2.7084-6.3245 4.2113-10.1599 4.2113-3.8355 0-7.4517-1.4873-10.16-4.2113C3.1466 23.4364 1.6438 19.8356 1.6438 16c0-3.8356 1.4872-7.452 4.2111-10.1605 2.724-2.7084 6.3245-4.2113 10.16-4.2113 3.8354 0 7.4517 1.4873 10.1599 4.2113C28.8831 8.5636 30.3703 12.1644 30.3703 16c0 3.8356-1.4872 7.4364-4.1955 10.1605Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
