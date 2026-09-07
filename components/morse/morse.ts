/**
 * Morse encoding. Pure, dependency-free, no DOM access.
 * Part of the detachable morse-mode feature — see ./README.md.
 */

const DOT = "·";
const DASH = "–";

const CODE: Record<string, string> = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.",
  g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..",
  m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.",
  s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-",
  y: "-.--", z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.",
  $: "...-..-", "@": ".--.-.",
};

function glyphs(code: string): string {
  let out = "";
  for (const c of code) out += c === "." ? DOT : DASH;
  return out;
}

/**
 * Encode a string to morse. Letters are separated by a space and words
 * by a slash, per convention. Characters with no morse equivalent are
 * dropped rather than passed through, so the output stays uniform.
 */
export function toMorse(input: string): string {
  const words = input.trim().toLowerCase().split(/\s+/);
  const encoded = words
    .map((word) => {
      const letters: string[] = [];
      for (const char of word) {
        const code = CODE[char];
        if (code) letters.push(glyphs(code));
      }
      return letters.join(" ");
    })
    .filter((w) => w !== "");

  if (encoded.length === 0) return "";

  // Preserve leading/trailing whitespace so inline text does not run together.
  const lead = /^\s/.test(input) ? " " : "";
  const trail = /\s$/.test(input) ? " " : "";
  return `${lead}${encoded.join(" / ")}${trail}`;
}
