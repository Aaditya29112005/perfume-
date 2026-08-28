'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/lib/products';
import { SectionHeader } from '@/components/SectionHeader';
import { GhostButton, PrimaryButton } from '@/components/Buttons';
import { NotePyramid } from '@/components/NotePyramid';
import { useAppStore } from '@/lib/store';

export default function CollectionPage() {
  const [selectedFamily, setSelectedFamily] = useState<string>('ALL');
  const { addToCart } = useAppStore();

  const families = ['ALL', 'OUD', 'AMBER', 'SPICE', 'FLORAL'];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFamily === 'ALL') return true;
    if (selectedFamily === 'OUD') return p.descriptor.includes('OUD');
    if (selectedFamily === 'AMBER') return p.descriptor.includes('AMBER') || p.descriptor.includes('MUSK');
    if (selectedFamily === 'SPICE') return p.descriptor.includes('SPICE') || p.descriptor.includes('SAFFRON') || p.descriptor.includes('WHISKEY');
    if (selectedFamily === 'FLORAL') return p.descriptor.includes('ROSE') || p.descriptor.includes('IRIS');
    return true;
  });

  return (
    <div className="w-full min-h-screen pt-32 pb-24 bg-[var(--blanc-ivory)] text-[var(--noir)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            eyebrow="LA COLLECTION COMPLÈTE"
            title="THE TWELVE ACCORDS COLLECTION"
            frenchEcho="L'alchimie des essences rares."
          />
          <p className="type-body text-sm mt-4 text-gray-700 max-w-2xl">
            Each accord in our catalog is formulated with 100% pure botanical oils in Grasse, aged in dark oak casks, and bottled by hand in numbered glass flacons.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center gap-3 pb-8 mb-12 border-b border-[rgba(7,11,24,0.15)]">
          <span className="type-micro text-gray-500 mr-4">OLFACTORY FAMILY:</span>
          {families.map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedFamily(fam)}
              className={`px-5 py-2 type-micro tracking-widest uppercase transition-colors cursor-pointer border ${
                selectedFamily === fam
                  ? 'bg-[var(--noir)] text-white border-[var(--noir)]'
                  : 'bg-transparent text-[var(--noir)] border-[rgba(7,11,24,0.2)] hover:border-[var(--noir)]'
              }`}
            >
              {fam}
            </button>
          ))}
        </div>

        {/* Product Cards Stack */}
        <div className="flex flex-col gap-16">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 border border-[rgba(7,11,24,0.15)] bg-white/60 hover:bg-white transition-colors duration-300"
            >
              {/* Product Visual (5 cols) */}
              <div
                className="lg:col-span-5 h-[360px] md:h-[420px] relative flex items-center justify-center p-6 border border-[rgba(7,11,24,0.1)] overflow-hidden"
                style={{ backgroundColor: product.sceneGround }}
              >
                <Image
                  src={product.bgImage}
                  alt={product.name}
                  fill
                  className="object-cover opacity-40 blur-[6px]"
                />
                <Image
                  src={product.bottleImage50ml}
                  alt={product.name}
                  width={220}
                  height={280}
                  className="relative z-10 object-contain max-h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Product Specs & Pyramid (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="type-eyebrow">ACCORD 0{idx + 1}</span>
                      <h3 className="type-product text-2xl md:text-3xl font-extrabold mt-1">
                        {product.name}
                      </h3>
                      <span className="type-echo text-lg text-[var(--rouge)] block mt-0.5">
                        *{product.frenchEcho}*
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-2xl font-bold text-[var(--noir)]">€{product.price50ml}</span>
                      <span className="type-micro text-gray-500 block">50ML / 1.7 FL. OZ.</span>
                    </div>
                  </div>

                  <p className="type-micro text-[var(--rouge)] mt-2 font-bold">{product.descriptor}</p>
                  <p className="type-body text-xs md:text-sm text-gray-600 mt-3">
                    {product.description}
                  </p>
                </div>

                {/* Note Pyramid Cells */}
                <NotePyramid notes={product.notes} theme="light" />

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[rgba(7,11,24,0.15)]">
                  <PrimaryButton onClick={() => addToCart(product, '50ml')}>
                    ACQUIRE · €{product.price50ml}
                  </PrimaryButton>
                  <Link href={`/products/${product.handle}`}>
                    <GhostButton className="text-[var(--noir)] border-[var(--noir)] hover:bg-[var(--noir)] hover:text-white">
                      DISCOVER PARFUM
                    </GhostButton>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
