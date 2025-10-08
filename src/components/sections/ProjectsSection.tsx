import ProjectCard from "@/components/molecular/ProjectCard";
import { projects } from "@/data/portfolio";
import { Code2 } from "lucide-react";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-lg gradient-primary">
            <Code2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
