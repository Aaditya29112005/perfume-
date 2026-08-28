'use client';

import React from 'react';
import Link from 'next/link';
import { FlaconViewer3D } from '@/components/FlaconViewer3D';

export const PairDisc: React.FC = () => {
  return (
    <div className="w-full py-24 bg-[#05060A] text-[var(--blanc-pur)] overflow-hidden border-t border-[rgba(255,255,255,0.1)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="type-eyebrow text-[var(--rouge)] font-bold tracking-widest uppercase block mb-1">
              MOST VALUABLE PERFUME · MODÉLISATION 3D D&apos;EXCEPTION
            </span>
            <h2 className="type-section text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              THE PAIRING MOMENT
            </h2>
            <span className="type-echo text-sm md:text-base text-[var(--rouge)] font-semibold mt-1 block">
              *L&apos;art du flacon en trois dimensions — Most Valuable Perfume.*
            </span>
          </div>
          <div className="type-micro text-gray-400 font-mono">
            INTERACTIVE 3D STAGE · 360° ROTATION
          </div>
        </div>

        {/* 3D Model Stage Container */}
        <div className="w-full h-[720px] md:h-[850px] bg-[#05060A] relative overflow-hidden flex items-center justify-center p-6 border-none outline-none">
          {/* Subtle Deep Charcoal Radial Center Ambient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0F121C_0%,_#05060A_75%)] pointer-events-none" />

          {/* Left Side Grand Typography Layout Matching Image 2 */}
          <div className="absolute top-10 left-8 md:top-16 md:left-14 z-10 space-y-4 max-w-[360px] md:max-w-[500px]">
            {/* Red Eyebrow Line */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[var(--rouge)]" />
              <span className="type-eyebrow text-[var(--rouge)] font-bold tracking-widest uppercase text-xs">
                MOST VALUABLE PERFUME · BESTSELLER
              </span>
            </div>

            {/* Giant Product Title */}
            <div>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-none">
                ON A DATE
              </h3>
            </div>

            {/* Red Italic Subtitle */}
            <p className="type-echo text-base md:text-xl text-[var(--rouge)] font-serif italic">
              *L&apos;étincelle romantique — Most Valuable Perfume.*
            </p>

            {/* Fragrance Notes Mono Line */}
            <div className="type-micro text-gray-400 font-mono tracking-widest uppercase text-xs font-semibold">
              WARM · AMBER · BERGAMOT · OUD
            </div>

            {/* Paragraph Description */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
              An evocative olfactory journey capturing the electric romance of a Paris evening. Bright Calabrian bergamot yields to an intoxicating heart of golden amber resin, anchored by velvety cashmere musk.
            </p>

            {/* Outline CTA Button */}
            <div className="pt-2">
              <Link
                href="/products/on-a-date"
                className="inline-block px-8 py-3.5 border border-white/40 hover:border-white text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black"
              >
                EXPLORE PARFUM
              </Link>
            </div>
          </div>

          {/* 3D Flacon Viewer */}
          <FlaconViewer3D
            imageSrc="/oad50.png"
            altText="On A Date 3D Flacon Model - Most Valuable Perfume Bestseller"
          />
        </div>
      </div>
    </div>
  );
};
