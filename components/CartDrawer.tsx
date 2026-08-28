'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    selectedSample,
    setSelectedSample,
  } = useAppStore();

  const subtotal = cart.reduce((acc, item) => {
    const p = item.size === '100ml' ? item.product.price100ml : item.product.price50ml;
    return acc + p * item.quantity;
  }, 0);

  const sampleOptions = [
    'Discovery Sample: Oud Rouge (2ml)',
    'Discovery Sample: Privé Nuit (2ml)',
    'Discovery Sample: Héritage d\'Oud (2ml)',
    'Discovery Sample: On A Date (2ml)',
    'Discovery Sample: Tobacco & Whiskey (2ml)',
  ];

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Noir 60% Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#070B18]/80 backdrop-blur-sm transition-opacity duration-500"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-[var(--noir)] text-[var(--blanc-pur)] h-full flex flex-col justify-between p-8 border-l border-[rgba(255,255,255,0.15)] shadow-2xl z-10 overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="flex justify-between items-center pb-6 border-b border-[rgba(255,255,255,0.15)]">
            <div className="flex items-center gap-3">
              <span className="type-eyebrow">MON PANIER</span>
              <h3 className="type-product text-xl">YOUR CART</h3>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-[var(--rouge)] transition-colors cursor-pointer bg-transparent border-0"
              aria-label="Close Cart Drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Item List */}
          {cart.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <span className="type-echo text-2xl text-[var(--rouge)]">*Votre panier est vide.*</span>
              <p className="type-body text-xs text-gray-400">
                Your cart is currently empty. Explore our signature accords to select your fragrance.
              </p>
              <button
                onClick={closeCart}
                className="mt-4 px-8 py-3 bg-[var(--rouge)] text-white type-micro hover:bg-[#a60b24] transition-colors"
              >
                DISCOVER ACCORDS
              </button>
            </div>
          ) : (
            <div className="py-6 flex flex-col gap-6">
              {cart.map((item, idx) => {
                const itemPrice =
                  item.size === '100ml' ? item.product.price100ml : item.product.price50ml;

                return (
                  <div
                    key={`${item.product.id}-${item.size}-${idx}`}
                    className="flex gap-4 p-4 border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]"
                  >
                    {/* Bottle Image */}
                    <div className="relative w-20 h-24 bg-black/40 flex items-center justify-center p-2 border border-[rgba(255,255,255,0.05)]">
                      <Image
                        src={item.product.bottleImage50ml}
                        alt={item.product.name}
                        width={64}
                        height={80}
                        className="object-contain max-h-full"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="type-product text-lg font-bold">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-gray-500 hover:text-[var(--rouge)] transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="type-micro text-[var(--rouge)] mt-0.5">
                          {item.product.descriptor}
                        </p>
                        <p className="type-micro text-gray-400 mt-1">SIZE: {item.size}</p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-[rgba(255,255,255,0.1)]">
                        <div className="flex items-center border border-[rgba(255,255,255,0.2)]">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity - 1)
                            }
                            className="p-1.5 text-gray-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-mono text-xs">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity + 1)
                            }
                            className="p-1.5 text-gray-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm text-[var(--blanc-pur)] font-bold">
                          €{itemPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Complimentary Sample Selection */}
              <div className="p-4 border border-[rgba(255,255,255,0.15)] bg-[var(--bleu-midnight)]/50">
                <span className="type-micro text-[var(--rouge)] block mb-1">COMPLIMENTARY GIFT</span>
                <p className="type-body text-xs text-gray-300 mb-3">
                  Select your complimentary 2ml haute discovery vial with this order:
                </p>
                <select
                  value={selectedSample}
                  onChange={(e) => setSelectedSample(e.target.value)}
                  className="w-full bg-[var(--noir)] text-xs text-[var(--blanc-pur)] p-2.5 border border-[rgba(255,255,255,0.2)] focus:border-[var(--rouge)] focus:outline-none"
                >
                  {sampleOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Subtotal & Checkout Button */}
        {cart.length > 0 && (
          <div className="pt-6 border-t border-[rgba(255,255,255,0.15)] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="type-micro text-gray-400">SUBTOTAL (TAX INC.)</span>
              <span className="font-mono text-2xl font-bold text-[var(--blanc-pur)]">
                €{subtotal}
              </span>
            </div>
            <p className="type-micro text-gray-400 text-center">
              EXPRESS COMPLIMENTARY SHIPPING APPLIED AT CHECKOUT
            </p>

            <button
              onClick={() => {
                alert('Redirecting to Shopify Headless Secure Checkout...');
              }}
              className="w-full py-4 bg-[var(--rouge)] text-white font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 hover:bg-[#a60b24] transition-colors cursor-pointer"
            >
              <span>PROCEED TO ACQUIRE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
