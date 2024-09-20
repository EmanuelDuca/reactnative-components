import { buttonIconVariants, Check } from "@usekeyhole/nativewind";
import { CheckmarkIcon, Skeleton } from "@usekeyhole/ui";
import { cn } from "@usekeyhole/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { Children } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  PressableProps,
  ViewProps,
  TextProps,
} from "react-native";

const checkboxVariants = cva("relative flex flex-row gap-4", {
  variants: {
    variant: {
      default: "",
      disabled: "",
      validation: "",
    },
    checked: {
      true: undefined,
      false: undefined,
    },
    hovered: {
      false: undefined,
      true: undefined,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CheckboxProps = PressableProps &
  VariantProps<typeof checkboxVariants> & {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    value?: string;
  };

const CheckboxContext = React.createContext<{
  variant: CheckboxProps["variant"];
  checked: boolean;
  hovered: boolean;
  disabled: boolean;
}>({
  variant: "default",
  checked: false,
  hovered: false,
  disabled: false,
});

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      variant,
      className,
      onHoverIn,
      onHoverOut,
      onChange,
      checked: selected,
      ...props
    },
    ref
  ) => {
    const disabled = !!props.disabled;
    const [checked, setChecked] = React.useState<boolean>(!!selected);
    const [hovered, setHovered] = React.useState(false);
    return (
      <CheckboxContext.Provider value={{ variant, disabled, hovered, checked }}>
        <Pressable
          ref={ref}
          className={cn(
            checkboxVariants({ hovered, checked, variant }),
            className
          )}
          onHoverIn={() => {
            setHovered(true);
          }}
          onHoverOut={() => {
            setHovered(false);
          }}
          onPress={() => {
            onChange?.(!checked);
            setChecked(!checked);
          }}
          {...props}
        />
      </CheckboxContext.Provider>
    );
  }
);

Checkbox.displayName = "Checkbox";

//// The Code bellow is for indicator

export const checkboxIndicatorVariants = cva(
  "size-6 items-center justify-center rounded border-2 p-1 transition-colors",
  {
    variants: {
      variant: {
        default: "border-neutral-200",
        disabled: "border-neutral-300 bg-green-500",
        validation: "bg-background border-red-700",
      },
      checked: {
        false: undefined,
        true: undefined,
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
      disabled: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      // Default hover
      {
        variant: "default",
        hovered: true,
        className: "border-neutral-400",
      },
      //Checked
      {
        checked: true,
        className: "bg-brand-700 border-brand-200",
      },
      //Checked hover
      {
        checked: true,
        hovered: true,
        className: "bg-brand-600 border-brand-200",
      },
      //Disabled
      {
        disabled: true,
        className: "bg-neutral-100",
      },
      //Disabled Checked
      {
        disabled: true,
        checked: true,
        className: "bg-brand-700 border-brand-200",
      },
      //Validation
      {
        variant: "validation",
        checked: false,
        className: "border-destructive-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  }
);

export type CheckboxIndicatorProps = ViewProps &
  VariantProps<typeof checkboxIndicatorVariants>;

export const CheckboxIndicator = ({
  className,
  checked,
  hovered,
  variant,
  disabled,
  ...props
}: CheckboxIndicatorProps) => {
  // const { checked, hovered, variant } = React.useContext(FacetedFilterContext);
  return (
    <View
      className={cn(
        checkboxIndicatorVariants({ hovered, checked, variant, disabled })
      )}
      {...props}
    >
      {checked && <Check color={"white"} width={16} height={16} />}
    </View>
  );
};

CheckboxIndicator.displayName = "CheckboxIndicator";

/// The code bellow is for Label component

export type CheckboxLabelProps = TextProps;

export const CheckboxLabel = React.forwardRef<Text, CheckboxLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-foreground text-sm font-semibold", className)}
        {...props}
      />
    );
  }
);
CheckboxLabel.displayName = "CheckboxName";

///The code bellow is for Description Component

export type CheckboxDescriptionProps = TextProps;

export const CheckboxDescription = React.forwardRef<
  Text,
  CheckboxDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-accent-foreground text-sm font-normal", className)}
      {...props}
    />
  );
});
CheckboxDescription.displayName = "CheckboxDescription";

// The code bellow is for Content component
export type CheckboxContentProps = ViewProps;

export const CheckboxContent = React.forwardRef<View, CheckboxContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("gap-1 py-0.5", className)} {...props} />
    );
  }
);
