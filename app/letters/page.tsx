import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Letters | WHPC",
  description: "One paper a week, read closely.",
};

export default function LettersPage() {
  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Letters
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          One paper a week
        </h1>
        <p className="text-[#a0a0a0] text-xl max-w-2xl leading-relaxed mb-16">
          Each letter takes a single paper and reads it closely, then sends
          you to the paper itself.
        </p>

        <div className="border border-[#1e1e1e] rounded-2xl p-16 text-center text-[#555]">
          <p className="text-lg">The first letter is on its way.</p>
        </div>
      </div>
    </div>
  );
}
