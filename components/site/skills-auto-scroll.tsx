"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface SkillsAutoScrollProps {
  skills: string[];
}

export function SkillsAutoScroll({ skills }: Readonly<SkillsAutoScrollProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollingSkills = useMemo(() => [...skills, ...skills], [skills]);

  useEffect(() => {
    let raf = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const container = containerRef.current;

      if (container && !paused) {
        const deltaMs = now - lastTime;
        container.scrollLeft += (deltaMs * 42) / 1000;

        const resetPoint = container.scrollWidth / 2;
        if (container.scrollLeft >= resetPoint) {
          container.scrollLeft -= resetPoint;
        }
      }

      lastTime = now;
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div className="section-shell noise-mask p-4 md:p-5">
      <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted">Core Toolkit</p>
      <div
        ref={containerRef}
        className="no-scrollbar overflow-x-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onWheel={(event) => {
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.currentTarget.scrollLeft += event.deltaY;
          }
        }}
      >
        <ul className="flex w-max gap-3 pr-3">
          {scrollingSkills.map((skill, index) => (
            <li key={`${skill}-${index}`} className="rounded-full border border-line/70 bg-bg/70 px-4 py-2 text-sm text-slate-200">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
