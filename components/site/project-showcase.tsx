"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { FeaturedProject } from "@/lib/portfolio-data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function ProjectCard({ project }: Readonly<{ project: FeaturedProject }>) {
  return (
    <motion.article
      variants={item}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-accent">{project.company}</p>
        <div className="flex gap-2">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <ArrowUpRight size={11} /> Live
            </Link>
          )}
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-white"
            >
              <Github size={11} /> Code
            </Link>
          )}
        </div>
      </div>

      <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {project.stack.map((t) => (
          <span key={t} className="rounded-md bg-line/80 px-2 py-0.5 text-[11px] text-neutral-400">
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function ProjectShowcase({ projects }: Readonly<{ projects: FeaturedProject[] }>) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}
