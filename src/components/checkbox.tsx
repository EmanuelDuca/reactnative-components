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
      validation:""
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
  ({ variant, className, onHoverIn, onHoverOut, onChange,checked: selected,  ...props }, ref) => {
    const disabled = !!props.disabled;
    const [checked, setChecked] = React.useState(selected);
    const [hovered, setHovered] = React.useState(false);
    return (
      <CheckboxContext.Provider value={{ variant, disabled, hovered, checked }}>
        <Pressable
          ref={ref}
          className={cn(
            checkboxVariants({ hovered, checked, variant }),
            className
          )}
          onHoverIn={(e) => {
            setHovered(true);
          }}
          onHoverOut={(e) => {
            setHovered(false);
          }}
          onPress={(e) => {
            onChange(!checked);
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
  "size-6 border-2 p-1 rounded justify-center items-center transition-colors",
  {
    variants: {
      variant: {
        default: "border-neutral-200",
        disabled: "bg-green-500 border-neutral-300",
        validation: "bg-white border-red-700",
      },
      checked: {
        false: undefined,
        true: undefined,
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
      disabled:{
        false: undefined,
        true: undefined,
      }
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
      // disabled
      {
        disabled: true,
        className:'bg-neutral-100',
      },
      {
        disabled:true,
        checked:true,
        className:'bg-brand-700 border-brand-200'
      },
      //Validation
      {
        variant: "validation",
        checked: false,
        className:"bg-white border-red-700"
      }
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
  ...props
}: CheckboxIndicatorProps) => {
  const { checked, hovered, disabled, variant } = React.useContext(CheckboxContext);
  return (
    <View className={cn(checkboxIndicatorVariants({ hovered, checked, disabled, variant }))}>
      {checked && <Check color={"white"} width={16} height={16} />}
    </View>
  );
};

CheckboxIndicator.displayName = "CheckboxIndicator";

/// The code bellow is for Label component

const checkboxLabelVariants = cva("text-sm font-semibold text-neutral-800 dark:text-neutral-100", {
  variants: {
    variant: {
      default: "",
      checked: "",
      disabled: "",
      validation: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CheckboxLabelProps = TextProps &
  VariantProps<typeof checkboxLabelVariants>;

export const CheckboxLabel = React.forwardRef<Text, CheckboxLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { hovered, checked, variant } = React.useContext(CheckboxContext);
    return (
      <Text
        ref={ref}
        className={cn(checkboxLabelVariants({ variant }), className)}
      >
        {children}
      </Text>
    );
  }
);
CheckboxLabel.displayName = "CheckboxName";

///The code bellow is for Description Component

const checkboxDescriptionVariants = cva("text-sm font-normal text-neutral-600 dark:text-neutral-100", {
  variants: {
    variant: {
      default: "",
      checked: "",
      disabled: "",
      validation: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CheckboxDescriptionProps = TextProps &
  VariantProps<typeof checkboxDescriptionVariants>;

export const CheckboxDescription = React.forwardRef<
  Text,
  CheckboxDescriptionProps
>(({ className, children, ...props }, ref) => {
  const { hovered, checked, variant } = React.useContext(CheckboxContext);

  return (
    <Text
      ref={ref}
      className={cn(
        checkboxDescriptionVariants({ variant: "default" }),
        className
      )}
    >
      {children}
    </Text>
  );
});
CheckboxDescription.displayName = "CheckboxDescription";

// The code bellow is for Content component
const checkboxContentVariants = cva("py-0.5 gap-1", {
  variants: {
    variant: {
      default: "",
      disabled: "",
      validation:""
    },
    checked: {
        false: undefined,
        true: undefined,
      },
    hovered: {
        false: undefined,
        true: undefined,
    },
  },
  defaultVariants: {
    variant: "default"
  }
});

export type CheckboxContentProps = ViewProps & VariantProps<typeof checkboxContentVariants>;

export const CheckboxContent = React.forwardRef<View, CheckboxContentProps>(({className, children, ...props}, ref
) => {
  const {variant, checked, hovered} = React.useContext(CheckboxContext);
  return(
    <View 
    ref={ref}
     className={cn(checkboxContentVariants({variant}))} >
      {children}
    </View>
  );
});