import SkillChip from "@/components/molecular/SkillChip";
import GenericCard from "@/components/atomic/GenericCard";
import { skills } from "@/data/portfolio";
import { Lightbulb } from "lucide-react";

const SkillsSection = () => {
  return (
    <section 
      id="skills" 
      className="py-20 bg-background"
      aria-labelledby="skills-heading"
    >
      <div className="container px-4 max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-lg gradient-primary" aria-hidden="true">
            <Lightbulb className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 id="skills-heading" className="text-4xl md:text-5xl font-bold text-foreground">
              Technical Skills & Professional Expertise
            </h2>
            <h3 className="text-xl text-muted-foreground mt-2">
              Programming Languages, Frameworks & Development Tools
            </h3>
          </div>
        </header>

        {/* SEO Content */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Comprehensive technical expertise across modern programming languages, frameworks, and development 
            tools. Specialized in full-stack development with strong foundation in both backend and frontend 
            technologies, cloud platforms, and DevOps practices.
          </p>
          <p className="sr-only">
            Expert-level skills in C#, .NET framework, JavaScript, TypeScript, React, Node.js, Python, 
            Azure cloud services, SQL databases, Git version control, Docker containerization, and 
            modern development methodologies including Agile and Scrum practices.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-none" aria-label="Technical skills and expertise">
          {Object.entries(skills).map(([category, skillList], index) => (
            <li key={category}>
              <GenericCard
                variant="elevated"
                className="animate-fade-in h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <article>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {category}
                  </h3>
                  <ul className="flex flex-wrap gap-2 list-none" aria-label={`${category} skills`}>
                    {skillList.map((skill) => (
                      <li key={skill}>
                        <SkillChip skill={skill} variant="default" />
                      </li>
                    ))}
                  </ul>
                </article>
              </GenericCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SkillsSection;
