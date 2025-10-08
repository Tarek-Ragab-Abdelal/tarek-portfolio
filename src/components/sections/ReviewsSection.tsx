import { useState, useEffect } from "react";
import ReviewCard from "@/components/molecular/ReviewCard";
import { reviews } from "@/data/portfolio";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import PillButton from "@/components/atomic/PillButton";

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 bg-muted/30">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="p-3 rounded-lg gradient-primary">
            <Star className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">
            Client Reviews
          </h2>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <ReviewCard {...review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <PillButton
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </PillButton>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <PillButton
              variant="ghost"
              size="sm"
              onClick={goToNext}
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
