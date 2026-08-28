'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { PRODUCTS, Product } from '@/lib/products';
import { Volume2, VolumeX, Lock } from 'lucide-react';

interface AccordStageItem {
  id: string;
  number: string;
  name: string;
  frenchEcho: string;
  description: string;
  topNote: string;
  heartNote: string;
  baseNote: string;
  price: number;
  originalPrice: number;
  discount: string;
  bgGradient: string;
  imageSrc: string;
  product: Product;
}

const ACCORDS_STAGE: AccordStageItem[] = [
  {
    id: 'heritage-oud',
    number: 'ACCORD #01',
    name: "HÉRITAGE D'OUD",
    frenchEcho: '“Le rendez-vous parfait.”',
    description:
      'Frasmetics crafts niche fragrances at the meeting point of French perfumery tradition and contemporary design.',
    topNote: 'Cambodian Oud',
    heartNote: 'Russian Leather',
    baseNote: 'Patchouli',
    price: 160,
    originalPrice: 220,
    discount: '-27% OFF',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(15, 27, 61, 0.95) 0%, rgba(7, 11, 24, 1) 75%)',
    imageSrc: '/hdo50.png',
    product: PRODUCTS[1],
  },
  {
    id: 'oud-rouge',
    number: 'ACCORD #02',
    name: 'OUD ROUGE',
    frenchEcho: '“L’incendie écarlate.”',
    description:
      'A fiery crimson composition of rare Persian saffron strands, May Rose Centifolia petals, and charred agarwood resin.',
    topNote: 'Red Saffron',
    heartNote: 'Damask Rose',
    baseNote: 'Smoked Oud',
    price: 175,
    originalPrice: 240,
    discount: '-27% OFF',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(70, 10, 20, 0.95) 0%, rgba(7, 11, 24, 1) 75%)',
    imageSrc: '/or50.png',
    product: PRODUCTS[2],
  },
  {
    id: 'prive-nuit',
    number: 'ACCORD #03',
    name: 'PRIVÉ NUIT',
    frenchEcho: '“Le secret de minuit.”',
    description:
      'An enigmatic nocturnal elixir blending dark midnight plum, powdery Florentine iris root, and smoked black amber crystals.',
    topNote: 'Midnight Plum',
    heartNote: 'Velvet Iris',
    baseNote: 'Black Amber',
    price: 165,
    originalPrice: 225,
    discount: '-26% OFF',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(35, 15, 60, 0.95) 0%, rgba(7, 11, 24, 1) 75%)',
    imageSrc: '/pn50.png',
    product: PRODUCTS[3],
  },
  {
    id: 'on-a-date',
    number: 'ACCORD #04',
    name: 'ON A DATE',
    frenchEcho: '“L’étincelle romantique.”',
    description:
      'An evocative olfactory journey capturing the electric romance of a Paris evening with Calabrian bergamot and golden amber.',
    topNote: 'Calabrian Bergamot',
    heartNote: 'Golden Amber',
    baseNote: 'Cashmere Musk',
    price: 185,
    originalPrice: 260,
    discount: '-28% OFF',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(65, 45, 15, 0.95) 0%, rgba(7, 11, 24, 1) 75%)',
    imageSrc: '/oad50.png',
    product: PRODUCTS[0],
  },
  {
    id: 'tobacco-whiskey',
    number: 'ACCORD #05',
    name: 'TOBACCO & WHISKEY',
    frenchEcho: '“L’élixir des épicuriens.”',
    description:
      'A hedonistic blend of cured Cuban tobacco leaves steeped in aged single malt whiskey with Madagascar bourbon vanilla.',
    topNote: 'Blonde Tobacco',
    heartNote: 'Single Malt Whiskey',
    baseNote: 'Bourbon Vanilla',
    price: 170,
    originalPrice: 230,
    discount: '-26% OFF',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(55, 25, 10, 0.95) 0%, rgba(7, 11, 24, 1) 75%)',
    imageSrc: '/tw50.png',
    product: PRODUCTS[4],
  },
];

