"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleText from "@/components/particle-text";

const GATHER_MS = 1800;
const STAGGER_MS = 480;
const HOLD_MS = 900;
const FADE_MS = 600;
const TOTAL_MS = GATHER_MS + STAGGER_MS + HOLD_MS;

let homeIntroPlayed = false;

export function IntroSplash() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    if (homeIntroPlayed) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!desktop.matches || reduced.matches) return;

    let cancelled = false;
    let hideTimer: number | undefined;
    let unmountTimer: number | undefined;

    const start = async () => {
      try {
        await document.fonts.load("800 96px Unbounded");
        await document.fonts.ready;
      } catch {
        /* continue with fallback */
      }
      if (cancelled) return;

      setFontsReady(true);
      setActive(true);
      setVisible(true);
      document.body.style.overflow = "hidden";

      hideTimer = window.setTimeout(() => setVisible(false), TOTAL_MS);
      unmountTimer = window.setTimeout(() => {
        setActive(false);
        document.body.style.overflow = "";
      }, TOTAL_MS + FADE_MS);
    };

    // Defer so React Strict Mode's immediate unmount/remount does not skip
    // the intro, while still marking it played for later client navigations.
    const kickoff = window.setTimeout(() => {
      if (cancelled || homeIntroPlayed) return;
      homeIntroPlayed = true;
      void start();
    }, 0);

    return () => {
      cancelled = true;
      if (kickoff) window.clearTimeout(kickoff);
      if (hideTimer) window.clearTimeout(hideTimer);
      if (unmountTimer) window.clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!visible}
        >
          {/*
            Canvas cannot resolve CSS vars in ctx.font — use inherit so
            ParticleText reads the computed Unbounded family from this node.
          */}
          <div
            className="absolute inset-0 font-display"
            style={{
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              fontWeight: 800,
            }}
          >
            {fontsReady ? (
              <ParticleText
                text="jaderweb"
                particleSize={2.4}
                density={3}
                color="#E3FF04"
                highlightColor="#E3FF04"
                scatter={220}
                gatherDuration={GATHER_MS}
                stagger={STAGGER_MS}
                pointerRepel={36}
                repelRadius={110}
                idleDrift={0.45}
                trigger="mount"
                fontSize="clamp(3rem, 11vw, 7.5rem)"
                fontWeight={800}
                fontFamily="inherit"
                glow
                className="!min-h-0 absolute inset-0 h-full w-full"
              />
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
