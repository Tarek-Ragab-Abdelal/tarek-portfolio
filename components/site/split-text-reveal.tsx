"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
}

const container = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay }
  })
};

const child = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export function SplitTextReveal({ text, className, delay = 0, splitBy = "word" }: Readonly<SplitTextRevealProps>) {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const units = splitBy === "word" ? text.split(" ") : text.split("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || shouldReduceMotion) {
    return (
      <span className={`inline-block ${className ?? ""}`} aria-label={text}>
        {units.map((unit, i) => (
          <span key={i} className="inline-block">
            {splitBy === "char" && unit === " " ? "\u00A0" : unit}
            {splitBy === "word" && i < units.length - 1 && "\u00A0"}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span className={`inline-block ${className ?? ""}`} variants={container} custom={delay} initial="hidden" animate="show" aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={child}>
            {splitBy === "char" && unit === " " ? "\u00A0" : unit}
          </motion.span>
          {splitBy === "word" && i < units.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
}
