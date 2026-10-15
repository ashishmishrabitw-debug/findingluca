"use client";

/**
 * Morse mode — a self-contained novelty toggle.
 *
 * Nothing outside this folder knows the feature exists except the single
 * import and two <MorseMode /> lines in components/Navbar.tsx. See
 * ./README.md to remove it.
 *
 * How it works: the site's own components are never touched. When the mode
 * is on, this component rewrites visible text nodes in place, remembering
 * each original so it can be put back exactly. A MutationObserver re-applies
 * the transform after React re-renders or a route change replaces the DOM.
 */

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import "./morse.css";
import { toMorse } from "./morse";
import {
  getServerSnapshot,
  getSnapshot,
  setEnabled,
  subscribe,
} from "./store";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "TEXTAREA"]);

type Original = { plain: string; morse: string };

/** Shared across instances so either toggle can restore what the other set. */
const originals = new WeakMap<Text, Original>();

function collectTextNodes(root: Node): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-morse-skip]")) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || node.nodeValue.trim() === "") {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) nodes.push(current as Text);
  return nodes;
}

export default function MorseMode() {
  const enabled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const observer = useRef<MutationObserver | null>(null);

  // Idempotent: a node already carrying its encoded value is skipped, so a
  // repeat pass mutates nothing and the observer loop settles after one
  // extra no-op run. That is what stops it feeding on its own mutations.
  const encodeAll = useCallback(() => {
    for (const node of collectTextNodes(document.body)) {
      const record = originals.get(node);
      if (record && node.nodeValue === record.morse) continue;

      const plain = node.nodeValue ?? "";
      const morse = toMorse(plain);
      if (morse === "" || morse === plain) continue;

      originals.set(node, { plain, morse });
      node.nodeValue = morse;
    }
  }, []);

  const decodeAll = useCallback(() => {
    for (const node of collectTextNodes(document.body)) {
      const record = originals.get(node);
      if (record && node.nodeValue === record.morse) {
        node.nodeValue = record.plain;
        originals.delete(node);
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-morse");
      observer.current?.disconnect();
      observer.current = null;
      decodeAll();
      return;
    }

    document.documentElement.setAttribute("data-morse", "on");

    // A timer, not requestAnimationFrame: rAF does not fire in a hidden or
    // backgrounded tab, which would latch the queue and stop re-encoding.
    let timer: ReturnType<typeof setTimeout> | null = null;
    const scheduled = new MutationObserver(() => {
      if (timer !== null) return;
      timer = setTimeout(() => {
        timer = null;
        encodeAll();
      }, 0);
    });
    observer.current = scheduled;

    encodeAll();
    scheduled.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      if (timer !== null) clearTimeout(timer);
      scheduled.disconnect();
      if (observer.current === scheduled) observer.current = null;
    };
  }, [enabled, encodeAll, decodeAll]);

  return (
    <button
      type="button"
      data-morse-skip
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
      title={`Turn ${enabled ? "off" : "on"} morse code mode`}
      aria-label={`Turn ${enabled ? "off" : "on"} morse code mode`}
      className={`group flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 transition-colors ${
        enabled
          ? "border-[#00e5ff]/50 bg-[#00e5ff]/10"
          : "border-[#1e1e1e] hover:border-[#333]"
      }`}
    >
      <span
        aria-hidden
        className={`relative block h-3.5 w-7 rounded-full transition-colors ${
          enabled ? "bg-[#00e5ff]" : "bg-[#2a2a2a]"
        }`}
      >
        <span
          className={`absolute top-0.5 block h-2.5 w-2.5 rounded-full bg-[#0a0a0a] transition-all ${
            enabled ? "left-[1.0625rem]" : "left-0.5"
          }`}
        />
      </span>
      <span
        className={`font-mono text-[11px] tracking-widest transition-colors ${
          enabled ? "text-[#00e5ff]" : "text-[#a0a0a0] group-hover:text-white"
        }`}
      >
        ·–
      </span>
    </button>
  );
}
