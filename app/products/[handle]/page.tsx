'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotePyramid } from '@/components/NotePyramid';
import { PRODUCTS, getProductByHandle, Product } from '@/lib/products';
import { useAppStore } from '@/lib/store';
import { Check, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params?.handle as string;

  const initialProduct = getProductByHandle(handle) || PRODUCTS[0];
  const [product, setProduct] = useState<Product>(initialProduct);
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  const { addToCart } = useAppStore();

  useEffect(() => {
    const found = getProductByHandle(handle);
    if (found) setProduct(found);
  }, [handle]);

  const switchProduct = (newProd: Product) => {
    if (newProd.id === product.id) return;
    setIsSwitching(true);

    setTimeout(() => {
      setProduct(newProd);
      setIsSwitching(false);
    }, 380);
  };

  const currentPrice = selectedSize === '50ml' ? product.price50ml : product.price100ml;

  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-[var(--noir)] text-[var(--blanc-pur)] selection:bg-[var(--rouge)] selection:text-white">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Breadcrumbs */}
        <div className="type-micro text-gray-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-white transition-colors">
            ACCORDS
          </Link>
          <span>/</span>
          <span className="text-[var(--rouge)] font-bold">{product.name}</span>
        </div>

        {/* PDP Main Stage (2 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: High-Definition Product Image Showcase Stage */}
          <div className="lg:col-span-7 h-[540px] md:h-[620px] bg-black/80 border border-[rgba(255,255,255,0.15)] relative overflow-hidden flex items-center justify-center p-8 shadow-2xl group">
            {/* Ambient Spotlight Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

            {/* High-Definition Bottle Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={product.bottleImage50ml}
                alt={product.name}
                width={360}
                height={500}
                priority
                className={`object-contain max-h-[85%] w-auto transition-all duration-500 drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] group-hover:scale-105 ${
                  isSwitching ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              />
            </div>

            {/* Subtle Bottom Badge Tag */}
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
              <span className="type-micro text-gray-400 font-mono tracking-widest block text-xs">
                HAUTE PARFUMERIE DE GRASSE · 50ML / 1.7 FL. OZ.
              </span>
            </div>
          </div>

          {/* Right Column: PDP Product Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="type-micro text-[var(--rouge)] font-bold tracking-widest">
                  {product.number} · HAUTE PARFUMERIE
                </span>
                <span className="type-micro text-gray-400 font-mono">IN STOCK · GRASSE</span>
              </div>

              <h1 className="type-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {product.name}
              </h1>

              <p className="type-echo text-lg text-[var(--rouge)]">
                *{product.frenchEcho}*
              </p>

              <p className="type-micro text-gray-300 font-bold uppercase tracking-wider">
                {product.descriptor}
              </p>

              <p className="type-body text-gray-300 text-sm leading-relaxed border-t border-b border-[rgba(255,255,255,0.15)] py-4 my-4">
                {product.description}
              </p>

              {/* Price & Size Selector */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-extrabold text-white">€{currentPrice}</span>
                  <span className="type-micro text-gray-400">TAX INCLUDED · FREE EXPRESS SHIPPING</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {(['50ml', '100ml'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full py-3 border text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        selectedSize === size
                          ? 'border-[var(--rouge)] bg-[var(--rouge)] text-white'
                          : 'border-[rgba(255,255,255,0.2)] bg-transparent text-gray-300 hover:border-white'
                      }`}
                    >
                      <span>{size} FLACON</span>
                      <span className="text-[10px] opacity-80">€{size === '50ml' ? product.price50ml : product.price100ml}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Acquire Button */}
              <div className="pt-4">
                <button
                  onClick={() => addToCart(product, selectedSize)}
                  className="w-full py-5 bg-[var(--rouge)] text-white font-bold type-btn tracking-widest hover:bg-red-700 transition-all shadow-2xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>ACQUIRE {product.name} · €{currentPrice}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 type-micro text-gray-400 border-t border-[rgba(255,255,255,0.1)] text-[10px]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--rouge)]" />
                  <span>100% BOTANICAL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[var(--rouge)]" />
                  <span>DISPATCHED 24H</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[var(--rouge)]" />
                  <span>2 FREE SAMPLES</span>
                </div>
              </div>
            </div>

            {/* Note Pyramid Breakdown */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.15)]">
              <h4 className="type-micro text-gray-400 tracking-widest mb-4">OLFACTORY PYRAMID</h4>
              <NotePyramid notes={product.notes} theme="dark" />
            </div>
          </div>
        </div>

        {/* Bottom Rail: Accord Switcher Grid */}
        <div className="mt-28 pt-12 border-t border-[rgba(255,255,255,0.15)]">
          <div className="flex flex-col gap-2 mb-8">
            <span className="type-eyebrow">EXPLORER LES AUTRES SIGNATURES</span>
            <h3 className="type-section text-2xl md:text-3xl">SWITCH ACCORD</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {otherProducts.map((other) => (
              <button
                key={other.id}
                onClick={() => switchProduct(other)}
                className="p-4 border border-[rgba(255,255,255,0.15)] bg-black/40 hover:border-[var(--rouge)] hover:bg-black/80 transition-all text-left flex flex-col justify-between h-56 cursor-pointer group rounded-none"
              >
                <div className="relative w-full h-28 my-1 flex items-center justify-center">
                  <Image
                    src={other.bottleImage50ml}
                    alt={other.name}
                    width={100}
                    height={130}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="type-micro text-gray-500 block text-[10px]">ACCORD</span>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider truncate group-hover:text-[var(--rouge)] transition-colors mt-0.5">
                    {other.name}
                  </h4>
                  <span className="type-micro text-[var(--rouge)] font-bold block mt-1">€{other.price50ml}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
