import Link from "next/link";

const areas = [
  {
    id: "precision-diagnostics",
    icon: "◈",
    title: "Precision Diagnostics",
    status: "Active",
    tagline: "Detect earlier. Act faster.",
    description:
      "Current diagnostic tools often catch disease too late. We're exploring new approaches — from biomarker analysis to AI-assisted imaging — that can identify illness at its earliest, most treatable stage. Earlier detection doesn't just improve outcomes; it fundamentally changes what medicine can offer.",
    questions: [
      "What biological signals precede detectable disease?",
      "How do we validate early markers across diverse populations?",
      "Can AI outperform traditional screening in specific contexts?",
    ],
  },
  {
    id: "regenerative-medicine",
    icon: "◎",
    title: "Regenerative Medicine",
    status: "Active",
    tagline: "Healing from within.",
    description:
      "The body has remarkable capacity to repair itself — but it often needs guidance. This research area focuses on understanding and amplifying that capacity: from stem cell biology to engineered scaffolds that help tissue regrow, to therapies that reprogram cells to heal what was once considered permanent damage.",
    questions: [
      "Which cell types hold the most therapeutic promise?",
      "How do we control differentiation without unintended effects?",
      "What role does the immune system play in enabling or blocking regeneration?",
    ],
  },
  {
    id: "ai-drug-discovery",
    icon: "◉",
    title: "AI-Driven Drug Discovery",
    status: "Incoming",
    tagline: "Compressing decades into years.",
    description:
      "Drug discovery is slow, expensive, and relies on approaches developed before modern computing existed. We're building towards a research program that uses machine learning to identify candidate molecules, predict toxicity, and model biological pathways — collapsing discovery timelines and expanding what's pharmacologically possible.",
    questions: [
      "Which disease targets are underexplored but tractable?",
      "How do we train models on sparse biological data?",
      "Can foundation models accelerate structural biology?",
    ],
  },
  {
    id: "longevity-science",
    icon: "◇",
    title: "Longevity Science",
    status: "Incoming",
    tagline: "More healthy years, not just more years.",
    description:
      "Aging is the single greatest risk factor for nearly every major disease. Understanding its mechanisms — from epigenetic drift to mitochondrial decline — may unlock interventions that don't just extend lifespan, but dramatically extend healthspan. We're watching this space closely and plan to contribute directly.",
    questions: [
      "What are the most tractable hallmarks of aging?",
      "How do we measure biological age accurately?",
      "Which interventions have the strongest evidence at a systems level?",
    ],
  },
];

export default function ResearchPage() {
  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Research
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            What We&apos;re Building
          </h1>
          <p className="text-[#a0a0a0] text-xl max-w-2xl leading-relaxed">
            Each area below represents a bet on where biology and technology
            converge. We pursue questions that are hard, important, and
            under-researched.
          </p>
        </div>

        {/* Research areas */}
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
                        <li
                          key={q}
                          className="flex items-start gap-3 text-sm text-[#a0a0a0]"
                        >
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

        {/* Collaborate CTA */}
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
