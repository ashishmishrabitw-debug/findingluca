import Link from "next/link";
import Image from "next/image";
import { TextScramble } from "@/components/ui/text-scramble";
import NewsCarousel from "@/components/NewsCarousel";
import FrontiersSlider from "@/components/FrontiersSlider";
import { frontierAreas } from "@/lib/frontiers";
import { getAllPosts } from "@/lib/posts";


export default function Home() {
  const allPosts = getAllPosts();

  return (
    <div className="pt-16">
      {/* Full-screen news carousel — first thing you see */}
      <NewsCarousel posts={allPosts} />

      {/* Lab identity section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 overflow-hidden">
        <div className="px-6">
          <TextScramble text="Search and Research Laboratory" className="text-[#d61f2a] mb-6" />
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
            className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-[#00e5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00e5ff] active:bg-[#00b8cc] transition-colors duration-300 ease-out text-sm"
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

      {/* Frontiers slider */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Frontiers
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-xl">
          Long-term focus areas
        </h2>

        <FrontiersSlider areas={frontierAreas} />
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
