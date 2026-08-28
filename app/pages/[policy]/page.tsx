'use client';

import React, { use } from 'react';
import { SectionHeader } from '@/components/SectionHeader';

export default function PolicyPage({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = use(params);

  const getPolicyContent = () => {
    switch (policy) {
      case 'privacy-policy':
        return {
          title: 'PRIVACY POLICY',
          echo: 'Protection des données personnelles.',
          content: [
            'FRASMETICS PARIS values your privacy. We collect personal information solely to process orders, facilitate white-glove courier shipping, and deliver Le Cercle privileges.',
            'We do not sell, rent, or lease customer data to third parties. All online payments are encrypted via AES-256 SSL protocols.',
            'You retain full rights under European Union GDPR to inspect, modify, or request deletion of your personal records at any time by contacting privacy@frasmetics.com.',
          ],
        };
      case 'terms-of-service':
        return {
          title: 'TERMS & CONDITIONS',
          echo: 'Conditions générales de vente.',
          content: [
            'All products offered on FRASMETICS PARIS are subject to availability. Prices are stated in Euros (€) inclusive of applicable taxes.',
            'Orders placed before 14:00 CET are dispatched same-day via express insured courier.',
            'FRASMETICS reserves the right to cancel orders suspected of fraudulent activity or unauthorized reselling.',
          ],
        };
      case 'shipping-returns':
        return {
          title: 'SHIPPING & RETURNS',
          echo: 'Livraison et retours offerts.',
          content: [
            'We offer complimentary express shipping on all orders across Europe, the United Kingdom, North America, and Select Asian territories.',
            'Due to the hygienic and intimate nature of niche fragrance products, unsealed bottles cannot be accepted for return. However, every order includes a complimentary 2ml sample vial so you may test the scent on skin before breaking the security seal on the main 50ml or 100ml flacon.',
            'Should you decide not to open the main flacon, return the sealed box within 14 days for a full refund.',
          ],
        };
      case 'impressum':
      default:
        return {
          title: 'IMPRESSUM',
          echo: 'Mentions légales de la maison.',
          content: [
            'FRASMETICS PARIS HAUTE PARFUMERIE SAS',
            '12 Rue de la Paix, 75002 Paris, France',
            'Atelier: Route de Grasse, 06130 Grasse, France',
            'RCS Paris B 890 123 456 · SIRET 890 123 456 00012',
            'Directeur de Publication: François de Frasmetics',
            'Contact: legal@frasmetics.com · +33 (0)4 93 36 00 00',
          ],
        };
    }
  };

  const data = getPolicyContent();

  return (
    <div className="w-full min-h-screen pt-32 pb-24 bg-[var(--blanc-ivory)] text-[var(--noir)]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16">
        <SectionHeader eyebrow="INFORMATIONS LÉGALES" title={data.title} frenchEcho={data.echo} />

        <div className="mt-12 flex flex-col gap-6 p-8 border border-[rgba(7,11,24,0.15)] bg-white">
          {data.content.map((paragraph, idx) => (
            <p key={idx} className="type-body text-sm text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
