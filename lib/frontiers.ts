export type FrontierArea = {
  id: string;
  icon: string;
  title: string;
  status: "Active" | "Incoming";
  tagline: string;
  description: string;
  shortDescription: string;
  image: string;
  questions: string[];
};

export const frontierAreas: FrontierArea[] = [
  {
    id: "robotics",
    icon: "◈",
    title: "Robotics",
    status: "Active",
    tagline: "Machines that heal.",
    description:
      "Surgical robotics, rehabilitation devices, and autonomous systems that extend what clinicians can do and bring precision medicine to places it has never reached. We explore how robotics can close the gap between diagnosis and intervention.",
    shortDescription:
      "Surgical robotics, rehabilitation devices, and autonomous systems that extend what clinicians can do.",
    image: "/robotics.png",
    questions: [
      "How do we make surgical robots accessible beyond elite hospitals?",
      "Can autonomous systems assist in real-time clinical decision-making?",
      "What role do soft robotics play in patient-facing care?",
    ],
  },
  {
    id: "genomics",
    icon: "◎",
    title: "Genomics",
    status: "Active",
    tagline: "Reading the code of life.",
    description:
      "The genome is the most detailed blueprint we have for understanding disease. We focus on how genomic data can be interpreted, acted upon, and ultimately used to design therapies that are tailored to the individual — not the average patient.",
    shortDescription:
      "Reading the genome to understand disease, design tailored therapies, and bring precision medicine to every individual.",
    image: "/logo.png",
    questions: [
      "Which genomic variants are most actionable with current tools?",
      "How do we bring genomic medicine to diverse, underrepresented populations?",
      "What does the intersection of epigenomics and disease look like?",
    ],
  },
  {
    id: "nutrition-medicine",
    icon: "◉",
    title: "Nutrition Medicine",
    status: "Active",
    tagline: "Food as the first medicine.",
    description:
      "Nutrition is one of the most underutilized levers in medicine. We're exploring how diet, micronutrients, and the gut microbiome interact with disease progression — and how nutritional interventions can be as precisely prescribed as pharmaceuticals.",
    shortDescription:
      "Exploring diet, micronutrients, and the gut microbiome as powerful levers in preventing and treating disease.",
    image: "/nutrition-medicine.png",
    questions: [
      "Which dietary patterns have the strongest causal evidence in chronic disease?",
      "How does the microbiome mediate the relationship between food and health?",
      "Can nutritional genomics personalize dietary recommendations?",
    ],
  },
  {
    id: "prosthetics",
    icon: "◇",
    title: "Prosthetics",
    status: "Active",
    tagline: "Restoring movement, touch, and independence.",
    description:
      "Modern prosthetics sit at the intersection of robotics, neuroscience, materials science, and human-centered design. We explore bionic limbs and assistive systems that do more than replace what was lost — they expand what people can do.",
    shortDescription:
      "Building human-centered bionic limbs and assistive technologies that restore movement, touch, independence, and dignity.",
    image: "/prosthetics.png",
    questions: [
      "How can prosthetics feel more natural and responsive to the body?",
      "Can sensory feedback restore touch, pressure, and proprioception?",
      "What design choices make advanced prosthetics accessible beyond elite clinical settings?",
    ],
  },
  {
    id: "longevity-science",
    icon: "◆",
    title: "Pursuit for Immortality",
    status: "Incoming",
    tagline: "Not just longer life — no death at all.",
    description:
      "Aging is the single greatest risk factor for nearly every major disease. But we ask a more radical question: what if aging itself is not inevitable? We explore the mechanisms of biological decay — from epigenetic drift to mitochondrial decline — with the audacious goal of defeating them entirely.",
    shortDescription:
      "Exploring biological decay, aging, and the audacious question of whether death from age can be defeated.",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80",
    questions: [
      "Is biological immortality a physical possibility?",
      "Which hallmarks of aging are most tractable with current tools?",
      "What would a world without age-related death look like — and should we build it?",
    ],
  },
];
