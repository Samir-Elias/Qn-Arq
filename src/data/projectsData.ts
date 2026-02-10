export type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
  featured?: boolean;
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Casa Moderna en Chacras",
    description:
      "Vivienda unifamiliar de 320 m² en Chacras de Coria con diseño contemporáneo de líneas puras. La volumetría se resuelve en dos bloques conectados por un puente vidriado que enmarca la vista a la cordillera, con piscina infinita integrada al paisaje.",
    images: [
      "/projects/project1-1.jpg",
      "/projects/project1-2.jpg",
      "/projects/project1-3.jpg",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Departamento Minimalista",
    description:
      "Reforma integral de un departamento de 85 m² en el centro de Mendoza. Se eliminaron tabiques para generar un espacio continuo donde la luz natural atraviesa toda la planta, con materiales nobles y paleta neutra.",
    images: ["/projects/project2-1.jpg", "/projects/project2-2.jpg"],
  },
  {
    id: 3,
    title: "Loft Urbano Creativo",
    description:
      "Reconversión de un antiguo depósito industrial en un loft de 150 m² con doble altura. Se conservaron los muros de ladrillo visto y la estructura metálica original, integrando entrepisos de madera y grandes paños vidriados.",
    images: ["/projects/project3-1.jpg", "/projects/project3-2.jpg", "/projects/project3-3.jpg"],
  },
  {
    id: 4,
    title: "Casa de Campo Sustentable",
    description:
      "Casa de fin de semana en Valle de Uco construida con técnicas sustentables: muros de adobe estabilizado, techos verdes y sistema de recolección de agua de lluvia. La implantación respeta la topografía natural del terreno.",
    images: ["/projects/project4-1.jpg", "/projects/project4-2.jpg"],
  },
  {
    id: 5,
    title: "Penthouse con Vista Panorámica",
    description:
      "Penthouse de 200 m² en torre residencial con vistas de 360° a la ciudad. El interiorismo combina pisos de roble europeo, carpinterías de aluminio negro y espacios de estar fluidos que se extienden hacia terrazas perimetrales.",
    images: ["/projects/project5-1.jpg", "/projects/project5-2.jpg", "/projects/project5-3.jpg"],
  },
  {
    id: 6,
    title: "Estudio Creativo Industrial",
    description:
      "Oficina de 240 m² para un estudio de diseño, resuelta en una nave industrial reciclada. Techos de hormigón visto, ductos expuestos y ventanales de piso a techo crean un ambiente de trabajo luminoso y versátil.",
    images: ["/projects/project6-1.jpg", "/projects/project6-2.jpg"],
  },
  {
    id: 7,
    title: "Residencia Familiar Lumínica",
    description:
      "Vivienda de 280 m² diseñada alrededor de la luz natural. Parasoles perforados de acero corten filtran la luz generando juegos de sombras que cambian durante el día, con fachada ventilada de listones de madera.",
    images: ["/projects/project7-1.jpg", "/projects/project7-2.jpg", "/projects/project7-3.jpg"],
  },
  {
    id: 8,
    title: "Boutique Hotel Boutique",
    description:
      "Hotel de 12 habitaciones frente a la montaña con arquitectura que dialoga con el paisaje árido. Volumetrías blancas, piscina central y palmeras generan un oasis contemporáneo con terrazas privadas orientadas al atardecer.",
    images: ["/projects/project8-1.jpg", "/projects/project8-2.jpg"],
  },
  {
    id: 9,
    title: "Casa Playa Escultural",
    description:
      "Residencia costera de 350 m² donde los volúmenes de hormigón y madera se escalonan siguiendo la pendiente del terreno. Grandes aberturas capturan la brisa marina y enmarcan las vistas al océano desde cada ambiente.",
    images: ["/projects/project9-1.jpg", "/projects/project9-2.jpg", "/projects/project9-3.jpg"],
  },
  {
    id: 10,
    title: "Oficinas Coworking Flex",
    description:
      "Espacio de coworking de 400 m² con diseño modular que se adapta a distintas configuraciones. Áreas de trabajo abierto, salas de reunión acústicas y zonas de descanso con mobiliario contemporáneo y vegetación interior.",
    images: ["/projects/project10-1.jpg", "/projects/project10-2.jpg"],
  },
];

export default projectsData;

