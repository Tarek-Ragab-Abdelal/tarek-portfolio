import { personalInfo } from "@/data/portfolio";
import { SiLinkedin, SiGithub, SiUpwork } from "react-icons/si";
import { AiOutlineArrowUp } from "react-icons/ai";
import PillButton from "../atomic/PillButton";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-16" role="contentinfo">
      <div className="container mx-auto px-4">
        {/* Go to Top */}
        <div className="mb-8 align-middle text-center ">
            <PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="outline">
              <AiOutlineArrowUp className="w-5 h-5 mr-2" />
              Back To Top
            </PillButton>  
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-border">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {personalInfo.name}. All rights reserved. | Full-Stack Software Engineer
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
                  <SiGithub className="w-6 h-6 group-hover:scale-110 transition-smooth" aria-hidden="true" />
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
                  <SiLinkedin className="w-6 h-6 group-hover:scale-110 transition-smooth" aria-hidden="true" />
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
                  <SiUpwork className="w-6 h-6 group-hover:scale-110 transition-smooth" aria-hidden="true" />
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
