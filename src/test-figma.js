import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.FIGMA_API_KEY;
const fileKey = process.env.FIGMA_FILE_KEY;

async function main() {
  if (!token) throw new Error("Missing FIGMA_API_KEY in .env");
  if (!fileKey) throw new Error("Missing FIGMA_FILE_KEY in .env");

  const response = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}?depth=2`,
    {
      headers: {
        "X-Figma-Token": token,
      },
    },
  );

  const file = response.data;
  const pages = file.document?.children ?? [];

  console.log(`File: ${file.name}`);
  console.log("Pages:\n");

  for (const page of pages) {
    console.log(`- ${page.name} [${page.type}] (${page.id})`);
    for (const child of page.children ?? []) {
      console.log(`   • ${child.name} [${child.type}] (${child.id})`);
    }
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
