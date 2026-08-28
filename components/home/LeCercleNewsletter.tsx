'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const LeCercleNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="relative w-full py-32 bg-[var(--noir)] text-[var(--blanc-pur)] overflow-hidden border-t border-[rgba(255,255,255,0.1)]">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-5 type-ghost text-center">
        LE CERCLE
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center flex flex-col items-center gap-6">
        <span className="type-eyebrow">PRIVILEGES EXCLUSIFS</span>
        <h2 className="type-section text-3xl md:text-5xl font-extrabold tracking-wider">
          THE ONE AND ONLY
        </h2>
        <p className="type-body text-xs md:text-sm text-gray-300">
          Subscribe to Le Cercle for private vintage allocations, intimate Grasse harvest invitations, and complimentary bespoke discovery vials.
        </p>

        {/* Input Form or Success State */}
        <div className="w-full max-w-md mt-6">
          {isSubmitted ? (
            <div className="py-6 text-center animate-fade-in">
              <span className="type-echo text-3xl text-[var(--rouge)] block">
                *Bienvenue dans Le Cercle.*
              </span>
              <p className="type-micro text-gray-400 mt-2">
                YOUR INVITATION HAS BEEN DISPATCHED TO YOUR INBOX.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative w-full flex items-center">
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent text-[var(--blanc-pur)] text-sm tracking-widest uppercase py-3 pr-12 border-0 outline-none focus:ring-0 placeholder:text-gray-600 placeholder:text-xs"
                />

                <button
                  type="submit"
                  className="absolute right-0 text-[var(--rouge)] hover:text-white transition-colors p-2 cursor-pointer bg-transparent border-0"
                  aria-label="Submit Email Subscription"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Animated Hairline: ink-40 to rouge on focus */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[rgba(255,255,255,0.4)]">
                  <div
                    className={`h-full bg-[var(--rouge)] transition-transform duration-500 origin-left ${
                      isFocused ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
