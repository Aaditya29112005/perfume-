'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FlaconViewer3D } from '@/components/FlaconViewer3D';
import { useAppStore } from '@/lib/store';
import { PRODUCTS, Product } from '@/lib/products';
import { Volume2, VolumeX, ShoppingBag, Lock, Sparkles } from 'lucide-react';

interface AccordStageData {
  number: string;
  id: string;
  name: string;
  frenchEcho: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  bgGradient: string;
  accentColor: string;
  imageSrc: string;
  topNote: string;
  heartNote: string;
  baseNote: string;
  product: Product;
}

const ACCORDS_STAGE: AccordStageData[] = [
  {
    number: 'ACCORD #01',
    id: 'heritage-oud',
    name: "HÉRITAGE D'OUD",
    frenchEcho: '"Le rendez-vous parfait."',
    description:
      'Frasmetics crafts niche fragrances at the meeting point of French perfumery tradition and contemporary design.',
    price: 160,
    originalPrice: 220,
    discount: '-27% OFF',
    bgGradient: 'radial-gradient(circle at 65% 50%, #1A284D 0%, #070B1A 90%)',
    accentColor: '#1A284D',
    imageSrc: '/hdo50.png',
    topNote: 'Cambodian Oud',
    heartNote: 'Russian Leather',
    baseNote: 'Patchouli',
    product: PRODUCTS.find((p) => p.id === 'heritage-oud') || PRODUCTS[1],
  },
  {
    number: 'ACCORD #02',
    id: 'oud-rouge',
    name: 'OUD ROUGE',
    frenchEcho: '"L\'incendie écarlate."',
    description:
      'A fiery crimson composition of saffron strands, May Rose, and agarwood resin.',
    price: 175,
    originalPrice: 240,
    discount: '-27% OFF',
    bgGradient: 'radial-gradient(circle at 65% 50%, #4D121A 0%, #0D0507 90%)',
    accentColor: '#4D121A',
    imageSrc: '/or50.png',
    topNote: 'Red Saffron',
    heartNote: 'Damask Rose',
    baseNote: 'Smoked Oud',
    product: PRODUCTS.find((p) => p.id === 'oud-rouge') || PRODUCTS[2],
  },
  {
    number: 'ACCORD #03',
    id: 'prive-nuit',
    name: 'PRIVÉ NUIT',
    frenchEcho: '"Le secret de minuit."',
    description:
      'An enigmatic nocturnal elixir blending dark plum, velvet iris, and smoked amber.',
    price: 165,
    originalPrice: 225,
    discount: '-26% OFF',
    bgGradient: 'radial-gradient(circle at 65% 50%, #2A1542 0%, #090412 90%)',
    accentColor: '#2A1542',
    imageSrc: '/pn50.png',
    topNote: 'Midnight Plum',
    heartNote: 'Velvet Iris',
    baseNote: 'Black Amber',
    product: PRODUCTS.find((p) => p.id === 'prive-nuit') || PRODUCTS[3],
  },
  {
    number: 'ACCORD #04',
    id: 'on-a-date',
    name: 'ON A DATE',
    frenchEcho: '"L\'étincelle romantique."',
    description:
      'An evocative olfactory journey capturing the electric romance of a Paris evening.',
    price: 185,
    originalPrice: 260,
    discount: '-28% OFF',
    bgGradient: 'radial-gradient(circle at 65% 50%, #3D2612 0%, #0F0904 90%)',
    accentColor: '#3D2612',
    imageSrc: '/oad50.png',
    topNote: 'Calabrian Bergamot',
    heartNote: 'Golden Amber Resin',
    baseNote: 'Cashmere Musk',
    product: PRODUCTS.find((p) => p.id === 'on-a-date') || PRODUCTS[0],
  },
  {
    number: 'ACCORD #05',
    id: 'tobacco-whiskey',
    name: 'TOBACCO & WHISKEY',
    frenchEcho: '"Le club privé parisien."',
    description:
      'Barrel-aged bourbon liquor infused with cured Havana tobacco and Madagascar vanilla bean.',
    price: 170,
    originalPrice: 230,
    discount: '-26% OFF',
    bgGradient: 'radial-gradient(circle at 65% 50%, #321B0F 0%, #0D0704 90%)',
    accentColor: '#321B0F',
    imageSrc: '/tw50.png',
    topNote: 'Blonde Tobacco',
    heartNote: 'Aged Whiskey',
    baseNote: 'Bourbon Vanilla',
    product: PRODUCTS.find((p) => p.id === 'tobacco-whiskey') || PRODUCTS[4] || PRODUCTS[0],
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
      {/* Top Header */}
      <Navbar />

      {/* Auxiliary Top Bar Sub-Menu (Matching Video Top Header Controls) */}
      <div className="fixed top-[64px] left-0 right-0 z-40 bg-black/40 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] py-2 px-6 md:px-16 flex items-center justify-between text-xs type-micro">
        <div className="flex items-center gap-6 text-gray-400 overflow-x-auto">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <Link href="/collections/all" className="hover:text-white transition-colors">COLLECTION</Link>
          <span className="text-[var(--rouge)] font-bold border-b border-[var(--rouge)] pb-0.5">FIVE ACCORDS</span>
          <Link href="/pages/build-your-coffret" className="hover:text-white transition-colors">STUDIO</Link>
          <Link href="/pages/la-maison" className="hover:text-white transition-colors">PYRAMID</Link>
          <Link href="/pages/le-cercle" className="hover:text-white transition-colors font-bold text-[var(--rouge)]">LE CERCLE</Link>
        </div>

        <div className="flex items-center gap-4 text-gray-300">
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
      </div>

      {/* Main Interactive Stage with Dynamic Backdrop Radial Gradient */}
      <main
        className="flex-1 pt-32 pb-36 px-6 md:px-16 flex items-center justify-center relative transition-all duration-700 ease-out min-h-[90vh]"
        style={{ background: activeAccord.bgGradient }}
      >
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

          {/* Right Column: 3D Interactive Bottle Flacon */}
          <div className="lg:col-span-6 h-[460px] md:h-[560px] relative flex items-center justify-center">
            <div className={`w-full h-full transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <FlaconViewer3D
                imageSrc={activeAccord.imageSrc}
                altText={activeAccord.name}
              />
            </div>
          </div>

        </div>
      </main>

      {/* Fixed Bottom Accord Dock Bar (Exact Section 04 Prototype Dock from Video) */}
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

      <Footer />
    </div>
  );
}
