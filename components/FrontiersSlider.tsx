"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { FrontierArea } from "@/lib/frontiers";

type Props = {
  areas: FrontierArea[];
};

export default function FrontiersSlider({ areas }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="-mx-6 overflow-hidden">
      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 pt-2 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#333_transparent]"
        role="list"
        aria-label="Frontier topics"
      >
        {areas.map((area) => {
          const isExpanded = expandedId === area.id;

          return (
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
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${area.title}`}
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedId(isExpanded ? null : area.id)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#1e1e1e] text-[#a0a0a0] transition-[background-color,border-color,color,transform] duration-300 ease-out hover:border-[#00e5ff]/60 hover:bg-[#00e5ff] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 ease-out ${
                        isExpanded ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-[#a0a0a0]">
                  {isExpanded ? area.description : area.shortDescription}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/frontiers"
          className="text-sm text-[#a0a0a0] transition-colors hover:text-[#00e5ff]"
        >
          See all frontiers →
        </Link>
      </div>
    </div>
  );
}
