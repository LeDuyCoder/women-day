import { motion } from "motion/react";
import EnvelopeLetter from "./EnvelopeLetter.jsx";

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function DateBlossom() {
  return (
    <svg className="date-blossom" viewBox="0 0 40 40" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="20" cy="11" rx="6.5" ry="9" transform={`rotate(${angle} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-halo" aria-hidden="true" />
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
      >
        <motion.h1 id="hero-title" variants={rise} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <span className="date">20.10<DateBlossom /></span>
          <span className="hero-title-sub">Chúc mừng ngày<br />Phụ nữ Việt Nam</span>
        </motion.h1>
        <motion.p className="hero-copy" variants={rise} transition={{ duration: 0.75 }}>
          Chúc bạn một ngày thật vui{" "}<br />và một năm nhiều điều tốt đẹp.
        </motion.p>
      </motion.div>
      <EnvelopeLetter />
    </section>
  );
}
