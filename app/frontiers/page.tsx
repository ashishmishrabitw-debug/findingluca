import Link from "next/link";

const areas = [
  {
    id: "robotics",
    icon: "◈",
    title: "Robotics",
    status: "Active",
    tagline: "Machines that heal.",
    description:
      "Surgical robotics, rehabilitation devices, and autonomous systems that extend what clinicians can do and bring precision medicine to places it has never reached. We explore how robotics can close the gap between diagnosis and intervention.",
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
    questions: [
      "Is biological immortality a physical possibility?",
      "Which hallmarks of aging are most tractable with current tools?",
      "What would a world without age-related death look like — and should we build it?",
    ],
  },
];

export default function FrontiersPage() {
  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-20">
          <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Frontiers
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Long-Term Focus Areas
          </h1>
          <p className="text-[#a0a0a0] text-xl max-w-2xl leading-relaxed">
            These are the scientific horizons we are orienting toward. Not
            everything we work on today — but everything we are building toward.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {areas.map((area) => (
            <div
              key={area.id}
              className="border border-[#1e1e1e] rounded-2xl p-10 bg-[#111] hover:border-[#00e5ff]/20 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="text-4xl text-[#00e5ff] shrink-0">{area.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold">{area.title}</h2>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        area.status === "Active"
                          ? "bg-[#00e5ff]/10 text-[#00e5ff]"
                          : "bg-white/5 text-[#a0a0a0]"
                      }`}
                    >
                      {area.status}
                    </span>
                  </div>
                  <p className="text-[#a0a0a0] text-sm font-medium uppercase tracking-widest mb-4">
                    {area.tagline}
                  </p>
                  <p className="text-[#a0a0a0] leading-relaxed mb-8">
                    {area.description}
                  </p>
                  <div>
                    <p className="text-xs text-[#555] uppercase tracking-widest mb-3 font-medium">
                      Questions we&apos;re asking
                    </p>
                    <ul className="flex flex-col gap-2">
                      {area.questions.map((q) => (
                        <li key={q} className="flex items-start gap-3 text-sm text-[#a0a0a0]">
                          <span className="text-[#00e5ff] mt-0.5 shrink-0">—</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center border-t border-[#1e1e1e] pt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Working on something related?
          </h2>
          <p className="text-[#a0a0a0] mb-8">
            We&apos;re open to collaborations, conversations, and connections.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-[#00e5ff] text-black font-semibold rounded-full hover:bg-[#00b8cc] transition-colors text-sm"
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
