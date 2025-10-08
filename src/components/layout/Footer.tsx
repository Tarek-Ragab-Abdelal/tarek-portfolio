import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Briefcase } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-16" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left space-y-3">
            <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              {personalInfo.name}
            </p>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <nav aria-label="Social media links" className="flex-shrink-0">
            <ul className="flex gap-3 list-none">
              <li>
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth hover:shadow-glow hover:scale-105"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-6 h-6 group-hover:scale-110 transition-smooth" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth hover:shadow-glow hover:scale-105"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6 group-hover:scale-110 transition-smooth" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth hover:shadow-glow hover:scale-105"
                  aria-label="Upwork Profile"
                >
                  <Briefcase className="w-6 h-6 group-hover:scale-110 transition-smooth" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
