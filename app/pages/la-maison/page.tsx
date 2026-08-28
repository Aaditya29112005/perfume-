import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/SectionHeader';
import { GhostButton } from '@/components/Buttons';
import { GhostWordmark } from '@/components/GhostWordmark';

export default function LaMaisonPage() {
  const materials = [
    { name: 'PERSIAN SAFFRON THREADS', location: 'Isfahan, Iran', note: 'Hand-picked red stigmas yielding rich spicy warmth.' },
    { name: 'ASSAM AGARWOOD (OUD)', location: 'Assam, India', note: 'Aged 25 years for deep resinous leather facets.' },
    { name: 'MAY ROSE ABSOLUTE', location: 'Grasse, France', note: 'Harvested strictly at dawn in May for crisp floral clarity.' },
    { name: 'FLORENTINE IRIS BUTTER', location: 'Tuscany, Italy', note: 'Aged for 3 years to extract powdered violet elegance.' },
  ];

  return (
    <div className="w-full min-h-screen pt-32 pb-24 bg-[var(--noir)] text-[var(--blanc-pur)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-16">
          <SectionHeader
            eyebrow="NOTRE HÉRITAGE"
            title="LA MAISON FRASMETICS"
            frenchEcho="L'excellence de la haute parfumerie."
            theme="dark"
          />
        </div>

        {/* Hero Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative h-[500px] border border-[rgba(255,255,255,0.15)] overflow-hidden bg-black/40">
            <Image
              src="/heritage_oud.jpg"
              alt="Frasmetics Atelier Grasse"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="type-product text-3xl font-extrabold">
              ARCHITECTURAL FORMULATION FROM GRASSE
            </h3>
            <p className="type-body text-sm text-gray-300">
              Founded in Grasse, the cradle of French perfumerie, FRASMETICS operates on a singular creative philosophy: absolute uncompromising intent. We reject synthetic fillers and industrial mass-production in favor of micro-batch artisanal distillation.
            </p>
            <p className="type-body text-sm text-gray-300">
              Every accord is matured for twelve months in dark carboy glass vessels housed in our temperature-controlled cellar before hand-filling into geometric glass flacons.
            </p>
          </div>
        </div>

        {/* Ghost Wordmark Divider */}
        <GhostWordmark text="HAUTE PARFUMERIE" />

        {/* Raw Botanical Materials Grid */}
        <div className="my-24 pt-16 border-t border-[rgba(255,255,255,0.15)]">
          <span className="type-eyebrow">MATIÈRES PREMIÈRES</span>
          <h3 className="type-section text-3xl mt-2 mb-12">ETHICAL BOTANICAL SOURCING</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((mat, idx) => (
              <div
                key={idx}
                className="p-6 border border-[rgba(255,255,255,0.15)] bg-white/5 flex flex-col justify-between h-64"
              >
                <div>
                  <span className="type-micro text-[var(--rouge)] font-bold">RAW ESSENCE 0{idx + 1}</span>
                  <h4 className="type-product text-lg font-bold mt-2">{mat.name}</h4>
                  <span className="type-micro text-gray-400 block mt-1">{mat.location}</span>
                </div>
                <p className="type-body text-xs text-gray-300 mt-4">{mat.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-12 border border-[rgba(255,255,255,0.15)] bg-[var(--bleu-midnight)] text-center flex flex-col items-center gap-6">
          <h3 className="type-section text-3xl">EXPLORE OUR SIGNATURE ACCORDS</h3>
          <span className="type-echo text-xl text-[var(--rouge)]">*Un seul geste.*</span>
          <Link href="/collections/all">
            <GhostButton>VIEW ALL FIVE ACCORDS</GhostButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
