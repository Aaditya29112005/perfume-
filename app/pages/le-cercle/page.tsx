'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { PrimaryButton } from '@/components/Buttons';
import { GhostWordmark } from '@/components/GhostWordmark';
import { ShieldCheck, Key, Gift, Compass } from 'lucide-react';

export default function LeCerclePage() {
  const [submitted, setSubmitted] = useState(false);

  const perks = [
    {
      icon: Key,
      title: 'PRIVATE ALLOCATIONS',
      desc: 'Guaranteed access to rare 50-year vintage harvest releases distilled in single batch copper alembics.',
    },
    {
      icon: Compass,
      title: 'ATELIER INVITATIONS',
      desc: 'Annual private invitations to our Grasse flower harvesting estates in May and September.',
    },
    {
      icon: Gift,
      title: 'BESPOKE COMPLIMENTS',
      desc: 'Personalized unreleased trial accords delivered to your residence preceding global launches.',
    },
    {
      icon: ShieldCheck,
      title: 'CONCIERGE DEDICATED',
      desc: 'Direct line to our senior fragrance master for bespoke olfactory consultations and gift curation.',
    },
  ];

  return (
    <div className="w-full min-h-screen pt-32 pb-24 bg-[var(--noir)] text-[var(--blanc-pur)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <SectionHeader
          eyebrow="MEMBRES PRIVILÉGIÉS"
          title="LE CERCLE — INNER CIRCLE"
          frenchEcho="L'accès exclusif aux trésors de la maison."
          theme="dark"
        />

        {/* Hero Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-8 border border-[rgba(255,255,255,0.15)] bg-white/5 flex flex-col justify-between h-72"
              >
                <div>
                  <Icon className="w-8 h-8 text-[var(--rouge)] mb-6" />
                  <h4 className="type-product text-lg font-bold">{perk.title}</h4>
                </div>
                <p className="type-body text-xs text-gray-300 mt-4">{perk.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Ghost Wordmark */}
        <GhostWordmark text="LE CERCLE" />

        {/* Membership Application Form */}
        <div className="max-w-2xl mx-auto my-20 p-10 border border-[rgba(255,255,255,0.15)] bg-[var(--bleu-midnight)]">
          <h3 className="type-section text-2xl text-center mb-2">APPLY FOR ADMISSION</h3>
          <span className="type-echo text-lg text-[var(--rouge)] block text-center mb-8">
            *Candidature sur sélection.*
          </span>

          {submitted ? (
            <div className="text-center py-8">
              <span className="type-echo text-2xl text-[var(--rouge)] block">
                *Votre demande a été enregistrée.*
              </span>
              <p className="type-body text-xs text-gray-300 mt-2">
                Our concierge will contact you via private message within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="type-micro text-gray-400">FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="JEAN DUPONT"
                  className="bg-[var(--noir)] text-white text-xs p-4 border border-[rgba(255,255,255,0.2)] focus:border-[var(--rouge)] outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="type-micro text-gray-400">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="JEAN@DOMAIN.COM"
                  className="bg-[var(--noir)] text-white text-xs p-4 border border-[rgba(255,255,255,0.2)] focus:border-[var(--rouge)] outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="type-micro text-gray-400">PREFERRED FRAGRANCE ACCORD</label>
                <select className="bg-[var(--noir)] text-white text-xs p-4 border border-[rgba(255,255,255,0.2)] focus:border-[var(--rouge)] outline-none">
                  <option>OUD ROUGE (SAFFRON · ROSE · OUD)</option>
                  <option>PRIVÉ NUIT (IRIS · SPICE · CEDAR)</option>
                  <option>HÉRITAGE D'OUD (OUD · LEATHER · INCENSE)</option>
                  <option>ON A DATE (WARM · AMBER · MUSK)</option>
                  <option>TOBACCO & WHISKEY (TOBACCO · WHISKEY · VANILLA)</option>
                </select>
              </div>

              <PrimaryButton type="submit" className="w-full py-4 mt-4">
                SUBMIT ADMISSION APPLICATION
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
