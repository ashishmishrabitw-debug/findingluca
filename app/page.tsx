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

      {/* Join our Community */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-[#5865F2]/30 bg-[#5865F2]/5 px-8 py-16 text-center">
          <p className="text-[#5865F2] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Community
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join our Community
          </h2>
          <p className="text-[#a0a0a0] mb-8 max-w-lg mx-auto">
            We&apos;re building a growing community of researchers, scientists, and curious minds. Join our Discord to collaborate, share ideas, and stay connected with what&apos;s happening at Finding Luca.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/Sm9q5ZnmS8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#5865F2] text-white font-semibold rounded-full hover:bg-[#4752c4] transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord →
            </a>
            <a
              href="https://chat.whatsapp.com/LcJkWJHMpNR4MwEKUDi38o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#1e1e1e] text-[#a0a0a0] font-semibold rounded-full hover:border-[#333] hover:text-white transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Join WhatsApp
            </a>
          </div>
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
