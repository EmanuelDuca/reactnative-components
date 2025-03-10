import {
  Alert,
  AlertDescription as ToastDescription,
  AlertDescriptionProps as ToastDescriptionProps,
  AlertIcon,
  AlertIconProps as ToastIconProps,
  AlertProps,
  AlertTitle as ToastTitle,
  AlertTitleProps as ToastTitleProps,
  Button,
  ButtonIcon,
  ButtonText,
  X,
  ButtonProps,
  ButtonTextProps,
} from "@usekeyhole/nativewind";
import React, { useContext, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  View,
  ViewProps,
} from "react-native";
import { cn, IS_WEB } from "@usekeyhole/utils";
import { cva } from "class-variance-authority";

type ToasctContextProps = {
  color: AlertProps["color"];
  isPaused: boolean;
  progress: Animated.Value;
  finish: () => void;
  close: () => void;
  pause: () => void;
  reset: () => void;
  resume: () => void;
};

const ToastContext = React.createContext<ToasctContextProps>({
  color: "grey",
  isPaused: false,
  progress: new Animated.Value(0),
  finish: () => null,
  close: () => null,
  pause: () => null,
  reset: () => null,
  resume: () => null,
});

const useToast = () => {
  return useContext(ToastContext);
};

type ToastProps = {
  duration?: number;
  close?: () => void;
  pause?: () => void;
  reset?: () => void;
  paused?: boolean;
} & AlertProps;

