import Link from "next/link";
import Image from "next/image";
import { TextScramble } from "@/components/ui/text-scramble";
import { GlowyWavesBackdrop } from "@/components/ui/glowy-waves-backdrop";
import NewsCarousel from "@/components/NewsCarousel";
import { getAllPosts } from "@/lib/posts";

const pillarsWithImages = [
  {
    icon: "◈",
    title: "Robotics",
    description: "Surgical robotics, rehabilitation devices, and autonomous systems that extend what clinicians can do and bring precision medicine everywhere.",
    status: "Active",
    image: "/robotics.png",
  },
  {
    icon: "◎",
    title: "Genomics",
    description: "Reading the genome to understand disease, design tailored therapies, and bring precision medicine to every individual.",
    status: "Active",
    image: "/logo.png",
  },
  {
    icon: "◉",
    title: "Nutrition Medicine",
    description: "Exploring diet, micronutrients, and the gut microbiome as powerful levers in preventing and treating disease.",
    status: "Active",
    image: "/nutrition-medicine.png",
  },
  {
    icon: "◇",
    title: "Prosthetics",
    description: "Building human-centered bionic limbs and assistive technologies that restore movement, touch, independence, and dignity.",
    status: "Active",
    image: "/prosthetics.png",
  },
];


export default function Home() {
  const allPosts = getAllPosts();

  return (
    <div className="pt-16">
      {/* Full-screen news carousel — first thing you see */}
      <NewsCarousel posts={allPosts} />

      {/* Lab identity section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-x-0 top-[calc(50%+74px)] h-px bg-gradient-to-r from-transparent via-[#d61f2a]/20 to-transparent" />
        </div>

        <div className="relative mb-10 flex min-h-[360px] w-screen items-center justify-center overflow-hidden md:min-h-[500px]">
          <GlowyWavesBackdrop />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="absolute inset-x-0 top-[calc(50%+90px)] h-px bg-gradient-to-r from-transparent via-[#d61f2a]/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[min(82vw,860px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10 shadow-[inset_0_0_60px_rgba(255,255,255,0.04),0_0_80px_rgba(0,0,0,0.7)]" />
          <Image
            src="/whpc-hero-logo.png"
            alt="White Heart's Placebo Club"
            width={780}
            height={780}
            priority
            className="relative z-10 w-[min(92vw,680px)] md:w-[min(78vw,760px)] object-contain drop-shadow-[0_28px_46px_rgba(0,0,0,0.82)]"
          />
        </div>

        <div className="px-6">
          <TextScramble text="Search and Research Laboratory" className="text-[#d61f2a] mb-14 md:mb-20" />
        </div>

        <h2 className="px-6 text-5xl md:text-7xl font-bold tracking-tight leading-none mb-8 max-w-4xl">
          Building the{" "}
          <span className="text-[#00e5ff]">Future</span>
          <br />
          of Medicine
        </h2>

        <p className="px-6 text-[#a0a0a0] text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          We believe medicine is one of the most important frontiers of our
          time. Finding Luca is a research lab dedicated to exploring the
          questions that matter most — from how we detect disease, to how we
          heal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 px-6">
          <Link
            href="/constitution"
            className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-[#d61f2a] hover:text-white transition-colors text-sm"
          >
            Constitution →
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 border border-[#1e1e1e] text-[#a0a0a0] font-semibold rounded-full hover:border-[#333] hover:text-white transition-colors text-sm"
          >
            Join the Lab
          </Link>
        </div>
      </section>

      {/* Frontiers pillars with images */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Frontiers
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 max-w-xl">
          Four pillars driving our work
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillarsWithImages.map((pillar) => (
            <Link
              key={pillar.title}
              href="/frontiers"
              className="group relative h-full rounded-2xl overflow-hidden border border-[#1e1e1e] bg-[#111] hover:border-[#00e5ff]/30 transition-colors flex flex-col"
            >
              {/* Background image */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0a]">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover object-center brightness-[0.55] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/35 via-[#0a0a0a]/45 to-[#111]/95" />
              </div>
              {/* Text */}
              <div className="bg-[#111] p-5 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-lg">{pillar.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-[#00e5ff]/10 text-[#00e5ff]">
                    {pillar.status}
                  </span>
                </div>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/frontiers"
            className="text-sm text-[#a0a0a0] hover:text-[#00e5ff] transition-colors"
          >
            See all frontiers →
          </Link>
        </div>
      </section>

      {/* Full-width photo break */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
          alt="Research laboratory"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Finding Luca S&amp;RL
          </p>
          <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
            Science done with curiosity and urgency
          </h2>
        </div>
      </section>

      {/* Mission quote */}
      <section className="border-t border-b border-[#1e1e1e] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-[#a0a0a0]">
            &ldquo;It is not the strongest of the species that survives, not the
            most intelligent that survives. It is the one that is the most
            adaptable to change.&rdquo;
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
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
