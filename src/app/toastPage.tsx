import { CircleAlert } from "@usekeyhole/nativewind";
import * as React from "react";
import { Text, View } from "react-native";
import Toast, {
  ToastAction,
  ToastActionGroup,
  ToastAnimatedProgress,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastProps,
  ToastTitle,
} from "~/components/toast/toast";

export default function Page() {
  return <Content />;
}

type ToastDemoProps = {
  hasProgressBar?: boolean;
  hasCloseButton?: boolean;
} & ToastProps;

const toastConfigs: ToastDemoProps[] = [
  { color: "grey", duration: 5000, hasProgressBar: true, hasCloseButton: true },
  { color: "red", duration: 1000, hasProgressBar: true, hasCloseButton: true },
  { color: "yellow" },
  { color: "green" },
  { color: "blue", hasCloseButton: true },
  { color: "brand" },
];

const ToastDemo = ({
  hasProgressBar,
  hasCloseButton,
  ...props
}: ToastDemoProps) => (
  <Toast>
    <ToastContent>
      <ToastTitle className={hasCloseButton ? "pr-7" : ""}>Test</ToastTitle>
      <ToastIcon>
        <CircleAlert />
      </ToastIcon>
      <ToastDescription className={hasCloseButton ? "pr-7" : ""}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
        adipisci minima.
      </ToastDescription>
      <ToastActionGroup>
        <ToastAction onPress={() => {}} primary>
          Primary
        </ToastAction>
        <ToastAction onPress={() => {}}>Secondary</ToastAction>
      </ToastActionGroup>
      {hasCloseButton && <ToastClose />}
    </ToastContent>
    {hasProgressBar && <ToastAnimatedProgress />}
  </Toast>
);

function Content() {
  return (
    <View className="w-full h-full bg-white">
      <View className="p-12">
        <Toast color={"green"}>
          <ToastContent>
            <ToastTitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              adipisci minima corporis harum est atque voluptatum suscipit quia
              nostrum!.
            </ToastTitle>
            <ToastIcon>
              <CircleAlert />
            </ToastIcon>
            {/* <ToastDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              adipisci minima corporis harum est atque voluptatum suscipit quia
              nostrum!.
            </ToastDescription> */}
            <ToastClose />
          </ToastContent>
        </Toast>
      </View>
    </View>
  );
}
