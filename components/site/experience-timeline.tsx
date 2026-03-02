"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import type { ExperienceItem } from "@/lib/portfolio-data";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function TimelineCard({ exp, isLeft }: Readonly<{ exp: ExperienceItem; isLeft: boolean }>) {
  return (
    <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
      <article className="card-hover rounded-xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-white">{exp.role}</h3>
            {exp.link ? (
              <Link href={exp.link} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-sm text-accent hover:text-white">
                <BriefcaseBusiness size={13} /> {exp.company}
              </Link>
            ) : (
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-accent">
                <BriefcaseBusiness size={13} /> {exp.company}
              </p>
            )}
          </div>
          <span className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">{exp.period}</span>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          {exp.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <ArrowUpRight size={13} className="mt-0.5 shrink-0 text-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export function ExperienceTimeline({ experiences }: Readonly<{ experiences: ExperienceItem[] }>) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent md:left-1/2 md:-translate-x-px" />

      <div className="space-y-10 md:space-y-12">
        {experiences.map((exp, i) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative pl-10 md:pl-0"
          >
            {/* Dot on line */}
            <div className="absolute left-[11px] top-6 h-[10px] w-[10px] rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2" />

            <TimelineCard exp={exp} isLeft={i % 2 === 0} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
