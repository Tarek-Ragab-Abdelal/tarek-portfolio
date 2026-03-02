import Link from "next/link";
import { personalInfo } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
        <p>{new Date().getFullYear()} {personalInfo.name}</p>
        <div className="flex gap-5">
          <Link href={personalInfo.links.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</Link>
          <Link href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</Link>
          <Link href={personalInfo.links.upwork} target="_blank" rel="noreferrer" className="hover:text-white">Upwork</Link>
        </div>
      </div>
    </footer>
  );
}
