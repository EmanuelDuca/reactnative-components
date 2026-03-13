import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.FIGMA_API_KEY;
const fileKey = process.env.FIGMA_FILE_KEY;
const iconsFrameId = "1:2905";

async function main() {
  const response = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(iconsFrameId)}`,
    {
      headers: {
        "X-Figma-Token": token,
      },
    },
  );

  const node = response.data.nodes?.[iconsFrameId]?.document;

  if (!node) {
    throw new Error("Icons frame not found");
  }

  console.log(`Node: ${node.name} [${node.type}] (${node.id})`);
  console.log(`Children count: ${node.children?.length ?? 0}\n`);

  for (const child of node.children ?? []) {
    console.log(`- ${child.name} [${child.type}] (${child.id})`);
  }
}

main().catch((error) => {
  if (error.response) {
    console.error(
      "Figma API error:",
      error.response.status,
      error.response.data,
    );
  } else {
    console.error(error);
  }
});
