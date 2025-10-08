import GenericCard from "@/components/atomic/GenericCard";
import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReviewCardProps {
  author: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  company?: string;
  project?: string;
}

// Helper function to get responsive classes
const getResponsiveClasses = (isMobile: boolean) => ({
  cardHeight: isMobile ? 'min-h-[280px] h-auto' : 'h-72',
  spacing: isMobile ? 'space-y-3' : 'space-y-4',
  gap: isMobile ? 'gap-3' : 'gap-4',
  avatarSize: isMobile ? 'w-12 h-12' : 'w-16 h-16',
  authorText: isMobile ? 'text-base' : 'text-lg',
  smallText: isMobile ? 'text-xs' : 'text-sm',
  starSize: isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4',
  quoteSize: isMobile ? 'text-2xl' : 'text-4xl',
  quotePosition: isMobile ? '-top-1 -left-1' : '-top-2 -left-2',
  quotePositionRight: isMobile ? '-bottom-1 -right-1' : '-bottom-2 -right-2',
  contentPadding: isMobile ? 'pl-4 pr-3' : 'pl-6 pr-4'
});

// Helper function to handle image error
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, author: string) => {
  const target = e.target as HTMLImageElement;
  const parent = target.parentElement;
  if (parent) {
    target.remove();
    parent.innerHTML = `<span class="text-xl font-semibold text-primary">${author.charAt(0)}</span>`;
  }
};

// Helper function for content handling
const getContentWithClamp = (content: string) => content;

const ReviewCard = ({ author, role, content, rating, image, company, project }: ReviewCardProps) => {
  const isMobile = useIsMobile();
  const classes = getResponsiveClasses(isMobile);
  
  return (
    <GenericCard variant="elevated" className={`${classes.cardHeight} transition-all duration-300`}>
      <div className={classes.spacing}>
        {/* Header with author info and rating */}
        <div className={`flex items-start ${classes.gap}`}>
          <div className="flex-shrink-0">
            <div className={`relative ${classes.avatarSize} rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-2 ring-primary/20 overflow-hidden`}>
              {image ? (
                <img
                  src={image}
                  alt={author}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, author)}
                />
              ) : (
                <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-primary`}>
                  {author.charAt(0)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className={`flex items-start justify-between ${isMobile ? 'gap-1' : 'gap-2'}`}>
              <div className="flex-1">
                <h4 className={`font-semibold text-foreground ${classes.authorText} leading-tight`}>
                  {author}
                </h4>
                <p className={`${classes.smallText} text-muted-foreground mt-1`}>
                  {role}
                </p>
                {company && (
                  <p className={`${classes.smallText} font-medium text-primary mt-1`}>
                    {company}
                  </p>
                )}
              </div>
              
              <div className="flex gap-0.5 flex-shrink-0">
                {[1, 2, 3, 4, 5].map((starNumber) => (
                  <Star
                    key={starNumber}
                    className={`${classes.starSize} ${
                      starNumber <= rating 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {project && (
              <div className={`${isMobile ? 'mt-2' : 'mt-3'}`}>
                <span className={`inline-flex items-center ${isMobile ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-0.5 text-xs'} rounded-full font-medium bg-primary/10 text-primary border border-primary/20`}>
                  Project: {project}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Review content */}
        <div className="relative">
          <div className={`absolute ${classes.quotePosition} ${classes.quoteSize} text-primary/20 font-serif leading-none`}>
            "
          </div>
          <p className={`text-muted-foreground leading-relaxed ${classes.contentPadding} ${classes.smallText} italic line-clamp-4 md:line-clamp-none`}>
            {getContentWithClamp(content)}
          </p>
          <div className={`absolute ${classes.quotePositionRight} ${classes.quoteSize} text-primary/20 font-serif leading-none transform rotate-180`}>
            "
          </div>
        </div>
      </div>
    </GenericCard>
  );
};

export default ReviewCard;
