"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, personalInfo } from "@/lib/portfolio-data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-white">
          {personalInfo.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted md:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-surface md:hidden"
          >
            <ul className="space-y-1 px-5 py-4 text-sm text-muted">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 hover:bg-line/50 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
