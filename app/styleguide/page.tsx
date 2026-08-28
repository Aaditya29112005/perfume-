'use client';

import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { PrimaryButton, GhostButton, MagneticButton } from '@/components/Buttons';
import { NotePyramid } from '@/components/NotePyramid';
import { PairDisc } from '@/components/PairDisc';
import { GhostWordmark } from '@/components/GhostWordmark';
import { PRODUCTS } from '@/lib/products';

export default function StyleguidePage() {
  const colorTokens = [
    { token: '--bleu-midnight', hex: '#0F1B3D', name: 'Bleu Midnight', bg: 'bg-[#0F1B3D]', text: 'text-white' },
    { token: '--bleu-royal', hex: '#1A3AA8', name: 'Bleu Royal', bg: 'bg-[#1A3AA8]', text: 'text-white' },
    { token: '--blanc-ivory', hex: '#F4F1E8', name: 'Blanc Ivory', bg: 'bg-[#F4F1E8]', text: 'text-[#070B18]' },
    { token: '--blanc-pur', hex: '#FFFFFF', name: 'Blanc Pur', bg: 'bg-[#FFFFFF]', text: 'text-[#070B18]' },
    { token: '--rouge', hex: '#C8102E', name: 'Rouge', bg: 'bg-[#C8102E]', text: 'text-white' },
    { token: '--noir', hex: '#070B18', name: 'Noir', bg: 'bg-[#070B18]', text: 'text-white' },
  ];

  return (
    <div className="w-full min-h-screen pt-32 pb-24 bg-[var(--blanc-ivory)] text-[var(--noir)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex flex-col gap-20">
        {/* Header */}
        <div>
          <SectionHeader
            eyebrow="SYSTÈME DE DESIGN"
            title="FRASMETICS STYLEGUIDE"
            frenchEcho="Les fondamentaux de la marque."
          />
          <p className="type-body text-sm mt-2 text-gray-700">
            Figma source: DESIGN-SYSTEM-FRASMETICS (`a9bn6EpOhN2cMpp3iEw1Xh`). Single source of truth for design tokens, typography, and motion primitives.
          </p>
        </div>

        {/* 1. COLOR TOKENS */}
        <section className="p-8 border border-[rgba(7,11,24,0.15)] bg-white">
          <span className="type-eyebrow mb-6 block">01 · COLOR TOKENS</span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {colorTokens.map((c) => (
              <div key={c.token} className="flex flex-col gap-2">
                <div
                  className={`h-28 w-full border border-[rgba(7,11,24,0.1)] p-3 flex flex-col justify-end ${c.bg} ${c.text}`}
                >
                  <span className="font-mono text-xs font-bold">{c.hex}</span>
                </div>
                <div>
                  <span className="type-micro font-bold">{c.name}</span>
                  <span className="type-micro text-gray-500 block">{c.token}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TYPOGRAPHY SCALE */}
        <section className="p-8 border border-[rgba(7,11,24,0.15)] bg-white flex flex-col gap-8">
          <span className="type-eyebrow">02 · TYPOGRAPHY SCALE (GATE & PLAYFAIR ECHO)</span>

          <div className="flex flex-col gap-6">
            <div className="pb-4 border-b border-gray-200">
              <span className="type-micro text-gray-400 block mb-1">--type-display (clamp 48px to 140px)</span>
              <h1 className="type-display text-4xl md:text-6xl font-extrabold uppercase">
                OUD ROUGE
              </h1>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <span className="type-micro text-gray-400 block mb-1">--type-section (clamp 36px to 72px)</span>
              <h2 className="type-section text-3xl md:text-4xl font-bold uppercase">
                THE FIVE ACCORDS
              </h2>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <span className="type-micro text-gray-400 block mb-1">--type-product (clamp 28px to 44px)</span>
              <h3 className="type-product text-2xl font-bold uppercase">
                PRIVÉ NUIT
              </h3>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <span className="type-micro text-gray-400 block mb-1">--type-eyebrow (10px, 30em tracking, rouge rule)</span>
              <span className="type-eyebrow">HAUTE PARFUMERIE DE GRASSE</span>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <span className="type-micro text-gray-400 block mb-1">--type-echo (Serif italic rouge)</span>
              <span className="type-echo text-2xl">*Une signature d&apos;exception.*</span>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <span className="type-micro text-gray-400 block mb-1">--type-micro (9px, 35em tracking)</span>
              <span className="type-micro">BERGAMOT · AMBER · CASHMERE MUSK</span>
            </div>
          </div>
        </section>

        {/* 3. BUTTON COMPONENTS */}
        <section className="p-8 border border-[rgba(7,11,24,0.15)] bg-white flex flex-col gap-6">
          <span className="type-eyebrow">03 · BUTTON PRIMITIVES (0 RADIUS)</span>

          <div className="flex flex-wrap items-center gap-6">
            <PrimaryButton>ACQUIRE · €185</PrimaryButton>
            <GhostButton className="text-[var(--noir)] border-[var(--noir)] hover:bg-[var(--noir)] hover:text-white">
              EXPLORE PARFUM
            </GhostButton>
            <MagneticButton>
              <span className="px-6 py-3 bg-[var(--rouge)] text-white text-xs font-bold uppercase tracking-widest inline-block">
                MAGNETIC CTA
              </span>
            </MagneticButton>
          </div>
        </section>

        {/* 4. NOTE PYRAMID */}
        <section className="p-8 border border-[rgba(7,11,24,0.15)] bg-[var(--noir)] text-white">
          <span className="type-eyebrow mb-6 block">04 · NOTE PYRAMID CELL</span>
          <NotePyramid notes={PRODUCTS[0].notes} details={PRODUCTS[0].pyramidDetails} theme="dark" />
        </section>

        {/* 5. PAIR DISC PALETTE DEVICE */}
        <section>
          <PairDisc />
        </section>

        {/* 6. GHOST WORDMARK */}
        <section className="bg-[var(--noir)]">
          <GhostWordmark text="FRASMETICS" />
        </section>
      </div>
    </div>
  );
}
