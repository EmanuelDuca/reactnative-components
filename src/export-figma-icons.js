import axios from "axios";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

dotenv.config();

const FIGMA_API_BASE = "https://api.figma.com/v1";
const RENDERABLE_TYPES = new Set([
  "BOOLEAN_OPERATION",
  "COMPONENT",
  "COMPONENT_SET",
  "ELLIPSE",
  "FRAME",
  "GROUP",
  "INSTANCE",
  "LINE",
  "POLYGON",
  "RECTANGLE",
  "REGULAR_POLYGON",
  "STAR",
  "VECTOR",
]);

function parseArgs(argv) {
  const args = {
    output: "src/icons/figma-icons.json",
    url: process.env.FIGMA_FILE_URL,
    nodeId: process.env.FIGMA_NODE_ID,
    fileKey: process.env.FIGMA_FILE_KEY,
    concurrency: Number(process.env.FIGMA_EXPORT_CONCURRENCY ?? 16),
    maxIcons: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (current === "--url" || current === "-u") {
      args.url = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--output" || current === "-o") {
      args.output = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--node-id") {
      args.nodeId = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--file-key") {
      args.fileKey = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--concurrency") {
      args.concurrency = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (current === "--max-icons") {
      args.maxIcons = Number(argv[index + 1]);
      index += 1;
    }
  }

  return args;
}

function parseFigmaUrl(figmaUrl) {
  const parsed = new URL(figmaUrl);
  const segments = parsed.pathname.split("/").filter(Boolean);

  const designIndex = segments.findIndex((segment) => segment === "design");
  if (designIndex < 0 || !segments[designIndex + 1]) {
    throw new Error("Figma URL must include /design/{fileKey}/...");
  }

  const fileKey = segments[designIndex + 1];
  const rawNodeId = parsed.searchParams.get("node-id");
  const nodeId = rawNodeId ? rawNodeId.replace(/-/g, ":") : null;

  return { fileKey, nodeId };
}

function isVisible(node) {
  return node?.visible !== false;
}

function walk(node, visit) {
  visit(node);

  for (const child of node.children ?? []) {
    walk(child, visit);
  }
}

function getRenderableChildren(node) {
  return (node.children ?? []).filter(
    (child) => isVisible(child) && RENDERABLE_TYPES.has(child.type),
  );
}

function pickIconNodes(rootNode) {
  const componentLikeNodes = [];

  walk(rootNode, (node) => {
    if (node.id === rootNode.id || !isVisible(node)) {
      return;
    }

    if (node.type === "COMPONENT" || node.type === "INSTANCE") {
      componentLikeNodes.push(node);
    }
  });

  if (componentLikeNodes.length > 0) {
    return componentLikeNodes;
  }

  const directRenderable = getRenderableChildren(rootNode);
  if (directRenderable.length > 0) {
    return directRenderable;
  }

  const fallback = [];
  walk(rootNode, (node) => {
    if (node.id === rootNode.id || !isVisible(node)) {
      return;
    }

    if (RENDERABLE_TYPES.has(node.type)) {
      fallback.push(node);
    }
  });

  return fallback;
}

function splitInBatches(items, size) {
  const batches = [];

  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }

  return batches;
}

function createUniqueName(name, seenNames) {
  const baseName = (name ?? "").trim() || "icon";
  const currentCount = seenNames.get(baseName) ?? 0;
  seenNames.set(baseName, currentCount + 1);

  if (currentCount === 0) {
    return baseName;
  }

  return `${baseName}-${currentCount + 1}`;
}

async function getNodeDocument(fileKey, nodeId, token) {
  const response = await axios.get(`${FIGMA_API_BASE}/files/${fileKey}/nodes`, {
    params: { ids: nodeId },
    headers: { "X-Figma-Token": token },
  });

  return response.data?.nodes?.[nodeId]?.document;
}

async function getSvgUrlsById(fileKey, nodeIds, token) {
  const batches = splitInBatches(nodeIds, 80);
  const imageMap = {};

  for (const batch of batches) {
    const response = await axios.get(`${FIGMA_API_BASE}/images/${fileKey}`, {
      params: {
        ids: batch.join(","),
        format: "svg",
        svg_include_id: true,
      },
      headers: { "X-Figma-Token": token },
    });

    Object.assign(imageMap, response.data?.images ?? {});
  }

  return imageMap;
}

async function fetchSvgContent(url) {
  const response = await axios.get(url, {
    responseType: "text",
    timeout: 45000,
  });
  return response.data;
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const normalizedConcurrency = Math.max(1, Math.floor(concurrency));
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(normalizedConcurrency, items.length) }, () =>
      worker(),
    ),
  );

  return results;
}

async function main() {
  const token = process.env.FIGMA_API_KEY;
  if (!token) {
    throw new Error("Missing FIGMA_API_KEY in .env");
  }

  const args = parseArgs(process.argv.slice(2));
  let fileKey = args.fileKey;
  let nodeId = args.nodeId;

  if (args.url) {
    const parsed = parseFigmaUrl(args.url);
    fileKey = parsed.fileKey;
    nodeId = nodeId ?? parsed.nodeId;
  }

  if (!fileKey) {
    throw new Error("Missing Figma file key. Provide --url or --file-key.");
  }

  if (!nodeId) {
    throw new Error(
      "Missing node id. Provide --node-id or include node-id in the URL query.",
    );
  }

  const rootNode = await getNodeDocument(fileKey, nodeId, token);

  if (!rootNode) {
    throw new Error(`Node ${nodeId} not found in file ${fileKey}.`);
  }

  const discoveredIconNodes = pickIconNodes(rootNode);
  if (discoveredIconNodes.length === 0) {
    throw new Error("No renderable icon nodes found in the selected node.");
  }

  const iconNodes =
    typeof args.maxIcons === "number" && Number.isFinite(args.maxIcons)
      ? discoveredIconNodes.slice(0, Math.max(0, Math.floor(args.maxIcons)))
      : discoveredIconNodes;

  console.log(
    `Discovered ${discoveredIconNodes.length} candidate icons. Exporting ${iconNodes.length}.`,
  );

  const nodeIds = iconNodes.map((node) => node.id);
  const svgUrlById = await getSvgUrlsById(fileKey, nodeIds, token);
  const seenNames = new Map();
  let completed = 0;

  const iconResults = await mapWithConcurrency(
    iconNodes,
    args.concurrency,
    async (node) => {
      const svgUrl = svgUrlById[node.id];
      if (!svgUrl) {
        return null;
      }

      const svg = await fetchSvgContent(svgUrl);
      completed += 1;

      if (completed % 50 === 0 || completed === iconNodes.length) {
        console.log(`Fetched ${completed}/${iconNodes.length} SVG files...`);
      }

      return {
        name: createUniqueName(node.name, seenNames),
        svg,
      };
    },
  );

  const icons = iconResults.filter(Boolean);

  await fs.mkdir(path.dirname(args.output), { recursive: true });
  await fs.writeFile(
    args.output,
    `${JSON.stringify(icons, null, 2)}\n`,
    "utf8",
  );

  console.log(`Exported ${icons.length} icons to ${args.output}`);
}

main().catch((error) => {
  if (error.response) {
    console.error(
      "Figma API error:",
      error.response.status,
      JSON.stringify(error.response.data, null, 2),
    );
    process.exit(1);
  }

  console.error(error.message || error);
  process.exit(1);
});
