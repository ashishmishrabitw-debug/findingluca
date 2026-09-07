/**
 * Shared on/off state for morse mode.
 *
 * The toggle is rendered twice — once in the desktop navbar cluster, once in
 * the mobile one — and both drive a single global effect (the `data-morse`
 * attribute on <html>). They must therefore agree at all times, so the state
 * lives here rather than in each component's own useState.
 *
 * Part of the detachable morse-mode feature — see ./README.md.
 */

const STORAGE_KEY = "whpc:morse-mode";

type Listener = () => void;

let enabled = false;
let initialised = false;
const listeners = new Set<Listener>();

function initialise() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;
  try {
    enabled = window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    // Blocked or unavailable storage — stay off.
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): boolean {
  initialise();
  return enabled;
}

/** The server always renders the toggle in its off state. */
export function getServerSnapshot(): boolean {
  return false;
}

export function setEnabled(next: boolean) {
  initialise();
  if (enabled === next) return;
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Non-fatal: the toggle still works for this page view.
  }
  for (const listener of listeners) listener();
}