export default function FiveAccordsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [currency, setCurrency] = useState('EUR (€)');
  const [isAnimating, setIsAnimating] = useState(false);

  const { addToCart } = useAppStore();
  const activeAccord = ACCORDS_STAGE[activeIndex];

  const handleTabChange = (index: number) => {
    if (index === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[var(--noir)] text-[var(--blanc-pur)] selection:bg-[var(--rouge)] selection:text-white flex flex-col justify-between relative overflow-hidden">
      {/* Main Interactive Stage with Dynamic Backdrop Radial Gradient */}
      <main
        className="flex-1 pt-36 md:pt-40 pb-36 px-6 md:px-16 flex items-center justify-center relative transition-all duration-700 ease-out min-h-[85vh]"
        style={{ background: activeAccord.bgGradient }}
      >
        {/* Top-Right Auxiliary Controls (Sound Toggle & Currency Selector) */}
        <div className="absolute top-32 right-6 md:right-16 z-20 flex items-center gap-4 text-xs type-micro text-gray-300 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10 shadow-lg">
          <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer bg-transparent border-0"
          >
            {isSoundOn ? <Volume2 className="w-3.5 h-3.5 text-[var(--rouge)]" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
            <span>SOUND: {isSoundOn ? 'ON' : 'OFF'}</span>
          </button>

          <span className="text-gray-600">|</span>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-gray-300 text-xs border-0 focus:ring-0 cursor-pointer font-mono"
          >
            <option value="EUR (€)" className="bg-black text-white">EUR (€)</option>
            <option value="USD ($)" className="bg-black text-white">USD ($)</option>
            <option value="GBP (£)" className="bg-black text-white">GBP (£)</option>
          </select>
        </div>

        <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Accord Info & Olfactory Notes */}
          <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 transition-all duration-400 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <span className="type-micro text-[var(--rouge)] font-bold tracking-widest uppercase">
              {activeAccord.number}
            </span>

            <h1 className="type-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-none text-white">
              {activeAccord.name}
            </h1>

            <p className="type-echo text-xl text-gray-300 italic">
              {activeAccord.frenchEcho}
            </p>

            <p className="type-body text-gray-300 text-sm md:text-base leading-relaxed max-w-lg">
              {activeAccord.description}
            </p>

            {/* Olfactory Pyramid Breakdown */}
            <div className="space-y-3 pt-4 border-t border-[rgba(255,255,255,0.12)]">
              <div className="flex items-start gap-4">
                <span className="type-micro text-gray-400 w-24 shrink-0 font-bold">Tête · Top</span>
                <span className="type-body text-sm font-semibold text-white">{activeAccord.topNote}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="type-micro text-gray-400 w-24 shrink-0 font-bold">Cœur · Heart</span>
                <span className="type-body text-sm font-semibold text-white">{activeAccord.heartNote}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="type-micro text-gray-400 w-24 shrink-0 font-bold">Fond · Base</span>
                <span className="type-body text-sm font-semibold text-white">{activeAccord.baseNote}</span>
              </div>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                {activeAccord.price} €
              </span>
              <span className="text-lg text-gray-400 line-through font-mono">
                {activeAccord.originalPrice} €
              </span>
              <span className="px-2.5 py-1 bg-emerald-500 text-black text-xs font-bold font-mono tracking-wider uppercase">
                {activeAccord.discount}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => addToCart(activeAccord.product, '50ml')}
                className="flex-1 py-4 px-6 bg-[var(--rouge)] text-white font-bold type-btn tracking-widest hover:bg-red-700 transition-all shadow-2xl flex items-center justify-center gap-3 cursor-pointer uppercase text-sm"
              >
                <span>ACQUIRE — {activeAccord.name}</span>
              </button>

              <button
                onClick={() => addToCart(activeAccord.product, '50ml')}
                className="p-4 border border-[rgba(255,255,255,0.2)] bg-black/40 hover:bg-black/80 hover:border-white transition-all text-white cursor-pointer"
                title="Quick Add Flacon"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Definition Product Bottle Image Showcase */}
          <div className="lg:col-span-6 h-[460px] md:h-[560px] relative flex items-center justify-center">
            <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <Image
                src={activeAccord.imageSrc}
                alt={activeAccord.name}
                width={380}
                height={520}
                priority
                className="object-contain max-h-[90%] w-auto transition-all duration-500 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] hover:scale-105"
              />
            </div>
          </div>

        </div>
      </main>

      {/* Fixed Bottom Accord Dock Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#070B1A]/90 backdrop-blur-xl border border-[rgba(255,255,255,0.15)] shadow-2xl flex items-center gap-1 p-1.5 max-w-[92vw] overflow-x-auto">
        {ACCORDS_STAGE.map((accord, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={accord.id}
              onClick={() => handleTabChange(index)}
              className={`px-4 md:px-6 py-3 type-micro text-xs font-bold uppercase transition-all whitespace-nowrap relative cursor-pointer ${
                isActive
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{`0${index + 1}. ${accord.name}`}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--rouge)] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
