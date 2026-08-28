'use client';

import React from 'react';
import { ProductNote } from '@/lib/products';

interface NotePyramidProps {
  notes: ProductNote;
  details?: {
    topDetail: string;
    heartDetail: string;
    baseDetail: string;
  };
  theme?: 'dark' | 'light';
  className?: string;
}

export const NotePyramid: React.FC<NotePyramidProps> = ({
  notes,
  details,
  theme = 'dark',
  className = '',
}) => {
  const borderColor =
    theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(7,11,24,0.15)]';
  const labelColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const valColor = theme === 'dark' ? 'text-[var(--blanc-pur)]' : 'text-[var(--noir)]';

  const items = [
    {
      code: 'TÊTE',
      eng: 'TOP NOTE',
      val: notes.top,
      desc: details?.topDetail,
    },
    {
      code: 'CŒUR',
      eng: 'HEART NOTE',
      val: notes.heart,
      desc: details?.heartDetail,
    },
    {
      code: 'FOND',
      eng: 'BASE NOTE',
      val: notes.base,
      desc: details?.baseDetail,
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 border ${borderColor} rounded-none overflow-hidden ${className}`}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 sm:p-5 flex flex-col justify-between overflow-hidden ${
            idx < 2 ? `border-b sm:border-b-0 sm:border-r ${borderColor}` : ''
          }`}
        >
          <div className="space-y-1.5">
            <div className={`type-micro text-[10px] md:text-xs uppercase tracking-widest ${labelColor}`}>
              {item.code} · {item.eng}
            </div>
            <div className={`text-sm sm:text-base font-extrabold uppercase tracking-wider leading-snug break-words ${valColor}`}>
              {item.val}
            </div>
          </div>
          {item.desc && (
            <p className={`type-body text-xs mt-3 leading-relaxed ${labelColor} max-w-none`}>
              {item.desc}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
