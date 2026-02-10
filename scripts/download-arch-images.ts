import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Descarga imagenes de arquitectura de Unsplash para cada proyecto.
 * Cada URL usa un photo-ID real de Unsplash con parametros de crop/resize.
 *
 * Unsplash permite uso gratuito con atribucion.
 * https://unsplash.com/license
 */

const OUT_DIR = resolve(process.cwd(), "public", "projects");

// Mapeo: proyecto -> array de URLs Unsplash (photo IDs verificados de arquitectura)
const PROJECT_IMAGES: Record<string, string[]> = {
  // 1. Casa Moderna en Chacras — casas modernas, exteriores e interior
  "project1": [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80",
  ],
  // 2. Departamento Minimalista — interiores minimalistas
  "project2": [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=80",
  ],
  // 3. Loft Urbano Creativo — lofts industriales
  "project3": [
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
  ],
  // 4. Casa de Campo Sustentable — casas rurales, naturaleza
  "project4": [
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&q=80",
  ],
  // 5. Penthouse con Vista Panoramica — penthouses, vistas urbanas
  "project5": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80",
  ],
  // 6. Estudio Creativo Industrial — espacios de trabajo industriales
  "project6": [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=800&fit=crop&q=80",
  ],
  // 7. Residencia Familiar Luminica — casas luminosas, grandes ventanales
  "project7": [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80",
  ],
  // 8. Boutique Hotel — hoteles boutique, interiores elegantes
  "project8": [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80",
  ],
  // 9. Casa Playa Escultural — casas costeras, arquitectura playera
  "project9": [
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&q=80",
  ],
  // 10. Oficinas Coworking Flex — espacios de coworking modernos
  "project10": [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&h=800&fit=crop&q=80",
  ],
};

async function downloadImage(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "QN-Arq-App/1.0 (image-seed-script)",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      console.error(`  ERROR ${res.status}: ${url}`);
      return false;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buffer);
    console.log(`  OK: ${dest} (${(buffer.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.error(`  FETCH ERROR: ${url}`, (err as Error).message);
    return false;
  }
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log("Descargando imagenes de arquitectura de Unsplash...\n");

  let total = 0;
  let ok = 0;

  for (const [project, urls] of Object.entries(PROJECT_IMAGES)) {
    console.log(`${project}:`);
    for (let i = 0; i < urls.length; i++) {
      total++;
      const filename = `${project}-${i + 1}.jpg`;
      const dest = join(OUT_DIR, filename);
      const success = await downloadImage(urls[i], dest);
      if (success) ok++;
      // Pequena pausa para no saturar
      await new Promise((r) => setTimeout(r, 300));
    }
    console.log("");
  }

  console.log(`\nResultado: ${ok}/${total} imagenes descargadas.`);

  if (ok < total) {
    console.log("Algunas imagenes fallaron. Ejecuta de nuevo o reemplaza manualmente.");
  }
}

main().catch(console.error);
