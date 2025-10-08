import ProjectCard from "@/components/molecular/ProjectCard";
import { projects } from "@/data/portfolio";
import { Code2 } from "lucide-react";

const ProjectsSection = () => {
  return (
    <section 
      id="projects" 
      className="py-20 bg-muted/30"
      aria-labelledby="projects-heading"
    >
      <div className="container px-4 max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-lg gradient-primary" aria-hidden="true">
            <Code2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
        </header>

        <ul className="grid md:grid-cols-2 gap-6 list-none" aria-label="Portfolio projects">
          {projects.map((project, index) => (
            <li
              key={`${project.title}-${project.company}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <article>
                <ProjectCard {...project} />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
