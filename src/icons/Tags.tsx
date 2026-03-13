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

export interface TagsProps extends SvgProps {
  className?: string;
}

export const Tags: React.FC<TagsProps> = ({
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
        fill={color}
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M6.5 10C6.77614 10 7 9.77614 7 9.5C7 9.22386 6.77614 9 6.5 9C6.22386 9 6 9.22386 6 9.5C6 9.77614 6.22386 10 6.5 10Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
        d="M15 5L21.3 11.3C21.5237 11.523 21.7013 11.7879 21.8224 12.0796C21.9435 12.3714 22.0059 12.6841 22.0059 13C22.0059 13.3159 21.9435 13.6286 21.8224 13.9204C21.7013 14.2121 21.5237 14.477 21.3 14.7L17 19M9.586 5.586C9.21101 5.2109 8.70239 5.00011 8.172 5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V11.172C2.00011 11.7024 2.2109 12.211 2.586 12.586L8.29 18.29C8.74451 18.7416 9.35925 18.9951 10 18.9951C10.6408 18.9951 11.2555 18.7416 11.71 18.29L15.29 14.71C15.7416 14.2555 15.9951 13.6408 15.9951 13C15.9951 12.3592 15.7416 11.7445 15.29 11.29L9.586 5.586ZM7 9.5C7 9.77614 6.77614 10 6.5 10C6.22386 10 6 9.77614 6 9.5C6 9.22386 6.22386 9 6.5 9C6.77614 9 7 9.22386 7 9.5Z"
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />
    </Svg>
  );
};
