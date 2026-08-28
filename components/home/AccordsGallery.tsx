'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initGSAP } from '@/lib/gsap';
import { PRODUCTS } from '@/lib/products';

export const AccordsGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = initGSAP();
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Custom follower cursor lag-free quickTo
      const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.3, ease: 'power3' });
      const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.3, ease: 'power3' });

      const handleMouseMove = (e: MouseEvent) => {
        if (!cursorRef.current) return;
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Desktop pinned horizontal scroll via ScrollTrigger matchMedia
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const totalTranslate = trackRef.current ? trackRef.current.scrollWidth - window.innerWidth : 0;

        gsap.to(trackRef.current, {
          x: -totalTranslate,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${totalTranslate}`,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        mm.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[var(--noir)] text-[var(--blanc-pur)] overflow-hidden py-24"
    >
      {/* Custom Follower Cursor Badge */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[var(--rouge)] text-white text-xs font-bold flex items-center justify-center pointer-events-none z-50 opacity-0 transition-opacity duration-300 scale-90 group-hover:opacity-100 shadow-2xl"
        id="custom-voir-cursor"
      >
        VOIR
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 mb-12">
        <span className="type-eyebrow">LES CINQ ACCORDS</span>
        <h2 className="type-section mt-2">THE FIVE ACCORDS GALLERY</h2>
        <span className="type-echo text-lg text-[var(--rouge)]">*Chaque flacon est un poème.*</span>
      </div>

      {/* Track container */}
      <div className="w-full overflow-x-auto lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row w-full lg:w-max min-w-full"
        >
          {PRODUCTS.map((prod, idx) => (
            <Link
              key={prod.id}
              href={`/products/${prod.handle}`}
              className="relative w-full lg:w-[420px] h-[550px] flex-shrink-0 group border-r border-b lg:border-b-0 border-[rgba(255,255,255,0.15)] overflow-hidden bg-black/40 p-8 flex flex-col justify-between"
              onMouseEnter={() => {
                const el = document.getElementById('custom-voir-cursor');
                if (el) el.style.opacity = '1';
              }}
              onMouseLeave={() => {
                const el = document.getElementById('custom-voir-cursor');
                if (el) el.style.opacity = '0';
              }}
            >
              {/* Background Scene Image with Soft Cinematic Blur & Hover Scale */}
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <Image
                  src={prod.bgImage}
                  alt={prod.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-106 blur-[6px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--noir)] via-transparent to-transparent" />
              </div>

              {/* Top Tile Header */}
              <div className="relative z-10 flex justify-between items-center">
                <span className="type-micro text-gray-400">ACCORD 0{idx + 1}</span>
                <span className="type-micro text-[var(--rouge)] font-bold">€{prod.price50ml}</span>
              </div>

              {/* Centered Flacon with hover y: -12 */}
              <div className="relative z-10 flex-1 flex items-center justify-center my-4">
                <Image
                  src={prod.bottleImage50ml}
                  alt={prod.name}
                  width={220}
                  height={280}
                  className="object-contain max-h-[280px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-3"
                />
              </div>

              {/* Base Info & Tricolore Underline */}
              <div className="relative z-10 pt-4 border-t border-[rgba(255,255,255,0.15)]">
                <h3 className="type-product text-xl md:text-2xl font-bold tracking-widest group-hover:text-[var(--rouge)] transition-colors">
                  {prod.name}
                </h3>
                <p className="type-micro text-gray-400 mt-1">{prod.descriptor}</p>
                <p className="type-body text-xs text-gray-300 mt-2">
                  {prod.notes.top} · {prod.notes.heart} · {prod.notes.base}
                </p>

                {/* Tricolore draw line on hover */}
                <div className="w-full h-0.5 mt-4 overflow-hidden relative">
                  <div className="w-full h-full tricolore-bar -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
