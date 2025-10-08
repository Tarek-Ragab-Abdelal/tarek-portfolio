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
          <h2 id="experience-heading" className="text-4xl md:text-5xl font-bold text-foreground">
            Work Experience
          </h2>
        </header>

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
