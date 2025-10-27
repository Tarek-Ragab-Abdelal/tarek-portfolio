import { Download, ExternalLink } from "lucide-react";
import { SiLinkedin, SiGithub, SiUpwork } from "react-icons/si";
import PillButton from "@/components/atomic/PillButton";
import SkillChip from "@/components/molecular/SkillChip";
import { personalInfo, coreSkills } from "@/data/portfolio";
import profileImage from "@/assets/profile.jpg";
import heroBackground from "@/assets/hero-bg.jpg";

const HeroSection = () => {

  const handleDownloadResume = () => {
    // Create a download link for the resume
    const link = document.createElement("a");
    link.href = "/resume.pdf"; 
    link.download = "Tarek_Ragab_Resume.pdf";
    link.click();
  };

  const handleWorkTogether = () => {
    window.open(personalInfo.links.upwork, "_blank", "noopener,noreferrer");
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
                FullStack
              </h2>
            <h3 className="text-lg md:text-xl text-muted-foreground font-medium">
              Software Engineer based in {personalInfo.location}
            </h3>
            </div>

            {/* Upwork Achievements */}
            <div className="flex flex-wrap gap-4 items-center py-2">
              <a
                href={personalInfo.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 rounded-full border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors cursor-pointer"
                aria-label="View Upwork Profile - 5 Star Rated"
              >
                <SiUpwork className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">5⭐ Rated</span>
              </a>
              
              <a
                href={personalInfo.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                aria-label="View Upwork Profile - Top Rated"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 text-emerald-600">
                  <path fill="currentColor" fillRule="evenodd" d="M18.37 19.002H5.63v-1.867h12.74v1.867zm.02-3.736H5.608L3 8.314l4.992 1.664L12 5l4.008 4.978L21 8.314l-2.61 6.952z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Top Rated</span>
              </a>
              
              <a
                href={personalInfo.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/30 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                aria-label="View Upwork Profile - 100% Success Rate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 text-blue-600">
                  <path fill="currentColor" fillRule="evenodd" d="M18.37 19.002H5.63v-1.867h12.74v1.867zm.02-3.736H5.608L3 8.314l4.992 1.664L12 5l4.008 4.978L21 8.314l-2.61 6.952z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">100% Success Rate</span>
              </a>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed" role="text">
              {personalInfo.summary}
            </p>            {/* Additional SEO-rich content */}
            <div className="space-y-3 pt-4 sr-only">
              <p>
                Available for remote software development projects, technical consulting, and full-time opportunities. 
                Specialized in custom web application development, enterprise software solutions, and cloud-based architectures.
              </p>
              <p>
                Professional software engineer with 5+ years of experience in full-stack development. Expert in Microsoft 
                technologies including C# programming, ASP.NET Core, Entity Framework, and Azure cloud services. 
                Frontend expertise includes React.js, TypeScript, HTML5, CSS3, and modern JavaScript frameworks. 
                Backend development skills encompass Node.js, RESTful API design, database management with SQL Server 
                and PostgreSQL, and microservices architecture. DevOps experience with Docker, CI/CD pipelines, 
                and automated deployment processes.
              </p>
            </div>

            {/* Skills Preview */}
            <ul className="flex flex-wrap gap-2 py-2 list-none" aria-label="Key skills">
              {coreSkills.map((skill) => (
                <li key={skill}>
                  <SkillChip skill={skill} />
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <PillButton variant="gradient" size="lg" onClick={handleWorkTogether}>
                <ExternalLink className="w-5 h-5" />
                Let's Collaborate
              </PillButton>
              <PillButton variant="outline" size="lg" onClick={handleDownloadResume}>
                <Download className="w-5 h-5" />
                Download Resume
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
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="LinkedIn Profile"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Upwork Profile"
              >
                <SiUpwork className="w-5 h-5" />
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
    </section>
  );
};

export default HeroSection;
