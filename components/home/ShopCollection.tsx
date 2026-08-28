'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initGSAP } from '@/lib/gsap';
import { PRODUCTS } from '@/lib/products';
import { GhostButton, MagneticButton } from '@/components/Buttons';
import { useAppStore } from '@/lib/store';

export const ShopCollection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { label: 'ALL ACCORDS (12)', value: 'ALL' },
    { label: 'WOODY & OUD', value: 'boise' },
    { label: 'ORIENTAL SPICE', value: 'oriental' },
    { label: 'FRESH FLORAL', value: 'frais' },
    { label: 'GOURMAND', value: 'gourmand' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'ALL') return true;
    return p.category === activeCategory;
  });

  useEffect(() => {
    const gsap = initGSAP();
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shop-item',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'frasmetics',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div
      ref={containerRef}
      className="w-full py-28 bg-[var(--blanc-ivory)] text-[var(--noir)] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="type-eyebrow">LA COLLECTION BOUTIQUE</span>
            <h2 className="type-section text-[var(--noir)] mt-2">SHOP ALL 12 SIGNATURE ACCORDS</h2>
            <span className="type-echo text-lg text-[var(--rouge)]">*Douze créations d&apos;exception.*</span>
          </div>

          <Link href="/collections/all">
            <GhostButton className="text-[var(--noir)] border-[var(--noir)] hover:bg-[var(--noir)] hover:text-white">
              VIEW FULL GALLERY
            </GhostButton>
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 pb-6 mb-12 border-b border-[rgba(7,11,24,0.15)]">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 type-micro tracking-widest uppercase transition-colors cursor-pointer border ${
                activeCategory === cat.value
                  ? 'bg-[var(--noir)] text-white border-[var(--noir)]'
                  : 'bg-transparent text-[var(--noir)] border-[rgba(7,11,24,0.2)] hover:border-[var(--noir)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 12 Product Grid with Hairline Dividers & Clean Bounded Heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[rgba(7,11,24,0.15)]">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="shop-item group relative p-6 md:p-8 flex flex-col justify-between border-b border-[rgba(7,11,24,0.15)] md:border-r hover:bg-white/70 transition-colors duration-300 min-h-[500px] overflow-hidden"
            >
              {/* Top Header info */}
              <div className="flex justify-between items-center mb-4">
                <span className="type-micro text-gray-500">{product.number}</span>
                <span className="type-micro text-[var(--rouge)] font-bold">€{product.price50ml} / 50ml</span>
              </div>

              {/* Image Container with Crossfade Swap on Hover */}
              <Link href={`/products/${product.handle}`} className="relative w-full h-56 my-2 flex items-center justify-center">
                {/* Primary Image */}
                <Image
                  src={product.bottleImage50ml}
                  alt={product.name}
                  width={180}
                  height={240}
                  className="object-contain max-h-full transition-opacity duration-400 opacity-100 group-hover:opacity-0"
                />
                {/* Second Scene Image Swaps on Hover */}
                <Image
                  src={product.bgImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                />
              </Link>

              {/* Product Details & Actions */}
              <div className="mt-4 pt-4 border-t border-[rgba(7,11,24,0.15)] flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold tracking-widest text-[var(--noir)] uppercase leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="type-echo text-sm text-[var(--rouge)] block font-normal mt-0.5">
                    *{product.frenchEcho}*
                  </span>
                  <p className="type-micro text-[var(--rouge)] mt-1 font-bold">{product.descriptor}</p>
                  <p className="type-body text-xs text-gray-600 my-2 line-clamp-2">
                    {product.notes.top} · {product.notes.heart} · {product.notes.base}
                  </p>
                </div>

                {/* Magnetic Acquire Button */}
                <div className="mt-4 pt-2">
                  <MagneticButton onClick={() => addToCart(product, '50ml')}>
                    <span className="w-full py-3 bg-[var(--noir)] text-white text-xs font-bold tracking-[0.2em] uppercase inline-block text-center hover:bg-[var(--rouge)] transition-colors cursor-pointer">
                      ACQUIRE · €{product.price50ml}
                    </span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
