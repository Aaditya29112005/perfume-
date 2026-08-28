'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';

let registered = false;

export function initGSAP() {
  if (typeof window === 'undefined' || registered) return gsap;

  gsap.registerPlugin(ScrollTrigger, Observer, Flip, CustomEase);

  // Register signature frasmetics ease curve
  CustomEase.create('frasmetics', '0.22, 1, 0.36, 1');

  // Set default ease & duration
  gsap.defaults({
    ease: 'frasmetics',
    duration: 1.1,
  });

  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger, Observer, Flip, CustomEase };
