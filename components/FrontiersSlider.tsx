"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { FrontierArea } from "@/lib/frontiers";
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogImage,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/linear-card";

type Props = {
  areas: FrontierArea[];
};

function wrapIndex(index: number, total: number) {
  return (index + total) % total;
}

function shortestOffset(index: number, activeIndex: number, total: number) {
  const raw = index - activeIndex;
  if (raw > total / 2) return raw - total;
  if (raw < -total / 2) return raw + total;
  return raw;
}

export default function FrontiersSlider({ areas }: Props) {
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const activeArea = areas[activeIndex];
  const total = areas.length;

  const orderedAreas = useMemo(
    () =>
      areas
        .map((area, index) => ({
          area,
          index,
          offset: shortestOffset(index, activeIndex, total),
        }))
        .sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset)),
    [activeIndex, areas, total]
  );

  const goToPrevious = () => setActiveIndex((current) => wrapIndex(current - 1, total));
  const goToNext = () => setActiveIndex((current) => wrapIndex(current + 1, total));

  return (
    <div
      className="relative -mx-6 overflow-hidden px-6 py-2"
      tabIndex={0}
      role="region"
      aria-label="Frontiers slider"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goToNext();
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const deltaX = touchEndX - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(deltaX) < 40) return;
        if (deltaX > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }}
    >
      <div className="relative mx-auto h-[35rem] max-w-6xl [perspective:1200px] sm:h-[38rem]">
        {orderedAreas.map(({ area, index, offset }) => {
          const isActive = offset === 0;
          const clampedOffset = Math.max(Math.min(offset, 2), -2);
          const distance = Math.abs(clampedOffset);
          const translateX = clampedOffset * 17;
          const translateZ = isActive ? 80 : -distance * 130;
          const rotateY = clampedOffset * -13;
          const scale = isActive ? 1 : 0.82 - distance * 0.04;
          const opacity = distance > 2 ? 0 : isActive ? 1 : 0.62 - distance * 0.12;
          const cardClassName = `absolute left-1/2 top-4 flex h-[31rem] w-[min(78vw,21rem)] origin-center -translate-x-1/2 flex-col overflow-hidden rounded-2xl border bg-[#111] text-left shadow-2xl shadow-black/30 transition-[opacity,transform,border-color,filter] duration-500 ease-out motion-reduce:transition-none sm:top-8 sm:h-[32rem] sm:w-[22rem] ${
            isActive
              ? "border-[#00e5ff]/70 brightness-100"
              : "border-[#1e1e1e] brightness-75 hover:border-white/20"
          }`;
          const cardStyle = {
            opacity,
            transform: `translateX(calc(-50% + ${translateX}rem)) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            zIndex: 20 - distance,
          };
          const cardBody = (
            <>
              <div className="relative aspect-[1.05] w-full overflow-hidden bg-[#0a0a0a]">
                {isActive ? (
                  <DialogImage
                    src={area.image}
                    alt={area.title}
                    className="h-full w-full scale-105 object-cover object-center transition-transform duration-700 motion-reduce:transition-none"
                  />
                ) : (
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 78vw, 22rem"
                    className="object-cover object-center transition-transform duration-700 motion-reduce:transition-none"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-[#0a0a0a]/35 to-[#111]" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold leading-tight">{area.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      area.status === "Active"
                        ? "bg-[#00e5ff]/10 text-[#00e5ff]"
                        : "bg-white/5 text-[#a0a0a0]"
                    }`}
                  >
                    {area.status}
                  </span>
                </div>
                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#777]">
                  {area.tagline}
                </p>
                <p className="text-sm leading-relaxed text-[#a0a0a0]">
                  {area.shortDescription}
                </p>
                {isActive && (
                  <span className="mt-auto pt-5 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                    tap to expand
                  </span>
                )}
              </div>
            </>
          );

          return isActive ? (
            <Dialog
              key={area.id}
              transition={{
                type: "spring",
                bounce: 0.05,
                duration: 0.5,
              }}
            >
              <DialogTrigger className={cardClassName} style={cardStyle}>
                {cardBody}
              </DialogTrigger>
              <DialogContainer className="grid w-full place-items-center px-4 py-16">
                <DialogContent className="relative max-h-[calc(100vh-8rem)] w-[min(92vw,52rem)] overflow-y-auto rounded-3xl border border-[#1e1e1e] bg-[#111] shadow-2xl shadow-black/50">
                  <DialogImage
                    src={area.image}
                    alt={area.title}
                    className="h-72 w-full object-cover object-center"
                  />
                  <div className="p-6 md:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <DialogTitle className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        {area.title}
                      </DialogTitle>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          area.status === "Active"
                            ? "bg-[#00e5ff]/10 text-[#00e5ff]"
                            : "bg-white/5 text-[#a0a0a0]"
                        }`}
                      >
                        {area.status}
                      </span>
                    </div>
                    <p className="mb-5 text-xs font-medium uppercase tracking-widest text-[#777]">
                      {area.tagline}
                    </p>
                    <DialogDescription
                      disableLayoutAnimation
                      className="text-[#a0a0a0]"
                      variants={{
                        initial: { opacity: 0, scale: 0.98, y: 12 },
                        animate: { opacity: 1, scale: 1, y: 0 },
                        exit: { opacity: 0, scale: 0.98, y: 12 },
                      }}
                    >
                      <p className="leading-relaxed">{area.description}</p>
                    </DialogDescription>
                    <Link
                      href="/frontiers"
                      className="mt-8 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-300 ease-out hover:bg-[#00e5ff]"
                    >
                      See full frontier →
                    </Link>
                  </div>
                  <DialogClose className="rounded-full bg-black/60 p-3 text-white backdrop-blur transition-colors hover:bg-black" />
                </DialogContent>
              </DialogContainer>
            </Dialog>
          ) : (
            <button
              key={area.id}
              type="button"
              aria-label={`Show ${area.title}`}
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={cardClassName}
              style={cardStyle}
            >
              {cardBody}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goToPrevious}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#1e1e1e] text-[#a0a0a0] transition-colors hover:border-[#333] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
          aria-label="Previous frontier"
        >
          ←
        </button>
        <div className="flex items-center gap-2" aria-label={`${activeArea.title} selected`}>
          {areas.map((area, index) => (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${area.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className="grid h-8 w-8 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === activeIndex ? "h-1.5 w-6 bg-white" : "h-1.5 w-1.5 bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={goToNext}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#1e1e1e] text-[#a0a0a0] transition-colors hover:border-[#333] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
          aria-label="Next frontier"
        >
          →
        </button>
      </div>

      <div className="mt-8 text-center">
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
