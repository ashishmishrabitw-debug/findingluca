/**
 * The site's heart rhythm. One shared clock that decides when the heart
 * beats, so the navbar heart and the screen effects stay in step. Client-only.
 *
 * The rate is in beats per minute and moves between:
 * - resting: one beat every 7 s by day, every 10 s at night
 * - excited: up to 130 a minute while the reader scrolls fast or taps
 *   the heart, easing back down over a few seconds
 * - tachycardia: 190 a minute for a few seconds after rapid tapping
 */

export type Beat = {
  /** Seconds until the next beat at the current rate. */
  interval: number
  tachycardia: boolean
}

type Listener = (beat: Beat) => void

const REST_BPM_DAY = 60 / 7
const REST_BPM_NIGHT = 60 / 10
const EXCITED_BPM = 130
const TACHYCARDIA_BPM = 190
/** Seconds for excitement to fall to about a third. */
const CALM_DOWN = 2.5

const listeners = new Set<Listener>()
const tachyListeners = new Set<(on: boolean) => void>()

let excitement = 0
let tachyUntil = 0
let night = false
/** 0 → 1 between beats. Starts so the first beat lands about 2 s in. */
let phase = 1 - 2 / 7
let users = 0
let frame = 0
let last = 0
let wasTachy = false

function restBpm() {
  return night ? REST_BPM_NIGHT : REST_BPM_DAY
}

function isTachy(now = performance.now()) {
  return now < tachyUntil
}

export function currentBpm() {
  if (isTachy()) return TACHYCARDIA_BPM
  const rest = restBpm()
  return rest + (EXCITED_BPM - rest) * excitement
}

function emit() {
  const beat = { interval: 60 / currentBpm(), tachycardia: isTachy() }
  listeners.forEach((l) => l(beat))
}

function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.25)
  last = now
  excitement *= Math.exp(-dt / CALM_DOWN)
  if (excitement < 0.002) excitement = 0

  const tachy = isTachy(now)
  if (tachy !== wasTachy) {
    wasTachy = tachy
    tachyListeners.forEach((l) => l(tachy))
  }

  phase += (dt * currentBpm()) / 60
  if (phase >= 1) {
    phase = 0
    emit()
  }
  frame = requestAnimationFrame(tick)
}

/** Start the clock. Returns a stop function; the clock runs while anyone holds it. */
export function startRhythm() {
  users++
  if (users === 1) {
    last = performance.now()
    frame = requestAnimationFrame(tick)
  }
  return () => {
    users--
    if (users === 0) cancelAnimationFrame(frame)
  }
}

export function onBeat(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function onTachycardia(listener: (on: boolean) => void) {
  tachyListeners.add(listener)
  return () => {
    tachyListeners.delete(listener)
  }
}

/** Beat right now, and restart the count to the next one. */
export function beatNow() {
  phase = 0
  emit()
}

/** Raise the pulse by `amount` (0–1). */
export function excite(amount: number) {
  excitement = Math.min(1, excitement + amount)
}

/** Hold the pulse at least at `level` (0–1), e.g. while scrolling. */
export function exciteTo(level: number) {
  excitement = Math.max(excitement, Math.min(1, level))
}

export function startTachycardia(ms: number) {
  tachyUntil = performance.now() + ms
  excitement = 1
  beatNow()
}

export function setNight(on: boolean) {
  night = on
}
