#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_INPUT = "src/icons/figma-icons.json";
const DEFAULT_OUTPUT_DIR = "src/icons";
const DEFAULT_SIZE = 24;
const DEFAULT_STROKE_WIDTH = 1.5;

const SUPPORTED_PATH_ATTRIBUTES = new Set([
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "fill-rule",
  "clip-rule",
  "opacity",
  "fill-opacity",
  "stroke-opacity",
  "stroke-miterlimit",
]);

const IGNORED_PATH_ATTRIBUTES = new Set(["id"]);

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    outDir: DEFAULT_OUTPUT_DIR,
    limit: undefined,
    skipExisting: true,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (current === "--input" || current === "-i") {
      args.input = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--out-dir" || current === "-o") {
      args.outDir = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--limit") {
      args.limit = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (current === "--overwrite") {
      args.skipExisting = false;
      continue;
    }

    if (current === "--skip-existing") {
      args.skipExisting = true;
      continue;
    }

    if (current === "--help" || current === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/generate-keyhole-icons.js [options]

Options:
  --input, -i <path>      Input JSON file (default: ${DEFAULT_INPUT})
  --out-dir, -o <path>    Output directory (default: ${DEFAULT_OUTPUT_DIR})
  --limit <number>        Process only the first N icons
  --skip-existing         Skip icons when target file exists (default)
  --overwrite             Overwrite existing icon files
  --help, -h              Show help
`);
}

function escapeJsString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function toPascalCase(name) {
  const normalized = String(name ?? "")
    .trim()
    .replace(/[^A-Za-z0-9]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part)) {
        return part;
      }

      return `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`;
    })
    .join("");

  if (!normalized) {
    return "Icon";
  }

  if (/^\d/.test(normalized)) {
    return `Icon${normalized}`;
  }

  return normalized;
}

function makeUniqueName(baseName, seenNames) {
  const currentCount = seenNames.get(baseName) ?? 0;
  seenNames.set(baseName, currentCount + 1);

  if (currentCount === 0) {
    return baseName;
  }

  return `${baseName}${currentCount + 1}`;
}

function parseAttributes(rawAttributes) {
  const attributes = {};
  const attributePattern = /([A-Za-z_:][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let match = attributePattern.exec(rawAttributes);

  while (match) {
    const name = match[1];
    const value = match[3] ?? match[4] ?? "";
    attributes[name] = value;
    match = attributePattern.exec(rawAttributes);
  }

  return attributes;
}

function extractUnknownTags(svgSource) {
  const unknownTags = new Set();
  const tagPattern = /<\s*([A-Za-z][\w:-]*)\b/g;
  let match = tagPattern.exec(svgSource);

  while (match) {
    const tagName = match[1].toLowerCase();
    if (tagName !== "svg" && tagName !== "g" && tagName !== "path") {
      unknownTags.add(tagName);
    }
    match = tagPattern.exec(svgSource);
  }

  return Array.from(unknownTags).sort();
}

function getSvgRootAttributes(svgSource) {
  const rootMatch = svgSource.match(/<svg\b([^>]*)>/i);
  if (!rootMatch) {
    return null;
  }

  return parseAttributes(rootMatch[1]);
}

function getPathAttributes(svgSource) {
  const paths = [];
  const pathPattern = /<path\b([^>]*)\/?>/gi;
  let match = pathPattern.exec(svgSource);

  while (match) {
    paths.push(parseAttributes(match[1]));
    match = pathPattern.exec(svgSource);
  }

  return paths;
}

function normalizeFloat(value) {
  if (value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  if (!/^-?\d*\.?\d+$/.test(normalized)) {
    return null;
  }

  return String(Number(normalized));
}

function svgAttributeToJsxProp(attributeName) {
  return attributeName.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function formatPropValue(value) {
  const normalizedNumeric = normalizeFloat(value);
  if (normalizedNumeric !== null) {
    return normalizedNumeric;
  }

  return `"${escapeJsString(value)}"`;
}

function buildPathBlock(pathAttributes) {
  const lines = [];
  const sourceStroke = pathAttributes.stroke;
  const sourceFill = pathAttributes.fill;
  const sourceLinecap = pathAttributes["stroke-linecap"];
  const sourceLinejoin = pathAttributes["stroke-linejoin"];
  const sourceStrokeWidth = pathAttributes["stroke-width"];

  const hasStroke = sourceStroke !== "none";
  const hasFill = sourceFill && sourceFill !== "none";

  if (hasStroke) {
    lines.push("stroke={color}");
  }

  if (sourceFill === "none") {
    lines.push('fill="none"');
  } else if (hasFill) {
    lines.push("fill={color}");
  }

  if (sourceLinecap) {
    lines.push(`strokeLinecap="${escapeJsString(sourceLinecap)}"`);
  }

  if (sourceLinejoin) {
    lines.push(`strokeLinejoin="${escapeJsString(sourceLinejoin)}"`);
  }

  const fallbackStrokeWidth = normalizeFloat(sourceStrokeWidth);
  const strokeWidthFallback =
    fallbackStrokeWidth !== null
      ? fallbackStrokeWidth
      : String(DEFAULT_STROKE_WIDTH);

  if (hasStroke) {
    lines.push(`strokeWidth={strokeWidth ? strokeWidth : ${strokeWidthFallback}}`);
  }

  for (const [rawName, rawValue] of Object.entries(pathAttributes)) {
    if (
      rawName === "d" ||
      rawName === "stroke" ||
      rawName === "fill" ||
      rawName === "stroke-width" ||
      rawName === "stroke-linecap" ||
      rawName === "stroke-linejoin" ||
      rawName === "id"
    ) {
      continue;
    }

    if (!SUPPORTED_PATH_ATTRIBUTES.has(rawName)) {
      continue;
    }

    const propName = svgAttributeToJsxProp(rawName);
    lines.push(`${propName}=${formatPropValue(rawValue)}`);
  }

  lines.push(`d="${escapeJsString(pathAttributes.d)}"`);

  return lines;
}

function buildComponentSource(componentName, svgMeta, pathBlocks) {
  const propsName = `${componentName}Props`;
  const width = svgMeta.width ?? DEFAULT_SIZE;
  const height = svgMeta.height ?? DEFAULT_SIZE;
  const viewBox = svgMeta.viewBox ?? `0 0 ${width} ${height}`;
  const renderedPaths = pathBlocks
    .map((pathProps) => {
      const propLines = pathProps
        .map((propLine) => `        ${propLine}`)
        .join("\n");

      return `      <Path
${propLines}
        // @ts-ignore
        className={ecn(className, ["stroke", "fill"])}
      />`;
    })
    .join("\n");

  return `import * as React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { cssInterop } from "nativewind";
import { cn, ecn } from "@usekeyhole/utils";

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true },
  },
});

