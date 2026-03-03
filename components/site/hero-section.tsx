"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";
import { SplitTextReveal } from "./split-text-reveal";
import { SquaresBackground } from "./squares-background";
import { personalInfo, upworkBadges } from "@/lib/portfolio-data";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(59,130,246,0.06)"
          squareSize={44}
          hoverFillColor="rgba(59,130,246,0.1)"
        />
      </div>

      {/* Gradient depth orb */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container relative z-10 py-16 md:py-32">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Text column */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="order-2 space-y-5 text-center lg:order-1 lg:text-left">
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {upworkBadges.map((b) => (
                <Link
                  key={b.label}
                  href={personalInfo.links.upwork}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${b.label} on Upwork`}
                  className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent transition-all hover:bg-accent/20 hover:text-white"
                >
                  {b.label}
                </Link>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-base text-muted sm:text-lg md:text-xl">Hi, I&apos;m</p>
              <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <SplitTextReveal text={personalInfo.name} className="text-gradient" delay={0.3} splitBy="char" />
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="text-base text-neutral-400 sm:text-lg md:text-xl">
              {personalInfo.title}
            </motion.p>

            <motion.p variants={fadeUp} className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-500 lg:mx-0">
              {personalInfo.summary}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href={`mailto:${personalInfo.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 sm:w-auto"
              >
                <Mail size={16} /> Get in Touch
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-medium text-neutral-300 transition-all hover:border-accent/50 hover:text-white hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] sm:w-auto"
              >
                <Download size={16} /> Resume
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 pt-1 lg:justify-start">
              {[
                { href: personalInfo.links.github, icon: Github, label: "GitHub" },
                { href: personalInfo.links.linkedin, icon: Linkedin, label: "LinkedIn" }
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-accent/50 hover:text-white hover:shadow-[0_2px_12px_rgba(59,130,246,0.15)]"
                >
                  <Icon size={17} />
                </Link>
              ))}
              <Link
                href={personalInfo.links.upwork}
                target="_blank"
                rel="noreferrer"
                aria-label="Upwork"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-line px-3 text-xs font-bold text-muted transition-all hover:border-accent/50 hover:text-white"
              >
                Up
              </Link>
            </motion.div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent/20 via-purple-500/10 to-cyan-500/15 blur-2xl" />
              <div className="animate-float relative overflow-hidden rounded-2xl border border-line/50">
                <Image
                  src="/images/profile.jpg"
                  alt={`${personalInfo.name} profile portrait`}
                  width={340}
                  height={340}
                  priority
                  className="h-auto w-[230px] object-cover sm:w-[280px] lg:w-[340px]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4"
        >
          <div className="rounded-xl border border-line bg-surface/80 p-5 backdrop-blur-sm">
            <AnimatedCounter end={4} suffix="+" label="Years Experience" />
          </div>
          <div className="rounded-xl border border-line bg-surface/80 p-5 backdrop-blur-sm">
            <AnimatedCounter end={20} suffix="+" label="Apps Shipped" />
          </div>
          <div className="rounded-xl border border-line bg-surface/80 p-5 backdrop-blur-sm">
            <AnimatedCounter end={100} suffix="%" label="Job Success" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
