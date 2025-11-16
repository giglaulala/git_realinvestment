import { mkdir, copyFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const sourceFile = join(
  projectRoot,
  "..",
  "real-investors-design",
  "public",
  "varketili.obj",
);
const targetDir = join(projectRoot, "public", "models");
const targetFile = join(targetDir, "varketili.obj");

async function ensureSourceExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function main() {
  const sourceExists = await ensureSourceExists(sourceFile);

  if (!sourceExists) {
    console.warn(
      "[sync-design-assets] Source OBJ not found at:",
      sourceFile,
    );
    console.warn(
      "[sync-design-assets] The hero model will fall back to the existing asset if available.",
    );
    return;
  }

  await mkdir(targetDir, { recursive: true });
  await copyFile(sourceFile, targetFile);

  console.log(
    `[sync-design-assets] Copied varketili.obj to ${targetFile}`,
  );
}

main().catch((error) => {
  console.error("[sync-design-assets] Failed to sync OBJ file.");
  console.error(error);
  process.exitCode = 1;
});


