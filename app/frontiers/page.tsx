import Link from "next/link";
import { frontierAreas } from "@/lib/frontiers";

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
          {frontierAreas.map((area) => (
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
