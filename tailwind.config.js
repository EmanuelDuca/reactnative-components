/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@usekeyhole/**/dist/*.js",
  ],
  presets: [
    require("nativewind/preset"),
    require("@usekeyhole/tailwind-config"),
  ],
  plugins: [],
};
