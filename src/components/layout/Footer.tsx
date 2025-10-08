import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-16" role="contentinfo">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              {personalInfo.name}
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Full-Stack Software Engineer specializing in .NET, React, and Azure cloud solutions. 
              Delivering scalable applications and innovative software development services worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-foreground">Quick Links</h5>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 list-none">
                <li><a href="#home" className="text-muted-foreground hover:text-primary transition-smooth">Home</a></li>
                <li><a href="#experience" className="text-muted-foreground hover:text-primary transition-smooth">Experience</a></li>
                <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-smooth">Projects</a></li>
                <li><a href="#skills" className="text-muted-foreground hover:text-primary transition-smooth">Skills</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-border">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {personalInfo.name}. All rights reserved. | Full-Stack Software Engineer
            </p>
            <p className="text-xs text-muted-foreground mt-1 sr-only">
              Professional software development services including .NET development, React applications, 
              Azure cloud solutions, IoT implementations, and custom web applications. Available for 
              freelance projects and full-time opportunities.
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
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-muted hover:bg-primary hover:text-primary transition-smooth hover:shadow-glow hover:scale-105"
                  aria-label="Upwork Profile"
                >
                  <Globe className="w-6 h-6 group-hover:scale-110 transition-smooth" aria-hidden="true" />
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
