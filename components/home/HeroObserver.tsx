'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initGSAP } from '@/lib/gsap';
import { PRODUCTS } from '@/lib/products';
import { GhostButton } from '@/components/Buttons';
import { useAppStore } from '@/lib/store';
import { FlaconViewer3D } from '@/components/FlaconViewer3D';

export const HeroObserver: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { setActiveHeroIndex } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    setActiveHeroIndex(activeIdx);
  }, [activeIdx, setActiveHeroIndex]);

  useEffect(() => {
    const gsap = initGSAP();
    if (!containerRef.current) return;

    const changeAccord = (direction: number) => {
      if (isAnimatingRef.current) return;
      const nextIdx = activeIdx + direction;
      if (nextIdx < 0 || nextIdx >= PRODUCTS.length) return;

      isAnimatingRef.current = true;
      setActiveIdx(nextIdx);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 1000);
    };

    // Keyboard Arrow listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        changeAccord(1);
      } else if (e.key === 'ArrowUp') {
        changeAccord(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIdx]);

  const currentProduct = PRODUCTS[activeIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--noir)] text-[var(--blanc-pur)] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Image Stage with Soft Cinematic Blur & Depth of Field */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: currentProduct.sceneGround }}
      >
        <Image
          key={currentProduct.id}
          src={currentProduct.bgImage}
          alt={currentProduct.name}
          fill
          priority
          className="object-cover opacity-40 transition-all duration-1000 scale-105 blur-[8px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--noir)] via-black/40 to-[var(--noir)]/70" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 py-20">
        {/* Left Column: Product Details */}
        <div className="flex-1 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow">HAUTE ACCORD 0{activeIdx + 1} / 05</span>
          </div>

          <h1 className="type-display tracking-widest text-[var(--blanc-pur)] font-extrabold my-2">
            {currentProduct.name}
          </h1>

          <span className="type-echo text-xl md:text-2xl text-[var(--rouge)] font-normal mb-2">
            *{currentProduct.frenchEcho}*
          </span>

          <p className="type-micro text-gray-300 tracking-[0.35em] mb-4">
            {currentProduct.descriptor}
          </p>

          <p className="type-body text-xs md:text-sm text-gray-300 max-w-md mb-8">
            {currentProduct.description}
          </p>

          <div className="flex items-center gap-6">
            <Link href={`/products/${currentProduct.handle}`}>
              <GhostButton>EXPLORE PARFUM</GhostButton>
            </Link>
          </div>
        </div>

        {/* Center/Right Column: 3D Flacon Hero Interactive Display */}
        <div className="relative flex-1 flex justify-center items-center h-[420px] md:h-[540px] w-full">
          <div className="w-full h-full flex items-center justify-center">
            <FlaconViewer3D
              key={currentProduct.id}
              imageSrc={currentProduct.bottleImage50ml}
              altText={`${currentProduct.name} 3D Flacon Model`}
            />
          </div>
        </div>
      </div>

      {/* Right Edge Vertical Progress Rail */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {PRODUCTS.map((prod, idx) => (
          <button
            key={prod.id}
            onClick={() => setActiveIdx(idx)}
            className="flex items-center gap-3 group cursor-pointer bg-transparent border-0"
            title={prod.name}
          >
            <span className="hidden md:inline type-micro text-xs text-gray-400 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
              0{idx + 1}
            </span>
            <div
              className={`w-1 transition-all duration-500 ${
                activeIdx === idx
                  ? 'h-10 bg-[var(--rouge)]'
                  : 'h-4 bg-white/30 group-hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Bottom Scroll Cue Line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="type-micro text-[10px] text-gray-400">SCROLL TO DISCOVER</span>
        <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--rouge)] animate-scroll-cue" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-cue {
          animation: scrollCue 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
