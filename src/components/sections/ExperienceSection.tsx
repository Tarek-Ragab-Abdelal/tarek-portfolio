import ExperienceCard from "@/components/molecular/ExperienceCard";
import { experiences } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  return (
    <section 
      id="experience" 
      className="py-20 bg-background"
      aria-labelledby="experience-heading"
    >
      <div className="container px-4 max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-lg gradient-primary" aria-hidden="true">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 id="experience-heading" className="text-4xl md:text-5xl font-bold text-foreground">
              Professional Work Experience
            </h2>
            <h3 className="text-xl text-muted-foreground mt-2">
              Full-Stack Development & Software Engineering Career
            </h3>
          </div>
        </header>

        {/* SEO Content */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Explore my comprehensive professional journey as a Full-Stack Software Engineer with expertise in 
            .NET development, React applications, Azure cloud solutions, and IoT implementations. Each role 
            has contributed to building scalable, high-performance applications that drive business value.
          </p>
          <p className="sr-only">
            Professional experience includes remote software engineering on Upwork, full-stack development 
            at RES-VA, IoT firmware engineering at SudoTechs, technical instruction, and digital fabrication. 
            Specializing in C#, .NET framework, React, TypeScript, Azure cloud services, and embedded systems 
            development for industrial applications.
          </p>
        </div>

        <ol className="space-y-6 list-none" aria-label="Professional work experience">
          {experiences.map((experience, index) => (
            <li
              key={`${experience.company}-${experience.title}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <article>
                <ExperienceCard {...experience} />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
