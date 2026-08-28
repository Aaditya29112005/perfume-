'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useAppStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top Announcement Marquee Ticker - Strictly 1 Single Line (h-8 / 32px) */}
      <div className="w-full h-8 bg-[var(--rouge)] text-[var(--blanc-pur)] overflow-hidden relative border-b border-[rgba(255,255,255,0.15)] flex items-center shrink-0">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer items-center">
          <div className="type-micro flex items-center gap-12 px-6 shrink-0 whitespace-nowrap">
            <span>COMPLIMENTARY DISCOVERY SAMPLES WITH EVERY ORDER</span>
            <span>·</span>
            <span>HAUTE PARFUMERIE DE GRASSE</span>
            <span>·</span>
            <span>FREE EXPRESS SHIPPING ACROSS EUROPE</span>
            <span>·</span>
            <span>LE CERCLE PRIVATE MEMBERS ALLOCATION OPEN</span>
          </div>
          <div className="type-micro flex items-center gap-12 px-6 shrink-0 whitespace-nowrap" aria-hidden="true">
            <span>COMPLIMENTARY DISCOVERY SAMPLES WITH EVERY ORDER</span>
            <span>·</span>
            <span>HAUTE PARFUMERIE DE GRASSE</span>
            <span>·</span>
            <span>FREE EXPRESS SHIPPING ACROSS EUROPE</span>
            <span>·</span>
            <span>LE CERCLE PRIVATE MEMBERS ALLOCATION OPEN</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header - Positioned Flush Below Marquee Ticker */}
      <header
        className={`w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--noir)]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.15)] text-[var(--blanc-pur)] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-[var(--blanc-pur)] py-5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex items-center justify-between">
          {/* Left: Brand Logo Image */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-85 transition-opacity">
            <Image
              src="/logo_white.png"
              alt="FRASMETICS PARIS Logo"
              width={160}
              height={40}
              priority
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* Right Links & Cart */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link
              href="/collections/all"
              className="hidden md:inline type-micro hover:text-[var(--rouge)] transition-colors"
            >
              ACCORDS
            </Link>
            <Link
              href="/five-accords"
              className="hidden md:inline type-micro text-[var(--rouge)] font-bold hover:opacity-85 transition-opacity"
            >
              FIVE ACCORDS
            </Link>
            <Link
              href="/pages/la-maison"
              className="hidden md:inline type-micro hover:text-[var(--rouge)] transition-colors"
            >
              LA MAISON
            </Link>
            <Link
              href="/pages/build-your-coffret"
              className="hidden md:flex items-center gap-1.5 type-micro text-gray-300 hover:text-white transition-colors font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--rouge)]" />
              <span>AI L&apos;ATELIER</span>
            </Link>
            <Link
              href="/pages/le-cercle"
              className="hidden md:inline type-micro text-gray-300 hover:text-white transition-colors"
            >
              LE CERCLE
            </Link>

            {/* Cart Trigger Button */}
            <button
              id="cart-trigger-icon"
              onClick={toggleCart}
              className="relative flex items-center gap-2 type-micro hover:text-[var(--rouge)] transition-colors cursor-pointer bg-transparent border-0"
              aria-label={`Shopping Cart with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>CART ({totalCartCount})</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-current p-1"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--noir)] text-[var(--blanc-pur)] flex flex-col justify-between px-8 py-20 md:hidden">
          <div className="flex justify-between items-center pb-6 border-b border-[rgba(255,255,255,0.15)]">
            <Image
              src="/logo_white.png"
              alt="FRASMETICS PARIS Logo"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </div>

          <nav className="flex flex-col gap-6 type-section text-2xl my-auto">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[var(--rouge)] transition-colors"
            >
              HOMEPAGE
            </Link>
            <Link
              href="/five-accords"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[var(--rouge)] font-extrabold tracking-wider uppercase"
            >
              FIVE ACCORDS STAGE
            </Link>
            <Link
              href="/collections/all"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[var(--rouge)] transition-colors"
            >
              THE TWELVE ACCORDS
            </Link>
            <Link
              href="/pages/la-maison"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[var(--rouge)] transition-colors"
            >
              LA MAISON
            </Link>
            <Link
              href="/pages/build-your-coffret"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 font-bold flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-[var(--rouge)]" />
              <span>AI L&apos;ATELIER</span>
            </Link>
            <Link
              href="/pages/le-cercle"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[var(--rouge)] transition-colors"
            >
              LE CERCLE
            </Link>
          </nav>

          <div className="pt-8 border-t border-[rgba(255,255,255,0.15)] flex justify-between items-center type-micro text-gray-400">
            <span>PARIS · GRASSE</span>
            <span className="type-echo text-sm text-[var(--rouge)]">*Haute Parfumerie AI*</span>
          </div>
        </div>
      )}

      {/* Marquee Animation Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};
