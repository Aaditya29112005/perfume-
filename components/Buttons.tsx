'use client';

import React, { useRef } from 'react';
import { initGSAP } from '@/lib/gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 bg-[var(--rouge)] text-[var(--blanc-pur)] font-bold text-xs tracking-[0.25em] uppercase border-0 transition-colors duration-300 hover:bg-[#a60b24] focus:outline-none focus:ring-2 focus:ring-[var(--rouge)] focus:ring-offset-2 cursor-pointer ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const GhostButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-current font-bold text-xs tracking-[0.25em] uppercase border border-[rgba(255,255,255,0.4)] hover:border-[var(--rouge)] hover:text-[var(--rouge)] transition-all duration-300 focus:outline-none cursor-pointer ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const gsap = initGSAP();
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btnRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    const gsap = initGSAP();
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {children}
    </button>
  );
};
