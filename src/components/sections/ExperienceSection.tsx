import ExperienceCard from "@/components/molecular/ExperienceCard";
import { experiences } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-lg gradient-primary">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Work Experience
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ExperienceCard {...experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
