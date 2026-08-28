import React from 'react';
import { HeroObserver } from '@/components/home/HeroObserver';
import { GhostWordmark } from '@/components/GhostWordmark';
import { AccordsGallery } from '@/components/home/AccordsGallery';
import { StatementSection } from '@/components/home/StatementSection';
import { PairDisc } from '@/components/PairDisc';
import { BentoGallerySection } from '@/components/home/BentoGallerySection';
import { ShopCollection } from '@/components/home/ShopCollection';
import { LaMaisonTeaser } from '@/components/home/LaMaisonTeaser';
import { LeCercleNewsletter } from '@/components/home/LeCercleNewsletter';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 6.2 Hero Observer Vertical Slide Deck */}
      <HeroObserver />

      {/* 6.3 Ghost Wordmark Divider */}
      <GhostWordmark text="FRASMETICS" />

      {/* 6.4 The Five Accords Horizontal Gallery */}
      <AccordsGallery />

      {/* 6.5 Statement Section */}
      <StatementSection />

      {/* 6.6 The Palette Moment Pair Device */}
      <PairDisc />

      {/* GSAP Flip + ScrollTrigger Bento Gallery */}
      <BentoGallerySection />

      {/* 6.7 Shop The Collection */}
      <ShopCollection />

      {/* 6.8 La Maison Teaser */}
      <LaMaisonTeaser />

      {/* 6.9 Le Cercle Newsletter */}
      <LeCercleNewsletter />
    </div>
  );
}
