import { useState, useEffect } from "react";
import ReviewCard from "@/components/molecular/ReviewCard";
import { reviews } from "@/data/portfolio";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
    <section 
      id="reviews" 
      className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
      aria-labelledby="reviews-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 max-w-6xl mx-auto relative">
        {/* Section Header */}
        <header className="flex items-center gap-4 mb-12 justify-center">
          <div className="p-3 rounded-lg gradient-primary" aria-hidden="true">
            <Star className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="text-center">
            <h2 id="reviews-heading" className="text-4xl md:text-5xl font-bold text-foreground">
              Client Reviews & Professional Testimonials
            </h2>
            <h3 className="text-xl text-muted-foreground mt-2">
              Feedback from Satisfied Clients & Project Partners
            </h3>
          </div>
        </header>

        {/* SEO Content */}
        <div className="mb-8 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-3xl mx-auto">
            Read authentic testimonials from clients who have experienced exceptional software development 
            services. These reviews highlight successful project deliveries, technical expertise, and 
            professional collaboration across various industries and platforms.
          </p>
          <p className="sr-only">
            Client testimonials from Upwork projects, corporate partnerships, and freelance engagements. 
            Featuring reviews from product managers, CTOs, senior engineers, and business owners who have 
            worked with Tarek Ragab on software development, IoT solutions, web applications, and 
            technical consulting projects.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={`${review.author}-${review.company || 'unknown'}`} className="w-full flex-shrink-0 px-6">
                  <div className="flex justify-center">
                    <ReviewCard {...review} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={`${review.author}-dot`}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-primary w-3 h-3"
                      : "bg-muted-foreground/40 w-2 h-2 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="p-2 rounded-full border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
