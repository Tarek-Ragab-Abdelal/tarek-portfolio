import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Briefcase, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
              {personalInfo.name}
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved. Built with{" "}
              <Heart className="inline w-4 h-4 text-accent fill-accent" /> using React & TypeScript
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
              aria-label="Upwork"
            >
              <Briefcase className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