cssInterop(Path, {
  className: {
    // @ts-ignore
    target: "style",
    nativeStyleToProp: {
      stroke: true,
      // @ts-ignore
      strokeWidth: true,
      fill: true,
    },
  },
});

export interface ${propsName} extends SvgProps {
  className?: string;
}

export const ${componentName}: React.FC<${propsName}> = ({
  color = "#262626",
  className: classNameProp,
  strokeWidth,
  style,
  ...props
}) => {
  const className = cn("stroke-foreground", classNameProp);

  return (
    <Svg
      width={${width}}
      height={${height}}
      fill="none"
      viewBox="${escapeJsString(viewBox)}"
      className={className}
      style={style}
      {...props}
    >
${renderedPaths}
    </Svg>
  );
};
`;
}

function collectPathUnsupportedAttributes(pathAttributes) {
  const unsupported = [];
  for (const attributeName of Object.keys(pathAttributes)) {
    if (IGNORED_PATH_ATTRIBUTES.has(attributeName)) {
      continue;
    }

    if (!SUPPORTED_PATH_ATTRIBUTES.has(attributeName)) {
      unsupported.push(attributeName);
    }
  }

  return unsupported.sort();
}

function numberFromSvgSize(value) {
  if (!value) {
    return null;
  }

  const trimmed = String(value).trim();
  const numberMatch = trimmed.match(/^(-?\d*\.?\d+)/);
  if (!numberMatch) {
    return null;
  }

  return Number(numberMatch[1]);
}

function resolveSvgMeta(rootAttributes) {
  const viewBox = rootAttributes.viewBox;
  const widthFromAttr = numberFromSvgSize(rootAttributes.width);
  const heightFromAttr = numberFromSvgSize(rootAttributes.height);

  if (viewBox) {
    const parts = viewBox
      .trim()
      .split(/\s+/)
      .map((part) => Number(part));

    if (parts.length === 4 && parts.every((part) => Number.isFinite(part))) {
      return {
        width: widthFromAttr ?? parts[2] ?? DEFAULT_SIZE,
        height: heightFromAttr ?? parts[3] ?? DEFAULT_SIZE,
        viewBox,
      };
    }
  }

  return {
    width: widthFromAttr ?? DEFAULT_SIZE,
    height: heightFromAttr ?? DEFAULT_SIZE,
    viewBox: `0 0 ${widthFromAttr ?? DEFAULT_SIZE} ${heightFromAttr ?? DEFAULT_SIZE}`,
  };
}

function incrementMapCount(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = path.resolve(args.input);
  const outDir = path.resolve(args.outDir);

  const rawInput = await fs.readFile(inputPath, "utf8");
  const parsedInput = JSON.parse(rawInput);

  if (!Array.isArray(parsedInput)) {
    throw new Error(`Input must be an array of { name, svg }. Received: ${typeof parsedInput}`);
  }

  const inputItems =
    Number.isFinite(args.limit) && args.limit >= 0
      ? parsedInput.slice(0, Math.floor(args.limit))
      : parsedInput;

  await fs.mkdir(outDir, { recursive: true });

  const seenComponentNames = new Map();
  const unsupportedTagCounts = new Map();
  const unsupportedPathAttributeCounts = new Map();
  const unsupportedIcons = [];

  let created = 0;
  let skipped = 0;
  let invalidItems = 0;
  let iconsWithoutPaths = 0;
  let pathsWithoutD = 0;

  for (const [index, icon] of inputItems.entries()) {
    if (!icon || typeof icon.name !== "string" || typeof icon.svg !== "string") {
      invalidItems += 1;
      unsupportedIcons.push({
        index,
        name: icon?.name ?? `icon-${index}`,
        reasons: ["invalid-item-shape"],
      });
      continue;
    }

    const baseComponentName = toPascalCase(icon.name);
    const componentName = makeUniqueName(baseComponentName, seenComponentNames);
    const outputPath = path.join(outDir, `${componentName}.tsx`);

    if (args.skipExisting && (await fileExists(outputPath))) {
      skipped += 1;
      continue;
    }

    const rootAttributes = getSvgRootAttributes(icon.svg);
    const pathAttributesList = getPathAttributes(icon.svg);
    const unknownTags = extractUnknownTags(icon.svg);
    const iconUnsupportedReasons = [];

    if (!rootAttributes) {
      iconUnsupportedReasons.push("missing-svg-root");
    }

    if (unknownTags.length > 0) {
      for (const tagName of unknownTags) {
        incrementMapCount(unsupportedTagCounts, tagName);
      }
      iconUnsupportedReasons.push(`unsupported-tags:${unknownTags.join(",")}`);
    }

    if (pathAttributesList.length === 0) {
      iconsWithoutPaths += 1;
      iconUnsupportedReasons.push("no-path-elements");
    }

    const pathBlocks = [];
    for (const pathAttributes of pathAttributesList) {
      if (!pathAttributes.d) {
        pathsWithoutD += 1;
        iconUnsupportedReasons.push("path-missing-d");
        continue;
      }

      const unsupportedPathAttributes =
        collectPathUnsupportedAttributes(pathAttributes);
      for (const attributeName of unsupportedPathAttributes) {
        incrementMapCount(unsupportedPathAttributeCounts, attributeName);
      }

      pathBlocks.push(buildPathBlock(pathAttributes));
    }

    if (!rootAttributes || pathBlocks.length === 0) {
      unsupportedIcons.push({
        index,
        name: icon.name,
        outputFile: path.basename(outputPath),
        reasons: iconUnsupportedReasons,
      });
      continue;
    }

    if (iconUnsupportedReasons.length > 0) {
      unsupportedIcons.push({
        index,
        name: icon.name,
        outputFile: path.basename(outputPath),
        reasons: iconUnsupportedReasons,
      });
    }

    const svgMeta = resolveSvgMeta(rootAttributes);
    const componentSource = buildComponentSource(componentName, svgMeta, pathBlocks);
    await fs.writeFile(outputPath, componentSource, "utf8");
    created += 1;
  }

  const summary = {
    input: {
      file: inputPath,
      total: parsedInput.length,
      processed: inputItems.length,
    },
    output: {
      dir: outDir,
      created,
      skippedExisting: skipped,
    },
    unsupported: {
      invalidItems,
      iconsWithoutPaths,
      pathsWithoutD,
      tagCounts: Object.fromEntries(
        Array.from(unsupportedTagCounts.entries()).sort((a, b) =>
          a[0].localeCompare(b[0]),
        ),
      ),
      pathAttributeCounts: Object.fromEntries(
        Array.from(unsupportedPathAttributeCounts.entries()).sort((a, b) =>
          a[0].localeCompare(b[0]),
        ),
      ),
      affectedIcons: unsupportedIcons.length,
      affectedIconDetails: unsupportedIcons,
    },
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
