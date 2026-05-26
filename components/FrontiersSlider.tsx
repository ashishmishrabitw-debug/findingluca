"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { FrontierArea } from "@/lib/frontiers";

type Props = {
  areas: FrontierArea[];
};

export default function FrontiersSlider({ areas }: Props) {
  const [selectedArea, setSelectedArea] = useState<FrontierArea | null>(null);

  return (
    <div className="-mx-6 overflow-hidden">
      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 pt-2 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#333_transparent]"
        role="list"
        aria-label="Frontier topics"
      >
        {areas.map((area) => (
            <article
              key={area.id}
              role="listitem"
              className="group flex min-h-[32rem] w-[min(82vw,22rem)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#111] shadow-2xl shadow-black/20 transition-[border-color,filter,transform] duration-300 ease-out hover:-translate-y-1 hover:border-[#00e5ff]/45 hover:brightness-110 focus-within:border-[#00e5ff]/45 md:w-[23rem]"
            >
              <div className="relative aspect-[1.05] w-full overflow-hidden bg-[#0a0a0a]">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  sizes="(max-width: 768px) 82vw, 23rem"
                  className="object-cover object-center brightness-[0.68] transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-[#0a0a0a]/35 to-[#111]" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold leading-tight">
                        {area.title}
                      </h3>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-[#a0a0a0]">
                        discover
                      </span>
                    </div>
                    <p className="text-xs font-medium uppercase tracking-widest text-[#777]">
                      {area.tagline}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Open ${area.title} details`}
                    onClick={() => setSelectedArea(area)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#1e1e1e] text-[#a0a0a0] transition-[background-color,border-color,color,transform] duration-300 ease-out hover:border-[#00e5ff]/60 hover:bg-[#00e5ff] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-[#a0a0a0]">
                  {area.shortDescription}
                </p>
              </div>
            </article>
          ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/frontiers"
          className="text-sm text-[#a0a0a0] transition-colors hover:text-[#00e5ff]"
        >
          See all frontiers →
        </Link>
      </div>

      <AnimatePresence>
        {selectedArea && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/65 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="frontier-modal-title"
            onClick={() => setSelectedArea(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.div
              className="relative max-h-[88vh] w-[min(92vw,42rem)] overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#111] shadow-2xl shadow-black/60"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative h-56 w-full overflow-hidden bg-[#0a0a0a] md:h-72"
                initial={{ scale: 0.92, opacity: 0.75 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={selectedArea.image}
                  alt={selectedArea.title}
                  fill
                  sizes="(max-width: 768px) 92vw, 42rem"
                  className="object-cover object-center brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#111]" />
              </motion.div>

              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedArea(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 md:p-8">
                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#00e5ff]">
                  frontier
                </p>
                <h3
                  id="frontier-modal-title"
                  className="mb-3 pr-12 text-3xl font-bold tracking-tight text-white md:text-4xl"
                >
                  {selectedArea.title}
                </h3>
                <p className="mb-6 text-xs font-medium uppercase tracking-widest text-[#777]">
                  {selectedArea.tagline}
                </p>
                <p className="text-base leading-relaxed text-[#a0a0a0]">
                  {selectedArea.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
