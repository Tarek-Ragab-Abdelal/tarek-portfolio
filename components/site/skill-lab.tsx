"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Cloud, Database, Cpu, GitBranch, Wrench, Layers, ChevronDown } from "lucide-react";
import type { SkillGroup } from "@/lib/portfolio-data";

const icons: Record<string, React.ElementType> = {
  "Programming Languages": Code2,
  "Frameworks & Platforms": Layers,
  "Cloud & Serverless": Cloud,
  "Data & APIs": Database,
  "Embedded & IoT": Cpu,
  "Version Control & CI/CD": GitBranch,
  Miscellaneous: Wrench
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

export function SkillLab({ groups }: Readonly<{ groups: SkillGroup[] }>) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {groups.map((group, idx) => {
        const Icon = icons[group.name] ?? Code2;
        const isOpen = expanded === idx;

        return (
          <motion.div
            key={group.name}
            variants={cardVariant}
            layout
            className="skill-card card-hover cursor-pointer rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/30"
            onClick={() => setExpanded(isOpen ? null : idx)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{group.name}</h3>
                  <p className="text-[11px] text-muted">{group.skills.length} skills</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown size={16} className="text-muted" />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: si * 0.03 }}
                        className="rounded-md border border-line/80 bg-bg px-2.5 py-1 text-xs text-neutral-400 transition-all hover:scale-105 hover:border-accent/50 hover:text-white"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isOpen && (
              <p className="mt-3 truncate text-xs text-neutral-600">
                {group.skills.slice(0, 4).join(" · ")}
                {group.skills.length > 4 && ` · +${group.skills.length - 4}`}
              </p>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
