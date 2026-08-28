'use client';

import React, { useEffect, useRef, useState } from 'react';
import { initGSAP } from '@/lib/gsap';

export const Preloader: React.FC = () => {
  const [isDone, setIsDone] = useState(false);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Session storage check
    const hasLoaded = sessionStorage.getItem('frasmetics_preloader_shown');
    if (hasLoaded) {
      setIsDone(true);
      return;
    }

    const gsap = initGSAP();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      sessionStorage.setItem('frasmetics_preloader_shown', 'true');
      setIsDone(true);
      return;
    }

    const chars = textRef.current?.querySelectorAll('.preloader-char');

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('frasmetics_preloader_shown', 'true');
        setTimeout(() => setIsDone(true), 100);
      },
    });

    // 1. Fill characters from stroke outline to solid white
    if (chars && chars.length > 0) {
      tl.to(chars, {
        color: '#FFFFFF',
        stagger: 0.04,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // 2. Animate tricolore progress bar width 0 -> 100%
    if (progressBarRef.current) {
      tl.to(
        progressBarRef.current,
        {
          width: '100%',
          duration: 1.0,
          ease: 'power1.inOut',
        },
        '-=0.4'
      );
    }

    // 3. Curtain split exit
    tl.to(
      leftCurtainRef.current,
      {
        xPercent: -100,
        duration: 0.9,
        ease: 'frasmetics',
      },
      '+=0.1'
    );

    tl.to(
      rightCurtainRef.current,
      {
        xPercent: 100,
        duration: 0.9,
        ease: 'frasmetics',
      },
      '<'
    );
  }, []);

  if (isDone) return null;

  const wordmark = 'FRASMETICS';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex pointer-events-none"
    >
      {/* Left Curtain */}
      <div
        ref={leftCurtainRef}
        className="w-1/2 h-full bg-[var(--noir)] flex justify-end items-center border-r border-[rgba(255,255,255,0.05)] pointer-events-auto"
      >
        <div className="translate-x-1/2 flex items-center gap-1 text-[clamp(2.5rem,6vw,7rem)] font-extrabold uppercase tracking-[0.1em] font-sans">
          {wordmark.slice(0, 5).split('').map((ch, idx) => (
            <span
              key={idx}
              className="preloader-char transition-colors duration-300"
              style={{
                WebkitTextStroke: '1px #FFFFFF',
                color: 'transparent',
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Right Curtain */}
      <div
        ref={rightCurtainRef}
        className="w-1/2 h-full bg-[var(--noir)] flex justify-start items-center pointer-events-auto"
      >
        <div className="-translate-x-1/2 flex items-center gap-1 text-[clamp(2.5rem,6vw,7rem)] font-extrabold uppercase tracking-[0.1em] font-sans">
          {wordmark.slice(5).split('').map((ch, idx) => (
            <span
              key={idx + 5}
              className="preloader-char transition-colors duration-300"
              style={{
                WebkitTextStroke: '1px #FFFFFF',
                color: 'transparent',
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Tricolore Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/40 pointer-events-none z-50 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full w-0 tricolore-bar"
        />
      </div>
    </div>
  );
};
