import GenericCard from "@/components/atomic/GenericCard";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  technologies?: string[];
}

const ProjectCard = ({ title, company, description, technologies }: ProjectCardProps) => {
  return (
    <GenericCard variant="elevated" className="group hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0" />
      </div>
      <p className="text-sm text-accent font-medium mb-3">{company}</p>
      <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </GenericCard>
  );
};

export default ProjectCard;
