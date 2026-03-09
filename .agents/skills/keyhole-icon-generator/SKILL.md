---
name: keyhole-icon-generator
description: Use this skill when asked to create, regenerate, or adapt a Keyhole TSX icon component from SVG input into the repository's react-native-svg icon pattern.
---

# Keyhole Icon Generator

Use this skill when:

- The user provides raw SVG copied from Figma
- The user asks to generate a new Keyhole icon component
- The user asks to convert SVG into the Keyhole TSX icon format
- The user asks to follow the existing Keyhole icon template

Do not use this skill when:

- The task is unrelated to icons
- The user is editing a normal React component
- No SVG source is provided
- The user only wants a tiny manual change to an existing icon

## Expected source format

The source is usually raw SVG like:

- `<svg ...>`
- one or more `<path ... />`
- attributes such as `stroke`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `viewBox`

## Workflow

1. Read the SVG source provided by the user.
2. Extract the root SVG attributes:
   - width
   - height
   - viewBox
3. Extract each `<path>` and preserve:
   - d
   - strokeLinecap
   - strokeLinejoin
   - fill
4. Convert SVG attributes to JSX/react-native-svg props:
   - `stroke-width` -> `strokeWidth`
   - `stroke-linecap` -> `strokeLinecap`
   - `stroke-linejoin` -> `strokeLinejoin`
5. Adapt the result to the repository template in `templates/keyhole-icon-template.tsx`.
6. Generate a TSX component with:
   - `import * as React from "react"`
   - `Svg`, `Path`, `SvgProps` from `react-native-svg`
   - `cssInterop` from `nativewind`
   - `cn` and `ecn` from `@usekeyhole/utils`
7. Name the component in PascalCase.
8. Create a matching props interface like `<IconName>Props extends SvgProps`.
9. Keep support for `color`, `className`, `strokeWidth`, and `style`.
10. Save the generated file into `src/icons/<IconName>.tsx`.

## Required output shape

- Use the same interop setup as the template
- Use `cn("stroke-foreground", classNameProp)`
- Apply `ecn(className, ["stroke", "fill"])` on `Path`
- Use `strokeWidth ? strokeWidth : 1.5`
- Use the source `d` path value exactly unless cleanup is explicitly requested

## Validation

Before finishing:

- compare the result to `templates/keyhole-icon-template.tsx`
- ensure the component name matches the requested icon name
- ensure props follow the existing Keyhole pattern
- ensure JSX prop names are camelCased
- ensure the file is saved in `src/icons/`

## Required input from the user

The request should include:
- icon name
- raw SVG source string
- optional output path

If the SVG source is missing, ask for it or explain that the icon cannot be generated precisely without it.