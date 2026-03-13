---
name: keyhole-icons-batch-generator
description: Use this skill when asked to convert many icons from src/icons/figma-icons.json into Keyhole TSX components in src/icons/.
---

# Keyhole Icons Batch Generator

Use this skill when:

- The user wants to generate many icon components at once
- The source data is a JSON file with items shaped as `{ name, svg }`
- The user wants output in the same Keyhole icon TSX pattern
- The task requires looping through a full icon set from Figma export

Do not use this skill when:

- The user only needs one icon (use `keyhole-icon-generator`)
- The task is unrelated to icon generation
- No source JSON is available

## Expected input

- JSON file path (default: `src/icons/figma-icons.json`)
- Output directory (default: `src/icons/`)
- Optional overwrite behavior (`overwrite` or `skip-existing`)

Input item shape:

```ts
type IconItem = {
  name: string;
  svg: string;
};
```

## Core requirements

- Follow `templates/keyhole-icon-template.tsx` exactly for structure/interops
- Use `react-native-svg` and keep template imports
- Keep support for `className`, `color`, `style`, `strokeWidth`
- Use `cn("stroke-foreground", classNameProp)`
- On each `Path`, apply `ecn(className, ["stroke", "fill"])`
- Use `strokeWidth ? strokeWidth : 1.5`
- Keep default icon size at `24x24` unless source `viewBox` clearly requires different values
- Preserve source path data and linecap/linejoin attributes

## Workflow

1. Read `src/icons/figma-icons.json`.
2. Validate it is an array of `{ name, svg }`.
3. For each icon entry:
   - Parse `name` into a valid PascalCase component name.
   - If a name starts with a digit, prefix with `Icon`.
   - Deduplicate collisions by appending a numeric suffix.
4. Parse the raw SVG string:
   - Extract root `viewBox`, `width`, `height`.
   - Extract every `<path ... />` element.
   - Convert SVG attributes to JSX props:
     - `stroke-width` -> `strokeWidth`
     - `stroke-linecap` -> `strokeLinecap`
     - `stroke-linejoin` -> `strokeLinejoin`
     - `fill-rule` -> `fillRule`
     - `clip-rule` -> `clipRule`
5. Generate one file per icon as:
   - `src/icons/<PascalCaseName>.tsx`
6. Build each component from the keyhole template pattern.
7. Keep formatting stable and deterministic across all generated files.

## Scale policy (important)

- For large sets (for example hundreds/thousands of icons), do not hand-author each file manually.
- Prefer creating/updating a generator script, then execute it to write all icon component files.
- Use `pnpm` for project commands.
- After generation, run a targeted check (type/lint if available) only for relevant files.

## Output contract

Each generated component must:

- Export `<IconName>Props extends SvgProps`
- Export `const <IconName>: React.FC<<IconName>Props>`
- Render one `<Path>` per source SVG path
- Use `className={ecn(className, ["stroke", "fill"])}` on each `Path`
- Preserve source vector semantics in JSX-compatible props

## Validation checklist

- Confirm all expected files are created in `src/icons/`
- Confirm component names are PascalCase and unique
- Confirm template interop (`cssInterop`) matches repository pattern
- Confirm no kebab-case SVG prop names remain in JSX
- Confirm generation is repeatable (same input -> same output)

## Recommended invocation prompt

Use this exact style when invoking the assistant:

- "Use `keyhole-icons-batch-generator`. Read `src/icons/figma-icons.json`, generate Keyhole TSX icon components into `src/icons/`, skip existing files, and report created/skipped counts."

For overwrite mode:

- "Use `keyhole-icons-batch-generator`. Regenerate all icons from `src/icons/figma-icons.json` into `src/icons/` with overwrite enabled."
