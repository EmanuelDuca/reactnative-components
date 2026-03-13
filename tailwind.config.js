import nativewindPresetModule from "nativewind/preset";
import keyholeTailwindConfigModule from "@usekeyhole/tailwind-config";

const nativewindPreset =
  nativewindPresetModule.default ?? nativewindPresetModule;
const keyholeTailwindConfig =
  keyholeTailwindConfigModule.default ?? keyholeTailwindConfigModule;

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@usekeyhole/**/dist/*.js",
  ],
  presets: [nativewindPreset, keyholeTailwindConfig],
  plugins: [],
};

export default config;
