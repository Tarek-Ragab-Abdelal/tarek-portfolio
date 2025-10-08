import GenericCard from "@/components/atomic/GenericCard";
import { Calendar, MapPin } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  location?: string;
  period: string;
  achievements: string[];
}

const ExperienceCard = ({ title, company, location, period, achievements }: ExperienceCardProps) => {
  return (
    <GenericCard variant="elevated" className="hover:scale-[1.02]">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
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
    </GenericCard>
  );
};

export default ExperienceCard;
