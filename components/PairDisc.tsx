'use client';

import React from 'react';
import { FlaconViewer3D } from '@/components/FlaconViewer3D';

export const PairDisc: React.FC = () => {
  return (
    <div className="w-full py-24 bg-[var(--noir)] text-[var(--blanc-pur)] overflow-hidden border-t border-[rgba(255,255,255,0.1)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="type-eyebrow">MODÉLISATION 3D D&apos;EXCEPTION</span>
            <h2 className="type-section">THE PAIRING MOMENT</h2>
            <span className="type-echo text-sm text-[var(--rouge)]">*L&apos;art du flacon en trois dimensions.*</span>
          </div>
          <div className="type-micro text-gray-400">
            INTERACTIVE 3D STAGE · 360° ROTATION
          </div>
        </div>

        {/* 3D Model Stage Container */}
        <div className="w-full h-[540px] border border-[rgba(255,255,255,0.15)] bg-black/60 relative overflow-hidden flex items-center justify-center p-6 shadow-2xl">
          {/* Subtle Top-Left Header Badge */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <span className="type-micro text-[var(--rouge)] font-bold tracking-widest block">FLAGSHIP FLACON</span>
            <h3 className="type-product text-xl md:text-2xl font-extrabold text-white mt-1">
              ON A DATE (50ML)
            </h3>
            <p className="type-micro text-gray-400 mt-1">
              WARM AMBER · BERGAMOT · CASHMERE MUSK
            </p>
          </div>

          {/* 3D Flacon Viewer */}
          <FlaconViewer3D
            imageSrc="/oad50.png"
            altText="On A Date 3D Flacon Model"
          />
        </div>
      </div>
    </div>
  );
};
