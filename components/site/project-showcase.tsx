"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, PlayCircle } from "lucide-react";
import { useMemo, useState } from "react";
import type { FeaturedProject } from "@/lib/portfolio-data";

interface ProjectShowcaseProps {
  projects: FeaturedProject[];
}

export function ProjectShowcase({ projects }: Readonly<ProjectShowcaseProps>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = useMemo(() => projects[activeIndex], [projects, activeIndex]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="section-shell noise-mask p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Selected Work</p>
        <ul className="mt-4 space-y-3">
          {projects.map((project, index) => {
            const selected = index === activeIndex;
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                    selected
                      ? "border-accent/60 bg-accent/10 text-white"
                      : "border-line/70 bg-bg/50 text-muted hover:border-accent2/60 hover:text-white"
                  }`}
                >
                  <p className="font-display text-base font-semibold">{project.title}</p>
                  <p className="mt-1 text-xs leading-relaxed">{project.tagline}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="section-shell noise-mask overflow-hidden p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeProject.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{activeProject.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.13em] text-accent2">{activeProject.company}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{activeProject.summary}</p>
              </div>
              <div className="flex gap-2">
                {activeProject.liveUrl ? (
                  <Link
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/65 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent/20"
                  >
                    <PlayCircle size={14} />
                    Live
                  </Link>
                ) : null}
                {activeProject.repoUrl ? (
                  <Link
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-bg/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-white"
                  >
                    <Code2 size={14} />
                    Source
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeProject.stack.map((tech) => (
                <span key={tech} className="badge-pill">
                  {tech}
                </span>
              ))}
            </div>

            <ul className="space-y-3 border-t border-line/70 pt-6 text-sm text-muted">
              {activeProject.highlights.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
