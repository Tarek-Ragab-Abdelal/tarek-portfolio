import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Briefcase, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
              {personalInfo.name}
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {personalInfo.name}. All rights reserved. Built with{" "}
              <Heart className="inline w-4 h-4 text-accent fill-accent" aria-hidden="true" /> using React & TypeScript
            </p>
          </div>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <ul className="flex gap-4 list-none">
              <li>
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label="Upwork Profile"
                >
                  <Briefcase className="w-5 h-5" aria-hidden="true" />
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