const Toast = React.forwardRef<View, ToastProps>(
  (
    { close, duration = 1000, className, color, paused = false, ...props },
    ref
  ) => {
    const progress = React.useRef(new Animated.Value(0)).current;
    let remainingTime = React.useRef(duration);
    const [isPaused, setIsPaused] = useState(paused);
    let animation: undefined | Animated.CompositeAnimation;
    const progressValue = React.useRef(0); // Store the current progress value here

    // Set up a listener to track changes to the progress animated value
    React.useEffect(() => {
      const listenerId = progress.addListener(({ value }) => {
        progressValue.current = value; // Update the progress value
      });

      // Clean up the listener when the component unmounts
      return () => {
        progress.removeListener(listenerId);
      };
    }, [progress]);

    const handleClose = React.useCallback(() => {
      if (close) close();
    }, [close]);

    const pause = React.useCallback(() => {
      if (animation) animation.stop();
      remainingTime.current = (1 - progressValue.current) * duration; // Use progressValue.current instead of _value
      setIsPaused(true);
    }, [animation, duration]);

    const startAnimation = React.useCallback(() => {
      if (paused) {
        pause();
        return;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      animation = Animated.timing(progress, {
        toValue: 1,
        duration: remainingTime.current,
        useNativeDriver: IS_WEB ? true : false, // Keep native driver false because we're animating width
      });

      animation.start(({ finished }) => {
        if (finished && close) {
          close();
        }
      });
    }, [paused, pause, progress, close]);

    const finish = React.useCallback(() => {
      remainingTime.current = 0;
      progress.setValue(1);
    }, [progress]);

    const resume = React.useCallback(() => {
      if (progressValue.current < 1) startAnimation(); // Use progressValue.current instead of _value
      setIsPaused(false);
    }, [startAnimation]);

    const reset = React.useCallback(() => {
      progress.setValue(0);
      remainingTime.current = duration;
      setIsPaused(false);
      startAnimation();
    }, [progress, duration, startAnimation]);

    React.useEffect(() => {
      if (paused) {
        pause();
      } else {
        resume();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused]);

    React.useEffect(() => {
      startAnimation();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Pressable
        onHoverIn={pause}
        onPressIn={pause}
        onPressOut={resume}
        onHoverOut={resume}
      >
        <ToastContext.Provider
          value={{
            progress,
            isPaused,
            pause,
            resume,
            finish,
            reset,
            close: handleClose,
            color,
          }}
        >
          <Alert
            color={color}
            className={cn("overflow-hidden p-0", className)}
            {...props}
            ref={ref}
          />
        </ToastContext.Provider>
      </Pressable>
    );
  }
);

export default Toast;

Toast.displayName = "Toast";
type ToastActionGroupProps = ViewProps;

const ToastActionGroup = ({
  children,
  className,
  ...props
}: ToastActionGroupProps) => {
  return (
    <View className={cn(`my-1 ml-4 flex-row gap-x-3`, className)} {...props}>
      {children}
    </View>
  );
};

ToastActionGroup.displayName = "ToastActionGroup";

type ToastContentProps = ViewProps;

const ToastContent = ({ children, className, ...props }: ToastContentProps) => {
  return (
    <View className={cn(`p-4`, className)} {...props}>
      {children}
    </View>
  );
};

ToastContent.displayName = "ToastContent";

type ToastActionProps = Omit<ButtonProps, "onPress"> & {
  textProps?: ButtonTextProps;
  primary?: boolean;
  onPress: (
    props: Pick<ToasctContextProps, "resume" | "pause" | "reset" | "finish"> & {
      e: GestureResponderEvent;
    }
  ) => void;
};

const ToastAction = ({
  onPress,
  children,
  className,
  textProps,
  primary,
  variant = "link",
  ...props
}: ToastActionProps) => {
  const { pause, reset, resume, finish } = useToast();
  return (
    <Button
      onHoverIn={pause}
      onPress={(e) => onPress({ e, reset, pause, resume, finish })}
      variant={variant}
      className={cn("mx-[-0.25rem] bg-transparent p-1", className)}
      {...props}
    >
      {React.Children.map(children, (child) =>
        typeof child === "string" ? (
          <ButtonText {...textProps} className={cn(textProps?.className)}>
            {child}
          </ButtonText>
        ) : (
          child
        )
      )}
    </Button>
  );
};

ToastAction.displayName = "ToastAction";

type ToastAnimatedProgressProps = ViewProps;

const toastProgressVariants = cva("h-[2px] w-auto", {
  variants: {
    color: {
      blue: "bg-blue-500 dark:bg-blue-400",
      brand: "bg-brand-500 dark:bg-brand-400",
      green: "bg-green-500 dark:bg-green-400",
      grey: "bg-neutral-200 dark:bg-neutral-400",
      red: "bg-red-500 dark:bg-red-400",
      yellow: "bg-yellow-500 dark:bg-yellow-400",
    },
  },
  defaultVariants: {
    color: "grey",
  },
});

const ToastAnimatedProgress = ({
  className,
  ...props
}: ToastAnimatedProgressProps) => {
  const { progress, color } = useToast();

  const animatedStyle = {
    width: progress.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"], // Maps progress to width percentage
    }),
    height: 2,
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <View
        {...props}
        className={cn(toastProgressVariants({ color }), [className])}
      />
    </Animated.View>
  );
};

ToastAction.displayName = "ToastAction";

type ToastCloseProps = ButtonProps;

const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  const { close, pause } = useToast();
  return (
    <Button
      onHoverIn={pause}
      className={cn(
        "absolute right-3 top-3 border-none hover:border-none hover:bg-transparent",
        className
      )}
      size="icon-sm"
      variant="ghost"
      onPress={close}
      {...props}
    >
      <ButtonIcon>
        <X />
      </ButtonIcon>
    </Button>
  );
};

const ToastIcon = ({
  className = "pointer-events-none",
  ...props
}: ToastIconProps) =>
  React.cloneElement(<AlertIcon className={className} {...props} />, {
    className,
  });

ToastIcon.displayName = "ToastIcon";
ToastClose.dispalyName = "ToastClose";
ToastTitle.displayName = "ToastTitle";
ToastDescription.displayName = "ToastDesciption";

export {
  useToast,
  Toast,
  ToastProps,
  ToastTitle,
  ToastTitleProps,
  ToastDescription,
  ToastDescriptionProps,
  ToastClose,
  ToastCloseProps,
  ToastAction,
  ToastActionProps,
  ToastIcon,
  ToastIconProps,
  ToastActionGroup,
  ToastActionGroupProps,
  ToastAnimatedProgress,
  ToastAnimatedProgressProps,
  ToastContent,
  ToastContentProps,
};
