'use client';

import React, { useEffect, useRef } from 'react';
import { initGSAP } from '@/lib/gsap';

export const StatementSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = initGSAP();
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.statement-line',
        { y: 60, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0,
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.2,
          stagger: 0.14,
          ease: 'frasmetics',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-36 bg-[var(--bleu-midnight)] text-[var(--blanc-pur)] overflow-hidden flex items-center justify-center border-t border-b border-[rgba(255,255,255,0.1)]"
    >
      {/* Ghost Wordmark background watermark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-5 type-ghost text-center">
        FRASMETICS PARIS
      </div>

      {/* 3% noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center gap-6">
        <span className="type-eyebrow statement-line">L&apos;INTENTION ABSOLUE</span>

        <h2 className="type-section text-4xl md:text-6xl tracking-wider uppercase font-extrabold statement-line leading-tight">
          UNISEX IN SPIRIT. <br />
          ABSOLUTE IN INTENT.
        </h2>

        <span className="type-echo text-2xl md:text-3xl text-[var(--rouge)] font-normal statement-line">
          *Un seul geste.*
        </span>

        <p className="type-body text-sm md:text-base text-gray-300 max-w-2xl mt-4 statement-line">
          Crafted without gender boundaries or commercial compromise. Each olfactory accord is composed from raw botanical extracts harvested in Grasse and rare resins distilled to their purest essence.
        </p>

        {/* Tricolore Rule */}
        <div className="w-24 h-1 tricolore-bar mt-6 statement-line" />
      </div>
    </div>
  );
};
