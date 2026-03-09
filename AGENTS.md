# AGENTS.md

## Project conventions

- Use pnpm for commands.
- When asked to create a Keyhole icon, use the `keyhole-icon-generator` skill.
- Treat the provided source as SVG input.
- Generate icons as TSX components using `react-native-svg`.
- Follow the same structure and API as the existing Keyhole icon components.
- Use PascalCase for icon names and exported component names.
- Keep support for:
  - `className`
  - `color`
  - `style`
  - `strokeWidth`
- Reuse the repository icon template instead of inventing a new structure.
- Default icon size is 24x24 unless the source clearly requires something else.
- Preserve `strokeLinecap`, `strokeLinejoin`, and path data from the source SVG.
- Default `strokeWidth` to `1.5` when not otherwise specified.
- Use `cn("stroke-foreground", classNameProp)` and pass `ecn(className, ["stroke", "fill"])` to the `Path`.
- Save generated icons in `src/icons/`.
