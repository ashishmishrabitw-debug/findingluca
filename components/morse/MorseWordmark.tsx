import Image from "next/image";
import { toMorse } from "./morse";

/**
 * The navbar wordmark for morse mode.
 *
 * The site logo is a single PNG with the words baked into it, so the text
 * engine cannot touch it. This swaps in the heart-only asset — the heart is
 * left exactly as it is — beside the name rendered as morse.
 *
 * Encoded once at module load; the strings are constant.
 * Part of the detachable morse-mode feature — see ./README.md.
 */

const LINE_ONE = toMorse("White Heart's");
const LINE_TWO = toMorse("Placebo Club");

export default function MorseWordmark() {
  return (
    <span data-morse-wordmark className="items-center gap-3">
      <Image
        src="/whpc-heart.png"
        alt="White Heart's Placebo Club"
        width={76}
        height={76}
        className="h-9 w-9 shrink-0 object-contain"
      />
      {/* The real logo scales down responsively; this wordmark cannot, so
          below lg only the heart shows and the nav keeps its layout. */}
      <span className="hidden whitespace-nowrap font-mono text-[8px] leading-[1.6] tracking-[0.06em] lg:block">
        <span className="block">{LINE_ONE}</span>
        <span className="block">{LINE_TWO}</span>
      </span>
    </span>
  );
}
