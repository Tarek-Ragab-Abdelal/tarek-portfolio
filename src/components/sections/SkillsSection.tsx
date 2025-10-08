import SkillChip from "@/components/molecular/SkillChip";
import GenericCard from "@/components/atomic/GenericCard";
import { skills } from "@/data/portfolio";
import { Lightbulb } from "lucide-react";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-lg gradient-primary">
            <Lightbulb className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Skills & Expertise
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, skillList], index) => (
            <GenericCard
              key={index}
              variant="elevated"
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-primary mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, skillIndex) => (
                  <SkillChip key={skillIndex} skill={skill} variant="default" />
                ))}
              </div>
            </GenericCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
