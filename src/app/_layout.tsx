if (typeof window !== "undefined") {
  // Prevent Reanimated crashes on web
  // @ts-ignore
  global.__reanimatedLoggerConfig = {
    logFunction: () => {}, // 👈 this is the missing piece
    disabled: true,
  };
  // @ts-ignore
  global.__reanimatedWorkletInit = () => {};
}

import { useColorScheme } from "nativewind";
import "../global.css";
import { Slot, Stack } from "expo-router";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
  useFonts,
} from "@expo-google-fonts/open-sans";
import { Button, ButtonText } from "@usekeyhole/nativewind";
import { Platform } from "react-native";

export default function Layout() {
  const theme = useColorScheme();
  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded) return null;

  if (typeof window !== "undefined") {
    // @ts-ignore
    global.__reanimatedWorkletInit = () => {};
  }

  return (
    <>
      <Button onPress={theme.toggleColorScheme}>
        <ButtonText>toggle theme</ButtonText>
      </Button>
      <Stack />
    </>
  );
}
