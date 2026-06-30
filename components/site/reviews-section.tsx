"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Review } from "@/lib/portfolio-data";

function Stars({ rating }: Readonly<{ rating: number }>) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={15}
          className={n <= rating ? "fill-yellow-400 text-yellow-400" : "fill-line text-line"}
        />
      ))}
    </div>
  );
}

function Avatar({ review }: Readonly<{ review: Review }>) {
  const [errored, setErrored] = useState(false);
  const initial = review.author.charAt(0);

  if (review.image && !errored) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/20">
        <Image
          src={review.image}
          alt={review.author}
          fill
          sizes="48px"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-lg font-semibold text-accent ring-2 ring-accent/20">
      {initial}
    </div>
  );
}

export function ReviewsSection({ reviews }: Readonly<{ reviews: Review[] }>) {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const count = reviews.length;

  useEffect(() => {
    if (!autoplay || count <= 1) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % count), 5000);
    return () => clearInterval(id);
  }, [autoplay, count]);

  if (count === 0) return null;

  const goTo = (next: number) => {
    setAutoplay(false);
    setIndex((next + count) % count);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={`${review.author}-${review.company ?? "review"}`} className="w-full shrink-0 px-1 sm:px-6">
              <article className="mx-auto max-w-2xl rounded-xl border border-line bg-surface p-6 md:p-8">
                <Quote size={28} className="text-accent/30" aria-hidden="true" />
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{review.content}</p>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar review={review} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{review.author}</p>
                    {review.role && <p className="truncate text-xs text-muted">{review.role}</p>}
                    {review.company && <p className="truncate text-xs font-medium text-accent">{review.company}</p>}
                  </div>
                  <Stars rating={review.rating} />
                </div>
                {review.project && (
                  <span className="mt-4 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    Project: {review.project}
                  </span>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous review"
            className="rounded-full border border-line p-2 text-accent transition-colors hover:border-accent/40 hover:bg-accent/10"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {reviews.map((review, i) => (
              <button
                key={`${review.author}-dot`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === index}
                className={`rounded-full transition-all ${
                  i === index ? "h-2.5 w-2.5 bg-accent" : "h-2 w-2 bg-muted/40 hover:bg-muted/70"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next review"
            className="rounded-full border border-line p-2 text-accent transition-colors hover:border-accent/40 hover:bg-accent/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
