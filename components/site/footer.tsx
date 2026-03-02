import Link from "next/link";
import { personalInfo } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line/70 py-10">
      <div className="container flex flex-col gap-5 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          {new Date().getFullYear()} {personalInfo.name}. Built with Next.js for static SEO-first delivery.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={personalInfo.links.github} target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </Link>
          <Link href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
          </Link>
          <Link href={personalInfo.links.upwork} target="_blank" rel="noreferrer" className="hover:text-white">
            Upwork
          </Link>
        </div>
      </div>
    </footer>
  );
}
