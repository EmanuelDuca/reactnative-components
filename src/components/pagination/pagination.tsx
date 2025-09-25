import React from "react";

import { cn } from "@usekeyhole/utils";
import { Ellipsis, ChevronRight, ChevronLeft } from "@usekeyhole/nativewind";
import { View, ViewProps } from "react-native";
import {
  Button,
  ButtonIcon,
  ButtonProps,
  ButtonText,
} from "@usekeyhole/nativewind";
export type PaginationProps = ViewProps;

export const Pagination = React.forwardRef<View, PaginationProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "flex flex-1 flex-row items-center justify-between",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

export type PaginationContentProps = ViewProps;

export const PaginationContent = React.forwardRef<View, PaginationContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-row items-center gap-x-2", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

export type PaginationNextProps = ButtonProps & {
  nextText: string;
};

export const PaginationNext: React.FC<PaginationNextProps> = ({
  nextText,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("h-8", className)}
      disabled={disabled}
      {...props}
    >
      {!!nextText && <ButtonText>{nextText}</ButtonText>}
      <ButtonIcon className="size-5">
        <ChevronRight />
      </ButtonIcon>
    </Button>
  );
};

export type PaginationPreviousProps = ButtonProps & {
  previousText: string;
};

export const PaginationPrevious: React.FC<PaginationPreviousProps> = ({
  previousText,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("h-8", className)}
      disabled={disabled}
      {...props}
    >
      <ButtonIcon className="size-5">
        <ChevronLeft />
      </ButtonIcon>
      {!!previousText && <ButtonText>{previousText}</ButtonText>}
    </Button>
  );
};

export type PaginationNumberProps = Omit<ButtonProps, "children"> & {
  active?: boolean;
  children?: React.ReactNode;
};

export const PaginationNumber: React.FC<PaginationNumberProps> = ({
  active,
  children,
  className,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn(
        "size-8 border-2 border-transparent duration-0",
        active && "border-border",
        className
      )}
      {...props}
    >
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

export type PaginationEllipsisProps = ButtonProps;

export const PaginationEllipsis: React.FC<PaginationEllipsisProps> = ({
  className,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      disabled
      className={cn("size-8", className)}
      {...props}
    >
      <ButtonIcon>
        <Ellipsis />
      </ButtonIcon>
    </Button>
  );
};
