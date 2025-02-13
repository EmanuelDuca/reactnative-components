import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export interface AnimatedHeightProps extends ViewProps {
  hide: boolean;
  extraHeight?: number;
  duration?: number;
}

export const AnimatedHeight = React.forwardRef<View, AnimatedHeightProps>(
  (
    { hide, extraHeight = 0, children, duration = 200, style, ...props },
    ref
  ) => {
    const [measuredHeight, setMeasuredHeight] = React.useState(0);
    const opacityValue = useSharedValue(hide ? 0 : 1);
    const heightValue = useSharedValue(hide ? 0 : measuredHeight + extraHeight);

    React.useEffect(() => {
      opacityValue.value = withTiming(hide ? 0 : 1, { duration });
      heightValue.value = withTiming(hide ? 0 : 1, { duration });
    }, [hide, measuredHeight, extraHeight, opacityValue, heightValue]);

    const heightStyle = useAnimatedStyle(() => ({
      height: heightValue.value * (measuredHeight + extraHeight),
    }));

    const opacityStyle = useAnimatedStyle(() => ({
      opacity: opacityValue.value,
    }));

    return (
      <Animated.View style={[{ overflow: "hidden" }, heightStyle]}>
        <Animated.View
          ref={ref}
          style={[
            StyleSheet.absoluteFill,
            { bottom: "auto" },
            opacityStyle,
            style,
          ]}
          onLayout={(e) => {
            const height = e.nativeEvent.layout.height;
            setMeasuredHeight(height);
          }}
          {...props}
        >
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
);
