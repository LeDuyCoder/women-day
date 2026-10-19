import { useEffect, useRef, useState } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { track } from "../lib/track.js";

const FLIGHT = { type: "spring", duration: 0.85, bounce: 0.14 };
const EASE_IN = [0.55, 0, 0.75, 0.2];
const EASE_OUT = [0.25, 0.8, 0.45, 1];
const EASE_SOFT = [0.22, 1, 0.36, 1];
// How far the sheet peeks out of the pocket — low enough to never reach the hero copy.
const SHEET_RISE = "-22%";

function Ribbon() {
  return (
    <svg className="ribbon" viewBox="0 0 600 260" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ribbon-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.8 0.1 5)" />
          <stop offset="0.55" stopColor="oklch(0.66 0.15 5)" />
          <stop offset="1" stopColor="oklch(0.74 0.12 5)" />
        </linearGradient>
      </defs>
      <path d="M140 20 C 60 70, 30 120, 70 170 C 100 210, 40 240, 10 250 L 30 258 C 70 240, 125 205, 92 165 C 60 125, 90 80, 160 40 Z" />
      <path d="M440 120 C 520 130, 560 170, 540 205 C 525 232, 560 245, 595 240 L 590 252 C 545 258, 505 238, 522 205 C 540 172, 505 145, 435 138 Z" />
    </svg>
  );
}

