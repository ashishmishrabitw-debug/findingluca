const principles = [
  {
    title: "Serve life first",
    body: "We orient our work toward reducing suffering, extending health, and making medicine more humane.",
  },
  {
    title: "Follow evidence relentlessly",
    body: "We let data, experiment, and careful reasoning outrank fashion, hierarchy, and easy answers.",
  },
  {
    title: "Build in the open",
    body: "We share what we learn, document our thinking, and invite serious collaborators into the work.",
  },
  {
    title: "Stay adaptable",
    body: "We expect our hypotheses to change. Adaptation is not a retreat from conviction; it is how conviction survives contact with reality.",
  },
];

export default function ConstitutionPage() {
  return (
    <div className="pt-16">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-20">
          <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Constitution
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            The principles behind Finding Luca
          </h1>
          <p className="text-[#a0a0a0] text-xl max-w-3xl leading-relaxed">
            Finding Luca exists to search, research, and build toward a future
            where disease has fewer places to hide. This constitution is the
            working promise behind that effort.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className="border border-[#1e1e1e] rounded-2xl bg-[#111] p-8 hover:border-[#00e5ff]/20 transition-colors"
            >
              <p className="text-[#00e5ff] text-sm font-mono mb-6">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-2xl font-bold mb-4">{principle.title}</h2>
              <p className="text-[#a0a0a0] leading-relaxed">
                {principle.body}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1e1e1e] pt-20">
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-[#a0a0a0]">
            &ldquo;It is not the strongest of the species that survives, not the
            most intelligent that survives. It is the one that is the most
            adaptable to change.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
