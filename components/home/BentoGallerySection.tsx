'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { initGSAP, Flip, ScrollTrigger } from '@/lib/gsap';

interface GalleryTile {
  id: string;
  title: string;
  tag: string;
  src: string;
}

const GALLERY_ITEMS: GalleryTile[] = [
  { id: '1', title: "HÉRITAGE D'OUD", tag: 'ACCORD 01', src: '/bg_heritage_oud.jpg' },
  { id: '2', title: 'ON A DATE 50ML', tag: 'FLAGSHIP FLACON', src: '/oad50.png' },
  { id: '3', title: 'OUD ROUGE', tag: 'ACCORD 03', src: '/bg_oud_rouge.jpg' },
  { id: '4', title: 'PRIVÉ NUIT', tag: 'ACCORD 04', src: '/bg_prive_nuit.jpg' },
  { id: '5', title: 'TOBACCO & WHISKEY', tag: 'ACCORD 05', src: '/tw50.png' },
  { id: '6', title: 'ROSE WOOD OUD', tag: 'ACCORD 07', src: '/bg_rose_wood_oud.jpg' },
  { id: '7', title: 'SAFFRON AMBER OUD', tag: 'ACCORD 08', src: '/sao50.png' },
  { id: '8', title: 'LA MAISON GRASSE', tag: 'PARFUMERIE', src: '/bg_saffron_amber_oud.jpg' },
];

export const BentoGallerySection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = initGSAP();
    if (!wrapperRef.current || !galleryRef.current) return;

    const galleryEl = galleryRef.current;
    const items = galleryEl.querySelectorAll('.bento-item');

    const ctx = gsap.context(() => {
      // 1. Ensure initial compact bento class is set
      galleryEl.classList.remove('bento-final');

      // 2. Capture final expanded state
      galleryEl.classList.add('bento-final');
      const state = Flip.getState(items, {
        props: 'transform, opacity, borderRadius, width, height, top, left',
      });
      galleryEl.classList.remove('bento-final');

      // 3. Create Flip animation timeline
      const flipTween = Flip.to(state, {
        ease: 'power2.inOut',
        stagger: 0.03,
        scale: true,
      });

      // 4. Pin section & trigger Flip on scroll
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 1.2,
        animation: flipTween,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen bg-[#070B1A] text-white overflow-hidden flex flex-col items-center justify-between py-12 border-t border-[rgba(255,255,255,0.1)]"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(7,11,24,1)_80%)] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center pointer-events-none mt-4">
        <span className="type-eyebrow text-[var(--rouge)] font-bold tracking-widest uppercase block">
          GALERIE D&apos;ART OLFACTIF
        </span>
        <h2 className="type-section text-3xl md:text-5xl font-extrabold uppercase mt-1">
          THE BENTO ACCORD GALLERY
        </h2>
        <span className="type-micro text-gray-400 block mt-1 tracking-widest font-mono">
          SCROLL TO UNCHAIN & EXPAND VISUAL ACCORDS
        </span>
      </div>

      {/* Bento Gallery Stage */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center p-6">
        <div
          ref={galleryRef}
          className="bento-gallery relative w-full max-w-[1150px] h-[480px] md:h-[540px] mx-auto"
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className={`bento-item bento-tile-${idx + 1} absolute overflow-hidden bg-black/90 border border-white/15 shadow-2xl transition-colors hover:border-[var(--rouge)]`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110 opacity-85 hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end pointer-events-none">
                <span className="type-micro text-[var(--rouge)] font-bold text-[10px] tracking-widest font-mono">
                  {item.tag}
                </span>
                <h4 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Styles for Compact Bento (Initial) vs Expanded Wall (Final) */}
      <style jsx global>{`
        /* --- Initial Compact Bento Layout --- */
        .bento-gallery .bento-item {
          transition: border-color 0.3s ease;
          border-radius: 8px;
        }

        .bento-gallery .bento-tile-1 { top: 10%; left: 35%; width: 30%; height: 80%; z-index: 10; }
        .bento-gallery .bento-tile-2 { top: 20%; left: 15%; width: 22%; height: 60%; z-index: 8; }
        .bento-gallery .bento-tile-3 { top: 20%; left: 63%; width: 22%; height: 60%; z-index: 8; }
        .bento-gallery .bento-tile-4 { top: 30%; left: 5%;  width: 18%; height: 45%; z-index: 6; }
        .bento-gallery .bento-tile-5 { top: 30%; left: 77%; width: 18%; height: 45%; z-index: 6; }
        .bento-gallery .bento-tile-6 { top: 5%;  left: 20%; width: 16%; height: 35%; z-index: 4; }
        .bento-gallery .bento-tile-7 { top: 5%;  left: 64%; width: 16%; height: 35%; z-index: 4; }
        .bento-gallery .bento-tile-8 { top: 60%; left: 40%; width: 20%; height: 35%; z-index: 12; }

        /* --- Final Expanded Bento Grid Wall --- */
        .bento-gallery.bento-final .bento-tile-1 { top: 0%;   left: 0%;   width: 23%; height: 47%; }
        .bento-gallery.bento-final .bento-tile-2 { top: 0%;   left: 25%;  width: 23%; height: 47%; }
        .bento-gallery.bento-final .bento-tile-3 { top: 0%;   left: 50%;  width: 23%; height: 47%; }
        .bento-gallery.bento-final .bento-tile-4 { top: 0%;   left: 75%;  width: 23%; height: 47%; }

        .bento-gallery.bento-final .bento-tile-5 { top: 52%;  left: 0%;   width: 23%; height: 47%; }
        .bento-gallery.bento-final .bento-tile-6 { top: 52%;  left: 25%;  width: 23%; height: 47%; }
        .bento-gallery.bento-final .bento-tile-7 { top: 52%;  left: 50%;  width: 23%; height: 47%; }
        .bento-gallery.bento-final .bento-tile-8 { top: 52%;  left: 75%;  width: 23%; height: 47%; }
      `}</style>
    </div>
  );
};
