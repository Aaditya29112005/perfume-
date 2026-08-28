'use client';

import React from 'react';
import { FlaconViewer3D } from '@/components/FlaconViewer3D';

export const PairDisc: React.FC = () => {
  return (
    <div className="w-full py-24 bg-[var(--noir)] text-[var(--blanc-pur)] overflow-hidden border-t border-[rgba(255,255,255,0.1)]">
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
        <div className="w-full h-[540px] md:h-[620px] border border-[rgba(255,255,255,0.15)] bg-black/80 relative overflow-hidden flex items-center justify-center p-6 shadow-2xl">
          {/* Top-Left Header Badge */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[var(--rouge)] text-white text-[10px] font-extrabold tracking-widest uppercase font-mono">
                MOST VALUABLE PERFUME
              </span>
              <span className="type-micro text-gray-400 font-mono">FLAGSHIP FLACON</span>
            </div>
            <h3 className="type-product text-xl md:text-2xl font-extrabold text-white uppercase tracking-wider">
              ON A DATE (50ML)
            </h3>
            <p className="type-micro text-gray-400 uppercase tracking-widest font-mono">
              SCROLL / DRAG FOR CINEMATIC 3D CAMERA ZOOM · WARM AMBER · BERGAMOT
            </p>
          </div>

          {/* 3D Flacon Viewer with Sphere Cap Model + Floating Embers & Scroll Zoom */}
          <FlaconViewer3D
            imageSrc="/oad50.png"
            altText="On A Date 3D Flacon Model - Most Valuable Perfume"
            capStyle="sphere"
            showParticles={true}
            enableScrollZoom={true}
          />
        </div>
      </div>
    </div>
  );
};
