import { existsSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const IMAGES_PER_PROJECT = 3;
const PROJECT_COUNT = 10;
const DESTINATION_DIR = join(process.cwd(), "public", "projects");
const SOURCE_IMAGES: string[] = Array.from(
  { length: PROJECT_COUNT * IMAGES_PER_PROJECT },
  (_, index) =>
    `https://picsum.photos/seed/cubeno-${index + 1}/1600/1200`
);

const MAX_RETRIES = 3;

async function downloadImage(url: string, filename: string) {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok || !response.body) {
        throw new Error(`Error downloading ${url}: ${response.statusText}`);
      }

      const destinationPath = join(DESTINATION_DIR, filename);
      const arrayBuffer = await response.arrayBuffer();
      await writeFile(destinationPath, Buffer.from(arrayBuffer));
      return destinationPath;
    } catch (error) {
      lastError = error as Error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }

  throw lastError ?? new Error(`Unknown error downloading ${url}`);
}

async function main() {
  if (!existsSync(DESTINATION_DIR)) {
    mkdirSync(DESTINATION_DIR, { recursive: true });
  }

  const downloads = SOURCE_IMAGES.map((url, index) => {
    const projectNumber = Math.floor(index / IMAGES_PER_PROJECT) + 1;
    const imageNumber = (index % IMAGES_PER_PROJECT) + 1;
    const filename = `project${projectNumber}-${imageNumber}.jpg`;
    return downloadImage(url, filename)
      .then((path) => ({ status: "fulfilled" as const, path }))
      .catch((error) => ({ status: "rejected" as const, error }));
  });

  const results = await Promise.all(downloads);

  const successes = results.filter((result) => result.status === "fulfilled");
  const failures = results.filter((result) => result.status === "rejected");

  console.log(`Descargas exitosas: ${successes.length}`);
  if (failures.length) {
    console.error(`Fallos (${failures.length}):`);
    failures.forEach((failure) =>
      console.error(basename(failure.error.message ?? ""))
    );
  }
}

main().catch((error) => {
  console.error("Error al ejecutar el script de descargas", error);
  process.exit(1);
});

