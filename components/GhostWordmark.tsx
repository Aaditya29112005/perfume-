'use client';

import React, { useEffect, useRef } from 'react';
import { initGSAP } from '@/lib/gsap';

interface GhostWordmarkProps {
  text?: string;
  className?: string;
}

export const GhostWordmark: React.FC<GhostWordmarkProps> = ({
  text = 'FRASMETICS',
  className = '',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = initGSAP();
    if (!textRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`w-full overflow-hidden py-12 select-none pointer-events-none ${className}`}
    >
      <div
        ref={textRef}
        className="type-ghost whitespace-nowrap opacity-10 tracking-[0.1em]"
      >
        {text} · PARIS · {text}
      </div>
    </div>
  );
};
