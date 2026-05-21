import Link from "next/link";
import Image from "next/image";
import { TextScramble } from "@/components/ui/text-scramble";

const pillars = [
  {
    icon: "◈",
    title: "Precision Diagnostics",
    description:
      "Developing tools that detect disease earlier and more accurately than current methods, giving patients a real fighting chance.",
    status: "Active",
  },
  {
    icon: "◎",
    title: "Regenerative Medicine",
    description:
      "Exploring how the body can be guided to repair itself — from cellular therapies to engineered tissue.",
    status: "Active",
  },
  {
    icon: "◉",
    title: "AI-Driven Drug Discovery",
    description:
      "Using machine learning to find patterns in biological data that would take humans decades to uncover on their own.",
    status: "Incoming",
  },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00e5ff] opacity-[0.04] blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#00e5ff] opacity-[0.03] blur-3xl" />
        </div>

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Finding Luca"
            width={80}
            height={80}
            className="rounded-full object-contain bg-black ring-1 ring-[#00e5ff]/20"
          />
        </div>

        <TextScramble text="Finding Luca Research Laboratory" className="text-[#00e5ff] mb-6" />

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 max-w-4xl">
          Building the{" "}
          <span className="text-[#00e5ff]">Future</span>
          <br />
          of Medicine
        </h1>

        <p className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          We believe medicine is one of the most important frontiers of our
          time. Finding Luca is a research lab dedicated to exploring the
          questions that matter most — from how we detect disease, to how we
          heal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/research"
            className="px-8 py-3.5 bg-[#00e5ff] text-black font-semibold rounded-full hover:bg-[#00b8cc] transition-colors text-sm"
          >
            Our Research →
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 border border-[#1e1e1e] text-[#a0a0a0] font-semibold rounded-full hover:border-[#333] hover:text-white transition-colors text-sm"
          >
            Join the Lab
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#333]">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#333]" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Research pillars */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
          What We&apos;re Working On
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 max-w-xl">
          Three pillars driving our work
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-[#1e1e1e] rounded-2xl p-8 bg-[#111] hover:border-[#00e5ff]/30 transition-colors group"
            >
              <div className="text-3xl text-[#00e5ff] mb-6">{pillar.icon}</div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-semibold text-lg">{pillar.title}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    pillar.status === "Active"
                      ? "bg-[#00e5ff]/10 text-[#00e5ff]"
                      : "bg-white/5 text-[#a0a0a0]"
                  }`}
                >
                  {pillar.status}
                </span>
              </div>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/research"
            className="text-sm text-[#a0a0a0] hover:text-[#00e5ff] transition-colors"
          >
            See all research areas →
          </Link>
        </div>
      </section>

      {/* Mission quote */}
      <section className="border-t border-b border-[#1e1e1e] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-[#a0a0a0]">
            &ldquo;The best scientists don&apos;t just follow the evidence —
            they{" "}
            <span className="text-white font-medium">
              imagine what it could mean
            </span>
            .&rdquo;
          </p>
        </div>
      </section>

      {/* Latest from blog */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              From the Lab
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Latest Writing</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[#a0a0a0] hover:text-[#00e5ff] transition-colors hidden sm:block"
          >
            All posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/blog"
            className="group border border-[#1e1e1e] rounded-2xl p-8 bg-[#111] hover:border-[#00e5ff]/30 transition-colors block"
          >
            <span className="text-xs text-[#00e5ff] font-medium tracking-widest uppercase">
              Essay
            </span>
            <h3 className="text-xl font-semibold mt-3 mb-3 group-hover:text-[#00e5ff] transition-colors">
              Why I Started Finding Luca
            </h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              Medicine has always been the intersection of science and humanity.
              Here&apos;s why I believe the next decade will define the next
              century of health.
            </p>
            <p className="text-[#333] text-xs mt-6">Coming soon</p>
          </Link>

          <Link
            href="/news"
            className="group border border-[#1e1e1e] rounded-2xl p-8 bg-[#111] hover:border-[#00e5ff]/30 transition-colors block"
          >
            <span className="text-xs text-[#00e5ff] font-medium tracking-widest uppercase">
              News
            </span>
            <h3 className="text-xl font-semibold mt-3 mb-3 group-hover:text-[#00e5ff] transition-colors">
              Lab Updates & Medical News
            </h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              Follow along as we track breakthroughs, publish findings, and
              share what&apos;s happening at the frontier of medicine.
            </p>
            <p className="text-[#333] text-xs mt-6">View all news →</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to be part of this?
          </h2>
          <p className="text-[#a0a0a0] mb-8 max-w-lg mx-auto">
            We&apos;re always looking for curious, driven people who want to
            work on problems that actually matter.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-[#00e5ff] text-black font-semibold rounded-full hover:bg-[#00b8cc] transition-colors text-sm"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </div>
  );
}
