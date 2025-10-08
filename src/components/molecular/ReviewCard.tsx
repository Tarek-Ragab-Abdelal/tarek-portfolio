import GenericCard from "@/components/atomic/GenericCard";
import { Star } from "lucide-react";

interface ReviewCardProps {
  author: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

const ReviewCard = ({ author, role, content, rating, image }: ReviewCardProps) => {
  return (
    <GenericCard variant="elevated" className="h-full">
      <div className="flex items-center gap-4 mb-4">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-accent text-accent" : "text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed italic">"{content}"</p>
    </GenericCard>
  );
};

export default ReviewCard;
