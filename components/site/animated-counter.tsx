"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ end, suffix = "", label }: Readonly<AnimatedCounterProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-bold text-white md:text-4xl">
        {inView ? (
          <CountUp end={end} duration={2} suffix={suffix} />
        ) : (
          <span>0{suffix}</span>
        )}
      </p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
