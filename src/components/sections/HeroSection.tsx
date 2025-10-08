import { Download, Mail, Github, Linkedin, Briefcase } from "lucide-react";
import PillButton from "@/components/atomic/PillButton";
import SkillChip from "@/components/molecular/SkillChip";
import { personalInfo, skills } from "@/data/portfolio";
import profileImage from "@/assets/profile.jpg";
import heroBackground from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const allSkills = Object.values(skills).flat().slice(0, 12);

  const handleDownloadResume = () => {
    // Create a download link for the resume
    const link = document.createElement("a");
    link.href = "/src/assets/resume.pdf"; 
    link.download = "Tarek_Ragab_Resume.pdf";
    link.click();
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Hero section introducing Tarek Ragab"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div className="container relative z-10 py-16 md:py-24 px-4">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Info */}
          <header className="space-y-6 animate-fade-in order-2 lg:order-1">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {personalInfo.name}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium gradient-primary bg-clip-text text-transparent">
                {personalInfo.title}
              </h2>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed" role="text">
              {personalInfo.summary}
            </p>

            {/* Skills Preview */}
            <ul className="flex flex-wrap gap-2 py-2 list-none" aria-label="Key skills">
              {allSkills.map((skill) => (
                <li key={skill}>
                  <SkillChip skill={skill} />
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <PillButton variant="gradient" size="lg" onClick={handleDownloadResume}>
                <Download className="w-5 h-5" />
                Download Resume
              </PillButton>
              <PillButton variant="outline" size="lg" onClick={scrollToContact}>
                <Mail className="w-5 h-5" />
                Contact Me
              </PillButton>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Upwork Profile"
              >
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </header>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-full blur-2xl opacity-20 animate-pulse" />
              <img
                src={profileImage}
                alt={`${personalInfo.name} - Full-Stack Software Engineer based in ${personalInfo.location}`}
                title={`${personalInfo.name} - Professional Portfolio`}
                className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-glow border-4 border-primary/20"
                loading="eager"
                width="288"
                height="288"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
