import GenericCard from "@/components/atomic/GenericCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar, ExternalLink, MapPin } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  location?: string;
  period: string;
  achievements: string[];
  link?: string;
}

const ExperienceCard = ({ title, company, location, period, achievements, link }: ExperienceCardProps) => {
  const isMobile = useIsMobile();
  
  const CardContent = (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">{title}</h3>
          {link && (
            <ExternalLink className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0`} />
          )}
        </div>
        <p className="text-lg text-primary font-medium mb-2">{company}</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{period}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {achievements.map((achievement, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span className="leading-relaxed">{achievement}</span>
          </li>
        ))}
      </ul>
    </>
  );

  const cardClasses = "group hover:scale-[1.02] transition-all duration-300";

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

export default ExperienceCard;
