'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initGSAP } from '@/lib/gsap';
import { GhostButton } from '@/components/Buttons';

export const LaMaisonTeaser: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = initGSAP();
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full py-24 bg-[var(--noir)] text-[var(--blanc-pur)] overflow-hidden border-t border-[rgba(255,255,255,0.1)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Image 55% with Parallax Scrub */}
        <div className="w-full lg:w-[55%] h-[480px] md:h-[600px] relative overflow-hidden border border-[rgba(255,255,255,0.15)] bg-black/40">
          <div ref={imageRef} className="absolute -top-[12%] left-0 w-full h-[124%]">
            <Image
              src="/heritage_oud.jpg"
              alt="La Maison Frasmetics Atelier"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--noir)] via-transparent to-transparent opacity-60" />
        </div>

        {/* Right Copy Block */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <span className="type-eyebrow">SAVOIR-FAIRE DE GRASSE</span>

          <h2 className="type-section text-3xl md:text-5xl font-extrabold tracking-wider leading-tight">
            POWER IS NOT WORN. <br />
            IT IS COMPOSED.
          </h2>

          <span className="type-echo text-2xl text-[var(--rouge)] font-normal">
            *La maison.*
          </span>

          <p className="type-body text-sm text-gray-300">
            Founded in the historic fragrance capital of Grasse, FRASMETICS unites ancestral French distillation techniques with contemporary architectural minimalist design. Every formula undergoes twelve months of cold maturation in dark glass carboys.
          </p>

          <div className="pt-4">
            <Link href="/pages/la-maison">
              <GhostButton>DÉCOUVRIR LA MAISON</GhostButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
