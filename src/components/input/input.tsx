import * as Slot from "@rn-primitives/slot";
import { cn, ecn } from "@usekeyhole/utils";
import { useControllableState, useFontClassName } from "@usekeyhole/hooks";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Pressable, TargetedEvent } from "react-native";
import {
  NativeSyntheticEvent,
  PressableProps,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewProps,
} from "react-native";

const inputVariants = cva(
  "bg-background relative cursor-default flex-row items-center rounded-sm border outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "border-input",
        clear: "border-transparent bg-transparent",
        destructive: "border-destructive",
      },
      size: {
        sm: "h-auto",
        md: "h-9",
        lg: "h-11",
      },
      focused: {
        false: undefined,
        true: undefined,
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      // default
      {
        focused: false,
        hovered: true,
        variant: "default",
        className: "border-input/dark-70",
      },
      // default
      {
        focused: true,
        variant: "default",
        className: "border-primary",
      },
      // default
      {
        focused: true,
        hovered: true,
        variant: "default",
        className: "border-primary",
      },
    ],
    defaultVariants: {
      size: "lg",
      variant: "default",
      focused: false,
    },
  }
);

type InputContextProps = {
  disabled?: boolean | null;
  focused?: boolean | null;
  hovered?: boolean | null;
  variant: InputProps["variant"];
  size: InputProps["size"];
};

const InputContext = React.createContext<InputContextProps>({
  disabled: false,
  focused: false,
  hovered: false,
  size: "lg",
  variant: "default",
});

type InputProps = TextInputProps &
  VariantProps<typeof inputVariants> &
  Pick<PressableProps, "onHoverIn" | "onHoverOut"> & {
    asChild?: boolean;
    endAdornment?: JSX.Element;
    disableFocus?: boolean;
    disabled?: boolean;
    hovered?: boolean;
    onBlur?: (
      e:
        | NativeSyntheticEvent<TextInputFocusEventData>
        | NativeSyntheticEvent<TargetedEvent>
    ) => void;
    onFocus?: (
      e:
        | NativeSyntheticEvent<TextInputFocusEventData>
        | NativeSyntheticEvent<TargetedEvent>
    ) => void;
    startAdornment?: JSX.Element;
  };

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      asChild,
      className,
      disabled: isDisabled,
      disableFocus,
      editable = true,
      endAdornment,
      focused: isFocused,
      hovered: isHovered,
      onBlur,
      onFocus,
      onHoverIn,
      onHoverOut,
      size,
      startAdornment,
      variant,
      ...props
    },
    ref
  ) => {
    const fontClassName = useFontClassName(className);

    const [focused, setFocused] = useControllableState({
      prop: isFocused,
      defaultProp: false,
    });
    const [hovered, setHovered] = useControllableState({
      prop: isHovered,
      defaultProp: false,
    });

    const [disabled] = useControllableState({
      prop: isDisabled || !editable,
      defaultProp: false,
    });

    const Element = asChild ? Slot.Pressable : TextInput;

    return (
      <InputContext.Provider
        value={{
          disabled,
          focused,
          hovered,
          size,
          variant,
        }}
      >
        <Pressable
          className={cn(
            inputVariants({
              focused,
              hovered,
              size,
              variant,
            }),
            { "opacity-50": disabled },
            className
          )}
          disabled={disabled}
          onHoverIn={(e) => {
            setHovered(true);
            onHoverIn?.(e);
          }}
          onHoverOut={(e) => {
            setHovered(false);
            onHoverOut?.(e);
          }}
          // Should be fixed. Propably expo/tsconfig.base should be used
          // @ts-ignore
          tabIndex={-1}
        >
          {!disableFocus && (
            <InputRing className={ecn(className, ["rounded"])} />
          )}
          {!asChild && startAdornment}
          <Element
            className={cn(
              "text-foreground placeholder:text-muted-foreground relative h-full flex-1 flex-row items-center outline-none transition-colors",
              (size === "sm" && "px-1 py-0") ||
                (size === "md" && "px-3 py-2") ||
                "px-4 py-3",
              { "cursor-not-allowed": disabled },
              ecn(className, ["font", "text", "cursor"]),
              fontClassName
            )}
            ref={ref}
            onBlur={(e) => {
              if (!disabled && !disableFocus) setFocused(false);
              onBlur?.(e);
            }}
            onFocus={(e) => {
              if (!disabled && !disableFocus) setFocused(true);
              onFocus?.(e);
            }}
            editable={!disabled}
            disabled={disabled}
            {...props}
          />
          {!asChild && endAdornment}
        </Pressable>
      </InputContext.Provider>
    );
  }
);
Input.displayName = "Input";

const inputRingVariants = cva(
  "absolute bottom-0 left-0 right-0 top-0 -m-[3px] rounded-[10px] border-2 opacity-0 transition-all",
  {
    variants: {
      variant: {
        clear: undefined,
        default: "border-ring",
        destructive: "border-destructive/light-30",
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
      focused: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      {
        focused: true,
        className: "opacity-100",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  }
);

type InputRingProps = ViewProps & VariantProps<typeof inputRingVariants>;

export const InputRing: React.FC<InputRingProps> = ({
  className,
  ...props
}) => {
  const { focused, hovered, variant } = React.useContext(InputContext);
  return (
    <View
      className={cn(
        inputRingVariants({ focused, hovered, variant }),
        className
      )}
      {...props}
    />
  );
};

InputRing.displayName = "InputRing";

type InputAdornmentProps = ViewProps & {
  variant?: "outlined";
};

const InputAdornment = React.forwardRef<View, InputAdornmentProps>(
  ({ className, ...props }, ref) => {
    const { disabled, size } = React.useContext(InputContext);
    return (
      <View
        className={cn(
          "border-border h-full flex-none justify-center py-2",
          (size === "sm" && "px-0 py-0") ||
            (size === "md" && "px-3 py-2") ||
            "px-4 py-3",
          { "cursor-not-allowed": disabled },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputAdornment.displayName = "InputAdornment";

const InputEndAdornment = React.forwardRef<View, InputAdornmentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <InputAdornment
        className={cn(variant === "outlined" ? "border-l" : "pl-0", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
InputEndAdornment.displayName = "InputEndAdornment";

const InputStartAdornment = React.forwardRef<View, InputAdornmentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <InputAdornment
        className={cn(variant === "outlined" ? "border-r" : "pr-0", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
InputStartAdornment.displayName = "InputStartAdornment";

export {
  Input,
  InputAdornmentProps,
  InputEndAdornment,
  InputProps,
  InputStartAdornment,
};
