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
    link.href = "/resume.pdf"; // You'll need to add the actual resume PDF
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
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div className="container relative z-10 py-20 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Info */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium gradient-primary bg-clip-text text-transparent">
                {personalInfo.title}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {personalInfo.summary}
            </p>

            {/* Skills Preview */}
            <div className="flex flex-wrap gap-2 py-4">
              {allSkills.map((skill, index) => (
                <SkillChip key={index} skill={skill} />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
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
            <div className="flex gap-4 pt-6">
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={personalInfo.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                <Briefcase className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-30 animate-pulse" />
              <img
                src={profileImage}
                alt={personalInfo.name}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover shadow-glow border-4 border-primary/20"
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
