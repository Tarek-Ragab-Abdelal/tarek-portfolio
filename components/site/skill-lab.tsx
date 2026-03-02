"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { SkillGroup } from "@/lib/portfolio-data";

interface SkillLabProps {
  groups: SkillGroup[];
}

export function SkillLab({ groups }: SkillLabProps) {
  const [active, setActive] = useState(groups[0]?.name ?? "");

  const selectedGroup = groups.find((group) => group.name === active) ?? groups[0];

  return (
    <div className="section-shell noise-mask p-6 md:p-8">
      <div className="flex flex-wrap gap-3">
        {groups.map((group) => {
          const selected = selectedGroup.name === group.name;
          return (
            <button
              key={group.name}
              type="button"
              onClick={() => setActive(group.name)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
                selected
                  ? "border-accent bg-accent/15 text-white"
                  : "border-line/70 bg-bg/55 text-muted hover:border-accent2/70 hover:text-white"
              }`}
            >
              {group.name}
            </button>
          );
        })}
      </div>

      <motion.ul
        key={selectedGroup.name}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-6 flex flex-wrap gap-3"
      >
        {selectedGroup.skills.map((skill, index) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, delay: index * 0.03 }}
            className="rounded-full border border-line/70 bg-bg/70 px-4 py-2 text-sm text-slate-200"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
