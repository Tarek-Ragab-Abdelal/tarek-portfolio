import GenericCard from "@/components/atomic/GenericCard";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  link?: string;
}

const ProjectCard = ({ title, company, description, technologies, link }: ProjectCardProps) => {
  const isMobile = useIsMobile();
  
  const CardContent = (
    <>
      <div className={`flex items-start justify-between ${isMobile ? 'gap-2 mb-2' : 'gap-4 mb-3'}`}>
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground group-hover:text-primary transition-smooth`}>
          {title}
        </h3>
        {link && (
          <ExternalLink className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0`} />
        )}
      </div>
      <p className={`${isMobile ? 'text-xs mb-2' : 'text-sm mb-3'} text-accent font-medium`}>{company}</p>
      <p className={`text-muted-foreground leading-relaxed ${isMobile ? 'mb-3 text-sm line-clamp-3' : 'mb-4 line-clamp-4'}`}>
        {description}
      </p>
      {technologies && technologies.length > 0 && (
        <div className={`flex flex-wrap ${isMobile ? 'gap-1' : 'gap-2'}`}>
          {technologies.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className={`${isMobile ? 'px-2 py-0.5 text-2xs' : 'px-3 py-1 text-xs'} font-mono bg-muted text-muted-foreground rounded-md`}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </>
  );

  const getCardHeight = () => {
    if (isMobile) return 'min-h-[240px] h-auto';
    return link ? 'min-h-[220px] max-h-[220px]' : 'min-h-[280px] max-h-[400px]';
  };

  const cardClasses = `group hover:-translate-y-1 ${getCardHeight()} flex flex-col transition-all duration-300`;

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        <GenericCard variant="elevated" className={`${cardClasses} cursor-pointer`}>
          {CardContent}
        </GenericCard>
      </a>
    );
  }

  return (
    <GenericCard variant="elevated" className={cardClasses}>
      {CardContent}
    </GenericCard>
  );
};

export default ProjectCard;
