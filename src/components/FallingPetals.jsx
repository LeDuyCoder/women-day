import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function FallingPetals() {
  const reduceMotion = useReducedMotion();
  const petals = useMemo(() => Array.from({ length: 14 }, (_, index) => ({
    id: index,
    left: `${(index * 37 + 11) % 100}%`,
    size: 12 + (index * 7) % 15,
    duration: 17 + (index * 5) % 13,
    delay: -((index * 3) % 19),
    drift: `${(index % 2 ? 1 : -1) * (28 + (index * 13) % 82)}px`,
    tone: index % 3,
  })), []);

  if (reduceMotion) return null;
  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((petal) => (
        <motion.span
          className={`petal petal--tone-${petal.tone}`}
          key={petal.id}
          style={{ left: petal.left, width: petal.size, height: petal.size * 0.68 }}
          initial={{ y: "-8vh", rotate: -35, opacity: 0 }}
          animate={{ x: [0, Number.parseInt(petal.drift, 10), 0], y: "112vh", rotate: 410, opacity: [0, 0.58, 0.4, 0] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
          data-drift={petal.drift}
        />
      ))}
    </div>
  );
}
