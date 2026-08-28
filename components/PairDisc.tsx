'use client';

import React from 'react';
import { FlaconViewer3D } from '@/components/FlaconViewer3D';

export const PairDisc: React.FC = () => {
  return (
    <div className="w-full py-24 bg-[#05060A] text-[var(--blanc-pur)] overflow-hidden border-t border-[rgba(255,255,255,0.1)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
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

          {/* Left Side Product Showcase Info & Bestseller Badge */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10 space-y-3 max-w-[360px] md:max-w-[420px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[var(--rouge)] text-white text-[11px] font-extrabold tracking-widest uppercase font-mono shadow-md">
                MOST VALUABLE PERFUME
              </span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/50 text-[11px] font-extrabold tracking-widest uppercase font-mono backdrop-blur-sm shadow-md">
                ★ BESTSELLER
              </span>
            </div>

            <div>
              <h3 className="type-product text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-1">
                ON A DATE
              </h3>
              <p className="text-amber-400 font-mono text-sm tracking-widest uppercase font-bold">
                EAU DE PARFUM · 50ML / 1.7 FL. OZ.
              </p>
            </div>

            <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans line-clamp-3">
              An intoxicating blend of sparkling bergamot, warm amber, and precious oud wood. Handcrafted in Grasse, France as our #1 iconic fragrance signature.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <span className="text-2xl font-black text-white font-mono">€180.00</span>
              <span className="type-micro px-2.5 py-1 bg-white/10 text-gray-300 rounded text-[10px] font-mono tracking-widest uppercase">
                IN STOCK · FREE SHIPPING
              </span>
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