function Envelope({ showSheet }) {
  return (
    <div className="envelope" aria-hidden="true">
      <svg className="envelope-back" viewBox="0 0 500 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="env-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.78 0.09 8)" />
            <stop offset="1" stopColor="oklch(0.7 0.11 8)" />
          </linearGradient>
          <pattern id="env-liner" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M11 15 C 6 11.5, 6 7.5, 8.6 7.5 C 9.8 7.5, 10.6 8.3, 11 9.2 C 11.4 8.3, 12.2 7.5, 13.4 7.5 C 16 7.5, 16 11.5, 11 15 Z" fill="oklch(0.95 0.03 8 / 0.35)" />
          </pattern>
        </defs>
        <rect width="500" height="300" rx="12" fill="url(#env-back)" />
        <rect x="14" y="10" width="472" height="200" rx="6" fill="url(#env-liner)" />
      </svg>

      <div className="envelope-sheet-slot">
        {showSheet && (
          <motion.div className="envelope-sheet" layoutId="letter" transition={FLIGHT} style={{ borderRadius: 4 }}>
            <span className="sheet-to">Gửi bạn,</span>
            <span className="sheet-line" />
            <span className="sheet-line" />
            <span className="sheet-line sheet-line--short" />
          </motion.div>
        )}
      </div>

      <svg className="envelope-front" viewBox="0 0 500 300" preserveAspectRatio="none">
        <defs>
          <clipPath id="env-clip"><rect width="500" height="300" rx="12" /></clipPath>
          <linearGradient id="env-side-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="oklch(0.95 0.028 8)" />
            <stop offset="1" stopColor="oklch(0.9 0.048 8)" />
          </linearGradient>
          <linearGradient id="env-side-r" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="oklch(0.94 0.03 8)" />
            <stop offset="1" stopColor="oklch(0.89 0.05 8)" />
          </linearGradient>
          <linearGradient id="env-bottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.965 0.022 8)" />
            <stop offset="1" stopColor="oklch(0.925 0.04 8)" />
          </linearGradient>
          <filter id="env-fold" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="-1.5" stdDeviation="2.5" floodColor="oklch(0.4 0.1 8)" floodOpacity="0.16" />
          </filter>
          <filter id="env-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.2  0 0 0 0 0.25  0 0 0 0.09 0" />
          </filter>
        </defs>
        <g clipPath="url(#env-clip)">
          <path d="M0 0 L226 168 Q250 186 226 204 L0 300 Z" fill="url(#env-side-l)" filter="url(#env-fold)" />
          <path d="M500 0 L274 168 Q250 186 274 204 L500 300 Z" fill="url(#env-side-r)" filter="url(#env-fold)" />
          <path d="M0 300 L218 150 Q250 128 282 150 L500 300 Z" fill="url(#env-bottom)" filter="url(#env-fold)" />
          <path d="M0 300 L218 150 Q250 128 282 150 L500 300" fill="none" stroke="oklch(1 0 0 / 0.7)" strokeWidth="1.2" />
          <rect width="500" height="300" filter="url(#env-grain)" />
        </g>
        <rect x="0.5" y="0.5" width="499" height="299" rx="12" fill="none" stroke="oklch(0.82 0.05 8)" />
      </svg>

      <div className="envelope-flap">
        <svg className="flap-face flap-face--front" viewBox="0 0 500 190" preserveAspectRatio="none">
          <defs>
            <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="oklch(0.985 0.012 8)" />
              <stop offset="1" stopColor="oklch(0.945 0.03 8)" />
            </linearGradient>
            <filter id="env-flap-shadow" x="-10%" y="-10%" width="120%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="oklch(0.4 0.1 8)" floodOpacity="0.2" />
            </filter>
          </defs>
          <path d="M0 12 Q0 0 12 0 L488 0 Q500 0 500 12 L274 172 Q250 189 226 172 Z" fill="url(#env-flap)" filter="url(#env-flap-shadow)" />
          <path d="M0 12 L226 172 Q250 189 274 172 L500 12" fill="none" stroke="oklch(1 0 0 / 0.8)" strokeWidth="1.2" />
        </svg>
        {/* Inside of the flap, seen once it has folded back over the top edge. */}
        <svg className="flap-face flap-face--back" viewBox="0 0 500 190" preserveAspectRatio="none">
          <defs>
            <linearGradient id="env-flap-in" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="oklch(0.84 0.065 8)" />
              <stop offset="1" stopColor="oklch(0.95 0.025 8)" />
            </linearGradient>
          </defs>
          <path d="M0 12 Q0 0 12 0 L488 0 Q500 0 500 12 L274 172 Q250 189 226 172 Z" fill="url(#env-flap-in)" />
          <path d="M0 12 Q0 0 12 0 L488 0 Q500 0 500 12 L274 172 Q250 189 226 172 Z" fill="url(#env-liner)" />
        </svg>
      </div>

      <svg className="envelope-seal" viewBox="0 0 80 80">
        <defs>
          <radialGradient id="seal-wax" cx="0.38" cy="0.32" r="0.75">
            <stop offset="0" stopColor="oklch(0.62 0.18 14)" />
            <stop offset="0.55" stopColor="oklch(0.45 0.16 12)" />
            <stop offset="1" stopColor="oklch(0.33 0.12 12)" />
          </radialGradient>
          <filter id="seal-edge" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="6" />
          </filter>
          <filter id="seal-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="oklch(0.25 0.1 12)" floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#seal-shadow)">
          <circle cx="40" cy="40" r="33" fill="url(#seal-wax)" filter="url(#seal-edge)" />
        </g>
        <circle cx="40" cy="40" r="24" fill="oklch(0.47 0.16 12)" stroke="oklch(0.36 0.13 12)" strokeWidth="2" />
        <circle cx="40" cy="40" r="21" fill="none" stroke="oklch(0.6 0.16 12 / 0.6)" strokeWidth="1" />
        <path d="M40 51 C 27 42, 27 31, 34 31 C 37 31, 39 33, 40 35 C 41 33, 43 31, 46 31 C 53 31, 53 42, 40 51 Z" fill="oklch(0.4 0.14 12)" stroke="oklch(0.78 0.1 10)" strokeWidth="1.6" strokeLinejoin="round" />
        <ellipse cx="31" cy="27" rx="7" ry="3.5" fill="oklch(1 0 0 / 0.22)" transform="rotate(-30 31 27)" />
      </svg>
    </div>
  );
}

