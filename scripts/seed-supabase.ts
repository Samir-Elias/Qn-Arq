import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

// Cargar .env.local manualmente
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIndex = trimmed.indexOf("=");
  if (eqIndex === -1) continue;
  const key = trimmed.slice(0, eqIndex);
  const value = trimmed.slice(eqIndex + 1);
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

// Datos estaticos inline (evitar import con path alias)
const projectsData = [
  {
    title: "Casa Moderna en Chacras",
    description: "Vivienda unifamiliar de 320 m² en Chacras de Coria con diseño contemporáneo de líneas puras. La volumetría se resuelve en dos bloques conectados por un puente vidriado que enmarca la vista a la cordillera, con piscina infinita integrada al paisaje.",
    images: ["/projects/project1-1.jpg", "/projects/project1-2.jpg", "/projects/project1-3.jpg"],
    featured: true,
  },
  {
    title: "Departamento Minimalista",
    description: "Reforma integral de un departamento de 85 m² en el centro de Mendoza. Se eliminaron tabiques para generar un espacio continuo donde la luz natural atraviesa toda la planta, con materiales nobles y paleta neutra.",
    images: ["/projects/project2-1.jpg", "/projects/project2-2.jpg"],
  },
  {
    title: "Loft Urbano Creativo",
    description: "Reconversión de un antiguo depósito industrial en un loft de 150 m² con doble altura. Se conservaron los muros de ladrillo visto y la estructura metálica original, integrando entrepisos de madera y grandes paños vidriados.",
    images: ["/projects/project3-1.jpg", "/projects/project3-2.jpg", "/projects/project3-3.jpg"],
  },
  {
    title: "Casa de Campo Sustentable",
    description: "Casa de fin de semana en Valle de Uco construida con técnicas sustentables: muros de adobe estabilizado, techos verdes y sistema de recolección de agua de lluvia. La implantación respeta la topografía natural del terreno.",
    images: ["/projects/project4-1.jpg", "/projects/project4-2.jpg"],
  },
  {
    title: "Penthouse con Vista Panorámica",
    description: "Penthouse de 200 m² en torre residencial con vistas de 360° a la ciudad. El interiorismo combina pisos de roble europeo, carpinterías de aluminio negro y espacios de estar fluidos que se extienden hacia terrazas perimetrales.",
    images: ["/projects/project5-1.jpg", "/projects/project5-2.jpg", "/projects/project5-3.jpg"],
  },
  {
    title: "Estudio Creativo Industrial",
    description: "Oficina de 240 m² para un estudio de diseño, resuelta en una nave industrial reciclada. Techos de hormigón visto, ductos expuestos y ventanales de piso a techo crean un ambiente de trabajo luminoso y versátil.",
    images: ["/projects/project6-1.jpg", "/projects/project6-2.jpg"],
  },
  {
    title: "Residencia Familiar Lumínica",
    description: "Vivienda de 280 m² diseñada alrededor de la luz natural. Parasoles perforados de acero corten filtran la luz generando juegos de sombras que cambian durante el día, con fachada ventilada de listones de madera.",
    images: ["/projects/project7-1.jpg", "/projects/project7-2.jpg", "/projects/project7-3.jpg"],
  },
  {
    title: "Boutique Hotel Boutique",
    description: "Hotel de 12 habitaciones frente a la montaña con arquitectura que dialoga con el paisaje árido. Volumetrías blancas, piscina central y palmeras generan un oasis contemporáneo con terrazas privadas orientadas al atardecer.",
    images: ["/projects/project8-1.jpg", "/projects/project8-2.jpg"],
  },
  {
    title: "Casa Playa Escultural",
    description: "Residencia costera de 350 m² donde los volúmenes de hormigón y madera se escalonan siguiendo la pendiente del terreno. Grandes aberturas capturan la brisa marina y enmarcan las vistas al océano desde cada ambiente.",
    images: ["/projects/project9-1.jpg", "/projects/project9-2.jpg", "/projects/project9-3.jpg"],
  },
  {
    title: "Oficinas Coworking Flex",
    description: "Espacio de coworking de 400 m² con diseño modular que se adapta a distintas configuraciones. Áreas de trabajo abierto, salas de reunión acústicas y zonas de descanso con mobiliario contemporáneo y vegetación interior.",
    images: ["/projects/project10-1.jpg", "/projects/project10-2.jpg"],
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  console.log("Iniciando seed de proyectos...\n");

  // Limpiar datos anteriores
  console.log("Limpiando datos anteriores...");

  // Borrar imagenes del storage
  const { data: storedFiles } = await supabase.storage
    .from("project-images")
    .list();
  if (storedFiles && storedFiles.length > 0) {
    for (const folder of storedFiles) {
      const { data: files } = await supabase.storage
        .from("project-images")
        .list(folder.name);
      if (files && files.length > 0) {
        const paths = files.map((f) => `${folder.name}/${f.name}`);
        await supabase.storage.from("project-images").remove(paths);
      }
    }
  }

  // Borrar registros de la BD (cascade borra project_images y click_events)
  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // delete all
  if (deleteError) {
    console.error("Error limpiando proyectos:", deleteError.message);
  } else {
    console.log("Datos anteriores eliminados.\n");
  }

  for (const project of projectsData) {
    const { data: newProject, error: projectError } = await supabase
      .from("projects")
      .insert({
        title: project.title,
        description: project.description,
        featured: project.featured ?? false,
      })
      .select()
      .single();

    if (projectError || !newProject) {
      console.error(`Error creando proyecto: ${project.title}`, projectError);
      continue;
    }

    console.log(`Proyecto creado: ${project.title} (${newProject.id})`);

    for (let i = 0; i < project.images.length; i++) {
      const imagePath = project.images[i];
      const localPath = join(process.cwd(), "public", imagePath);

      let fileBuffer: Buffer;
      try {
        fileBuffer = readFileSync(localPath);
      } catch {
        console.warn(`  Imagen no encontrada: ${localPath}, saltando...`);
        continue;
      }

      const ext = imagePath.split(".").pop() ?? "jpg";
      const storagePath = `${newProject.id}/${i}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(storagePath, fileBuffer, {
          contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
        });

      if (uploadError) {
        console.error(`  Error subiendo ${imagePath}:`, uploadError.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(storagePath);

      const { error: insertError } = await supabase
        .from("project_images")
        .insert({
          project_id: newProject.id,
          storage_path: storagePath,
          url: publicUrl,
          display_order: i,
          is_main: i === 0,
        });

      if (insertError) {
        console.error(`  Error registrando imagen:`, insertError.message);
        continue;
      }

      console.log(
        `  Imagen ${i + 1}/${project.images.length}: ${storagePath} ${i === 0 ? "(principal)" : ""}`
      );
    }

    console.log("");
  }

  console.log("Seed completado.");
}

main().catch(console.error);
