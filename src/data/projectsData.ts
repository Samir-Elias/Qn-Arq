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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id lectus ut velit accumsan gravida eu sed velit.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus tortor augue, id sodales lectus lacinia vitae.",
    images: ["/projects/project2-1.jpg", "/projects/project2-2.jpg"],
  },
  {
    id: 3,
    title: "Loft Urbano Creativo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus, dolor vel posuere sodales, lorem est dignissim felis.",
    images: ["/projects/project3-1.jpg", "/projects/project3-2.jpg", "/projects/project3-3.jpg"],
  },
  {
    id: 4,
    title: "Casa de Campo Sustentable",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, nisl id cursus vestibulum, diam purus luctus arcu.",
    images: ["/projects/project4-1.jpg", "/projects/project4-2.jpg"],
  },
  {
    id: 5,
    title: "Penthouse con Vista Panorámica",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum dui eget metus tristique, vitae posuere ipsum interdum.",
    images: ["/projects/project5-1.jpg", "/projects/project5-2.jpg", "/projects/project5-3.jpg"],
  },
  {
    id: 6,
    title: "Estudio Creativo Industrial",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed posuere libero, id auctor arcu. Integer eleifend viverra libero.",
    images: ["/projects/project6-1.jpg", "/projects/project6-2.jpg"],
  },
  {
    id: 7,
    title: "Residencia Familiar Lumínica",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia mauris non mauris tristique, sed tincidunt dui finibus.",
    images: ["/projects/project7-1.jpg", "/projects/project7-2.jpg", "/projects/project7-3.jpg"],
  },
  {
    id: 8,
    title: "Boutique Hotel Boutique",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis porttitor justo, vitae rhoncus dolor. Mauris ultricies facilisis erat.",
    images: ["/projects/project8-1.jpg", "/projects/project8-2.jpg"],
  },
  {
    id: 9,
    title: "Casa Playa Escultural",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo enim sed tincidunt tristique. Phasellus id varius mi.",
    images: ["/projects/project9-1.jpg", "/projects/project9-2.jpg", "/projects/project9-3.jpg"],
  },
  {
    id: 10,
    title: "Oficinas Coworking Flex",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae lobortis lorem. Duis eget nunc sed mauris suscipit auctor.",
    images: ["/projects/project10-1.jpg", "/projects/project10-2.jpg"],
  },
];

export default projectsData;

