'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PRODUCTS, Product } from '@/lib/products';
import { useAppStore } from '@/lib/store';

export default function AIAtelierPage() {
  const { addToCart, toggleCart } = useAppStore();

  // Questionnaire state
  const [mood, setMood] = useState<string>('MIDNIGHT_RENDEZVOUS');
  const [noteFamily, setNoteFamily] = useState<string>('WOOD_OUD');
  const [intensity, setIntensity] = useState<number>(85);
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // AI Generation State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{
    matchScore: number;
    recommendedProducts: Product[];
    bespokeFormula: { top: string; heart: string; base: string };
    aiDescription: string;
  } | null>(null);

  const handleGenerateAIScent = () => {
    setIsAnalyzing(true);
    setAiResult(null);

    setTimeout(() => {
      // Filter top 3 products based on selected note family category
      let filtered = PRODUCTS.filter((p) => {
        if (noteFamily === 'WOOD_OUD') return p.category === 'boise';
        if (noteFamily === 'TOBACCO') return p.category === 'oriental';
        if (noteFamily === 'LEATHER') return p.category === 'gourmand';
        return p.category === 'frais';
      });

      if (filtered.length < 3) {
        filtered = PRODUCTS.slice(0, 3);
      } else {
        filtered = filtered.slice(0, 3);
      }

      // Round match score to 1 decimal place cleanly (e.g. 96.8)
      const rawScore = 94.0 + Math.random() * 5.2;
      const matchScore = Math.round(rawScore * 10) / 10;

      setAiResult({
        matchScore,
        recommendedProducts: filtered,
        bespokeFormula: {
          top: mood === 'MIDNIGHT_RENDEZVOUS' ? '40% Smoked Bergamot & Saffron' : '35% Pink Pepper & Damask Rose',
          heart: noteFamily === 'TOBACCO' ? '45% Cuban Tobacco & Vintage Whiskey' : '45% Royal Cambodian Oud & Cashmere',
          base: '15% Ambergris, Vanilla Bourbon & French Oakmoss',
        },
        aiDescription: customPrompt
          ? `AI Formula generated for "${customPrompt}": A bespoke trilogy harmonizing intense woody notes with warm gourmand amber depth.`
          : `Custom AI Match formulated for ${mood.replace('_', ' ')}: Elevates personal aura with rich ${noteFamily.replace('_', ' ')} sillage.`,
      });

      setIsAnalyzing(false);
    }, 1600);
  };

  const handleAddAICoffret = () => {
    if (!aiResult) return;
    aiResult.recommendedProducts.forEach((prod) => {
      addToCart(prod, '50ml');
    });
    toggleCart();
  };

  return (
    <div className="min-h-screen bg-[var(--noir)] text-[var(--blanc-pur)] selection:bg-[var(--rouge)] selection:text-white">
      <Navbar />

      <main className="pt-44 pb-24 px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Header Title */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="type-micro text-[var(--rouge)] tracking-[0.3em] font-bold block mb-2">
            L&apos;INTELLIGENCE ARTIFICIELLE PARFUMÉE
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-widest uppercase text-white mb-4">
            AI L&apos;ATELIER PARFUMEUR
          </h1>
          <p className="type-body text-gray-400 text-base leading-relaxed">
            Experience our neural scent matchmaker. Select your mood, note preferences, or type a custom prompt to generate your bespoke 3-piece coffret.
          </p>
        </div>

        {/* AI Generator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: AI Parameters Input */}
          <div className="lg:col-span-6 bg-black/60 border border-[rgba(255,255,255,0.15)] p-8 space-y-8 shadow-2xl">
            <div>
              <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--rouge)] rounded-full animate-pulse" />
                <span>01. OLFACTORY MOOD</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'MIDNIGHT_RENDEZVOUS', label: 'MIDNIGHT RENDEZVOUS' },
                  { id: 'ROYAL_GALA', label: 'ROYAL GALA' },
                  { id: 'MEDITERRANEAN_DUSK', label: 'MEDITERRANEAN DUSK' },
                  { id: 'PARIS_DAWN', label: 'PARIS DAWN' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`py-3 px-4 text-xs tracking-widest font-mono border transition-all text-left cursor-pointer ${
                      mood === m.id
                        ? 'border-[var(--rouge)] bg-[var(--rouge)]/20 text-white font-bold'
                        : 'border-[rgba(255,255,255,0.15)] text-gray-400 hover:border-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--rouge)] rounded-full animate-pulse" />
                <span>02. DOMINANT ACCORD FAMILY</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'WOOD_OUD', label: 'OUD & RARE WOODS' },
                  { id: 'TOBACCO', label: 'SMOKED TOBACCO & WINE' },
                  { id: 'LEATHER', label: 'LEATHER & AMBER' },
                  { id: 'FLORAL', label: 'FLORAL & MUSK' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setNoteFamily(f.id)}
                    className={`py-3 px-4 text-xs tracking-widest font-mono border transition-all text-left cursor-pointer ${
                      noteFamily === f.id
                        ? 'border-[var(--rouge)] bg-[var(--rouge)]/20 text-white font-bold'
                        : 'border-[rgba(255,255,255,0.15)] text-gray-400 hover:border-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--rouge)] rounded-full animate-pulse" />
                <span>03. SILLAGE INTENSITY: {intensity}%</span>
              </h3>
              <input
                type="range"
                min="50"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-[var(--rouge)] bg-gray-800 cursor-pointer h-2 rounded-lg"
              />
              <div className="flex justify-between type-micro text-gray-500 mt-2">
                <span>SUBTLE INTENSITY (50%)</span>
                <span>MAX EXTRAIT DE PARFUM (100%)</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--rouge)] rounded-full animate-pulse" />
                <span>04. CUSTOM AI PROMPT (OPTIONAL)</span>
              </h3>
              <textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. A rainy autumn evening in Grasse with warm amber, smoked leather, and dark vanilla bourbon..."
                className="w-full bg-black border border-[rgba(255,255,255,0.2)] p-4 text-sm text-white focus:outline-none focus:border-[var(--rouge)] transition-colors placeholder:text-gray-600 resize-none"
              />
            </div>

            <button
              onClick={handleGenerateAIScent}
              disabled={isAnalyzing}
              className="w-full py-4 bg-[var(--rouge)] text-white font-bold type-btn tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>NEURAL SCENT ANALYSIS IN PROGRESS...</span>
                </>
              ) : (
                <span>SYNTHESIZE AI SCENT PROFILE</span>
              )}
            </button>
          </div>

          {/* Right Column: AI Results Display */}
          <div className="lg:col-span-6 bg-black/40 border border-[rgba(255,255,255,0.15)] p-8 min-h-[620px] flex flex-col justify-between shadow-2xl">
            {isAnalyzing ? (
              <div className="my-auto text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-[var(--rouge)] rounded-full animate-ping opacity-75" />
                  <div className="w-14 h-14 border-2 border-white border-t-[var(--rouge)] rounded-full animate-spin" />
                </div>
                <div className="space-y-2">
                  <p className="type-micro text-[var(--rouge)] tracking-widest font-bold">ANALYZING ACCORD HARMONICS</p>
                  <p className="type-body text-gray-400 text-sm">Processing botanical pyramid & sillage projection matrix...</p>
                </div>
              </div>
            ) : aiResult ? (
              <div className="space-y-8 animate-fadeIn">
                {/* Score & Formula Header */}
                <div className="border-b border-[rgba(255,255,255,0.15)] pb-6 flex justify-between items-center">
                  <div>
                    <span className="type-micro text-[var(--rouge)] font-bold tracking-widest">AI MATCH CONFIDENCE</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
                      {aiResult.matchScore.toFixed(1)}% MATCH
                    </h2>
                  </div>
                  <span className="type-micro px-3 py-1.5 border border-emerald-500/50 text-emerald-400 bg-emerald-950/30">
                    FORMULA SYNTHESIZED
                  </span>
                </div>

                <p className="type-body text-gray-300 text-sm italic bg-black/60 p-4 border-l-2 border-[var(--rouge)]">
                  {aiResult.aiDescription}
                </p>

                {/* Formula Breakdown */}
                <div className="space-y-3 font-mono text-xs text-gray-300 bg-black/80 p-4 border border-[rgba(255,255,255,0.1)]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">TOP NOTES:</span>
                    <span>{aiResult.bespokeFormula.top}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">HEART NOTES:</span>
                    <span>{aiResult.bespokeFormula.heart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">BASE NOTES:</span>
                    <span>{aiResult.bespokeFormula.base}</span>
                  </div>
                </div>

                {/* Recommended 3-Piece AI Coffret */}
                <div>
                  <h4 className="type-micro text-gray-400 tracking-widest mb-4">RECOMMENDED AI COFFRET TRIO (3 × 50ML)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {aiResult.recommendedProducts.map((p) => (
                      <div key={p.id} className="border border-[rgba(255,255,255,0.15)] p-3 text-center bg-black/60">
                        <div className="relative w-full h-24 mb-2">
                          <Image src={p.bottleImage50ml} alt={p.name} fill className="object-contain" />
                        </div>
                        <p className="type-micro font-bold text-white truncate">{p.name}</p>
                        <p className="type-micro text-gray-500 mt-1">50ML</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddAICoffret}
                  className="w-full py-4 bg-[var(--rouge)] text-white font-bold type-btn tracking-widest hover:bg-red-700 transition-all shadow-2xl cursor-pointer"
                >
                  ACQUIRE AI-MATCHED COFFRET (€380)
                </button>
              </div>
            ) : (
              <div className="my-auto text-center space-y-4 text-gray-500">
                <span className="type-micro tracking-widest block text-gray-400">AWAITING AI PARAMETERS</span>
                <p className="type-body text-sm max-w-sm mx-auto">
                  Select your olfactory mood, note preferences, or type a custom prompt on the left, then click &quot;SYNTHESIZE AI SCENT PROFILE&quot;.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
