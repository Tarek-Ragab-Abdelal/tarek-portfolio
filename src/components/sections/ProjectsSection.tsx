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
          <div>
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-foreground">
              Featured Projects
            </h2>
          </div>
        </header>

        {/* SEO Content */}
        <div className="sr-only">
          <p>
            Discover a portfolio of innovative software projects spanning web development, data processing, 
            IoT solutions, and enterprise applications. Each project demonstrates expertise in modern 
            technologies and best practices for scalable software architecture.
          </p>
          <p>
            Featured projects include lead generation reporting systems, loan management platforms, 
            end-to-end data pipelines, human resources management systems, desktop licensing applications, 
            and real-time IoT dashboards. Technologies used include .NET framework, React, TypeScript, 
            Python, Azure Function Apps, SQL databases, Flutter, Node.js, and embedded systems.
          </p>
        </div>

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
