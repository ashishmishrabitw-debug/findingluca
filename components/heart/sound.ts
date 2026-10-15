/**
 * Synthesised heart sounds: a low "lub" then a slightly higher, shorter
 * "dub". No audio files. Browsers only allow sound after the reader has
 * interacted with the page, so call unlockSound() from a key or pointer
 * handler before the first playLubDub().
 */

let ctx: AudioContext | null = null

export function unlockSound() {
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!Ctor) return
    ctx = new Ctor()
  }
  if (ctx.state === "suspended") void ctx.resume()
}

function thump(at: number, freq: number, length: number, volume: number) {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.setValueAtTime(freq, at)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, at + length)

  filter.type = "lowpass"
  filter.frequency.value = 260

  gain.gain.setValueAtTime(0.0001, at)
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length)

  osc.connect(filter).connect(gain).connect(ctx.destination)
  osc.start(at)
  osc.stop(at + length + 0.02)
}

/** One heartbeat. `gap` is the time from lub to dub in seconds. */
export function playLubDub(gap: number) {
  if (!ctx || ctx.state === "closed") return
  const play = () => {
    if (!ctx) return
    const now = ctx.currentTime + 0.01
    thump(now, 62, 0.16, 0.6)
    thump(now + gap, 82, 0.11, 0.42)
  }
  // Right after unlockSound() the context is still starting up; play as
  // soon as it is running rather than dropping the beat.
  if (ctx.state === "running") play()
  else void ctx.resume().then(play)
}
