"use client";

import { motion } from "framer-motion";

export function SectionConnector({ height = "60px" }: Readonly<{ height?: string }>) {
  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-px origin-top bg-gradient-to-b from-accent/40 to-accent/10"
        style={{ height }}
      />
    </div>
  );
}

export function SectionDot() {
  return (
    <div className="flex justify-center py-1">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
      </motion.div>
    </div>
  );
}