export default function EnvelopeLetter() {
  // closed → opening (seal pops, flap folds back, sheet peeks out) → open (sheet flies to the letter)
  // → closing (letter flies back, sheet sinks, flap folds shut, seal returns) → closed
  const [phase, setPhase] = useState("closed");
  const [stageRef, animate] = useAnimate();
  const reduceMotion = useReducedMotion();
  const letterRef = useRef(null);
  const openRef = useRef(null);
  const closeRef = useRef(null);
  const isOpen = phase !== "closed";
  const isBusy = phase === "opening" || phase === "closing";

  useEffect(() => {
    if (phase === "open") {
      // The stage button is hidden under the letter now, so hand focus to the letter's own close button.
      closeRef.current?.focus({ preventScroll: true });
      const timer = window.setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 900);
      return () => window.clearTimeout(timer);
    }
    if (phase === "closed" && document.activeElement === document.body) {
      openRef.current?.focus({ preventScroll: true });
    }
    return undefined;
  }, [phase]);

  const t = (seconds) => (reduceMotion ? 0 : seconds);
  const part = (selector) => stageRef.current.querySelector(selector);

  async function playOpen() {
    const flap = part(".envelope-flap");
    animate(".envelope-seal", { scale: [1, 1.14, 0.4], rotate: [0, -6, -24], opacity: [1, 1, 0] }, { duration: t(0.42), ease: "easeInOut" });
    // Fold in two halves so the flap can slip behind the sheet exactly when it stands on edge.
    await animate(flap, { rotateX: 90 }, { duration: t(0.34), delay: t(0.18), ease: EASE_IN });
    flap.style.zIndex = "0";
    animate(flap, { rotateX: 180 }, { duration: t(0.42), ease: EASE_OUT });
    await animate(".envelope-sheet-slot", { y: SHEET_RISE }, { duration: t(0.62), delay: t(0.08), ease: EASE_SOFT });
    await new Promise((resolve) => window.setTimeout(resolve, t(0.12) * 1000));
    setPhase("open");
  }

  async function playClose() {
    const flap = part(".envelope-flap");
    // Give the letter time to fly back into the envelope before it sinks.
    await new Promise((resolve) => window.setTimeout(resolve, t(0.6) * 1000));
    await animate(".envelope-sheet-slot", { y: "0%" }, { duration: t(0.5), ease: [0.45, 0, 0.2, 1] });
    await animate(flap, { rotateX: 90 }, { duration: t(0.28), ease: EASE_IN });
    flap.style.zIndex = "";
    await animate(flap, { rotateX: 0 }, { duration: t(0.34), ease: EASE_OUT });
    await animate(".envelope-seal", { scale: [0.4, 1.12, 1], rotate: [-24, 4, 0], opacity: [0, 1, 1] }, { duration: t(0.4), ease: "easeOut" });
    setPhase("closed");
  }

  function toggleLetter() {
    if (isBusy) return;
    const opening = phase === "closed";
    track(opening ? "letter_open" : "letter_close");
    setPhase(opening ? "opening" : "closing");
    (opening ? playOpen() : playClose()).catch(() => {});
  }

  return (
    <div className="letter-block" id="letter">
      <div ref={stageRef} className={`envelope-stage${isOpen ? " is-open" : ""}${phase === "open" ? " is-letter-out" : ""}`}>
        <img className="stage-roses" src="/assets/hero-roses.webp" alt="" fetchPriority="high" />
        <Ribbon />
        <div className="pedestal" aria-hidden="true">
          <span className="pedestal-top" />
          <span className="pedestal-side" />
        </div>
        <Envelope showSheet={phase !== "open"} />
        <button
          ref={openRef}
          className="open-letter"
          type="button"
          aria-expanded={phase === "open"}
          aria-controls="letter-paper"
          aria-busy={isBusy}
          onClick={toggleLetter}
        >
          <span>{isOpen ? "Gấp thư lại" : "Mở thư"}</span>
          {isOpen ? <X size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
        </button>
      </div>

      <div className={`letter-slot${phase === "open" ? " is-open" : ""}`} id="letter-paper" aria-live="polite">
        {phase === "open" && (
          <motion.article
            ref={letterRef}
            className="letter-paper"
            aria-label="Thư gửi bạn"
            layoutId="letter"
            style={{ borderRadius: 4 }}
            initial={{ rotate: -4 }}
            animate={{ rotate: -0.6 }}
            transition={FLIGHT}
          >
            <button ref={closeRef} className="letter-close" type="button" aria-label="Gấp thư lại" onClick={toggleLetter}>
              <X size={16} aria-hidden="true" />
            </button>
            <div className="letter-content">
              <span className="letter-sprig" aria-hidden="true" />
              <h2 className="letter-greeting">Gửi nhỏ hay báo,</h2>
              <p>20/10 tính không chúc gì đâu vì kiểu gì bạn chả nhận đủ lời chúc ngoài kia rồi, nhưng nghĩ lại vẫn nên có vài dòng riêng.</p>
              <p>Chúc bạn luôn khỏe mạnh, bớt đau ốm dặt dẹo lại dùm cái, làm việc gì cũng suôn sẻ và sớm đạt được mấy cái mục tiêu to bự sắp tới.</p>
              <p>Cứ giữ cái nết bướng bỉnh đó đi, vì ít ra trong mắt tui, bạn phiên bản này là độc nhất rồi.</p>
              <p className="letter-signature">– Duy –</p>
            </div>
          </motion.article>
        )}
        {phase === "closed" && <p className="letter-hint">Có một lá thư nhỏ dành cho bạn đó.</p>}
      </div>
    </div>
  );
}
