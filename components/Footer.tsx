import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[var(--bleu-midnight)] text-[var(--blanc-pur)] pt-24 pb-12 overflow-hidden border-t border-[rgba(255,255,255,0.1)]">
      {/* Ghost Wordmark background watermark */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 select-none pointer-events-none opacity-5 type-ghost text-center whitespace-nowrap">
        FRASMETICS PARIS
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-[rgba(255,255,255,0.15)] mb-16 gap-8">
          <div>
            <span className="type-eyebrow">HAUTE PARFUMERIE</span>
            <div className="mt-3 mb-2">
              <Image
                src="/logo_white.png"
                alt="FRASMETICS PARIS Logo"
                width={200}
                height={50}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            <p className="type-echo text-lg mt-1 text-[var(--rouge)]">
              *L&apos;art de la haute parfumerie française.*
            </p>
          </div>
          <div className="text-right">
            <div className="type-micro text-gray-400">MAISON FONDEE A GRASSE</div>
            <div className="type-body text-xs text-gray-300">PARIS · LONDON · NEW YORK · TOKYO</div>
          </div>
        </div>

        {/* Four Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[rgba(255,255,255,0.15)]">
          {/* Col 1: Fragrances */}
          <div className="flex flex-col gap-4">
            <h4 className="type-micro text-[var(--rouge)] font-bold tracking-widest">FRAGRANCES</h4>
            <ul className="flex flex-col gap-2 type-micro text-gray-300">
              <li><Link href="/products/on-a-date" className="hover:text-[var(--rouge)] transition-colors">ON A DATE</Link></li>
              <li><Link href="/products/oud-rouge" className="hover:text-[var(--rouge)] transition-colors">OUD ROUGE</Link></li>
              <li><Link href="/products/prive-nuit" className="hover:text-[var(--rouge)] transition-colors">PRIVÉ NUIT</Link></li>
              <li><Link href="/products/heritage-d-oud" className="hover:text-[var(--rouge)] transition-colors">HÉRITAGE D&apos;OUD</Link></li>
              <li><Link href="/products/tobacco-whiskey" className="hover:text-[var(--rouge)] transition-colors">TOBACCO & WHISKEY</Link></li>
              <li><Link href="/collections/all" className="hover:text-[var(--rouge)] transition-colors mt-2 underline">SEE ALL ACCORDS</Link></li>
            </ul>
          </div>

          {/* Col 2: La Maison */}
          <div className="flex flex-col gap-4">
            <h4 className="type-micro text-[var(--rouge)] font-bold tracking-widest">LA MAISON</h4>
            <ul className="flex flex-col gap-2 type-micro text-gray-300">
              <li><Link href="/pages/la-maison" className="hover:text-[var(--rouge)] transition-colors">OUR HERITAGE</Link></li>
              <li><Link href="/pages/build-your-coffret" className="hover:text-[var(--rouge)] transition-colors">COFFRET BUILDER</Link></li>
              <li><Link href="/pages/le-cercle" className="hover:text-[var(--rouge)] transition-colors">LE CERCLE</Link></li>
              <li><Link href="/styleguide" className="hover:text-[var(--rouge)] transition-colors">DESIGN SYSTEM</Link></li>
            </ul>
          </div>

          {/* Col 3: Politique */}
          <div className="flex flex-col gap-4">
            <h4 className="type-micro text-[var(--rouge)] font-bold tracking-widest">POLITIQUE</h4>
            <ul className="flex flex-col gap-2 type-micro text-gray-300">
              <li><Link href="/pages/privacy-policy" className="hover:text-[var(--rouge)] transition-colors">PRIVACY POLICY</Link></li>
              <li><Link href="/pages/terms-of-service" className="hover:text-[var(--rouge)] transition-colors">TERMS & CONDITIONS</Link></li>
              <li><Link href="/pages/shipping-returns" className="hover:text-[var(--rouge)] transition-colors">SHIPPING & RETURNS</Link></li>
              <li><Link href="/pages/impressum" className="hover:text-[var(--rouge)] transition-colors">IMPRESSUM</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Row */}
          <div className="flex flex-col gap-4">
            <h4 className="type-micro text-[var(--rouge)] font-bold tracking-widest">CONTACT & CONCIERGE</h4>
            <div className="flex flex-col gap-2">
              <span className="type-micro text-gray-400">DIRECT INQUIRIES</span>
              <span className="type-body text-xs text-[var(--blanc-pur)]">concierge@frasmetics.com</span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <span className="type-micro text-gray-400">ATELIER GRASSE</span>
              <span className="type-body text-xs text-[var(--blanc-pur)]">+33 (0)4 93 36 00 00</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center type-micro text-gray-400 gap-4">
          <div>© {new Date().getFullYear()} FRASMETICS PARIS. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>UNISEX IN SPIRIT. ABSOLUTE IN INTENT.</span>
          </div>
        </div>
      </div>

      {/* Tricolore Bottom Edge Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 tricolore-bar" />
    </footer>
  );
};
