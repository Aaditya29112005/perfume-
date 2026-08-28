# FRASMETICS PARIS — Luxury French Niche Fragrance House

Studio-of-the-Year Awwwards caliber e-commerce platform built with Next.js 15, App Router, TypeScript, Tailwind CSS v4, GSAP 3 Master Motion Suite, and Zustand.

---

## 1. DESIGN TOKENS & CANONICAL DEFINITIONS

All design system tokens are declared once in `app/globals.css` as CSS Custom Properties:

```css
:root {
  --bleu-midnight: #0F1B3D;
  --bleu-royal:    #1A3AA8;
  --blanc-ivory:   #F4F1E8;
  --blanc-pur:     #FFFFFF;
  --rouge:         #C8102E;
  --noir:          #070B18;
}
```

### Strict System Constraints:
1. **Zero Rounded Corners:** `border-radius: 0 !important` enforced across all buttons, containers, cards, and inputs.
2. **Rouge Restraint:** `--rouge` (`#C8102E`) is strictly reserved for active states, eyebrows, and primary CTAs (< 5% total screen coverage).
3. **Eyebrows:** Every eyebrow is lowercase/caps 10px tracking `.30em`, preceded by a 32px rouge rule (`h-px w-8 bg-[var(--rouge)]`).
4. **Tricolore Sequence:** Always Bleu, Blanc, Rouge (`.tricolore-bar`).

---

## 2. MOTION ARCHITECTURE (GSAP 3)

The motion engine resides in `lib/gsap.ts`. Registered plugins include `ScrollTrigger`, `Observer`, `Flip`, and `CustomEase`.

### Signature Curve:
```ts
CustomEase.create("frasmetics", "0.22, 1, 0.36, 1");
```

### Motion Rules:
- **Hero Observer:** Vertical slide deck between the 5 accords on wheel, touch, and arrow keys (`components/home/HeroObserver.tsx`).
- **Horizontal Accords Gallery:** Desktop pinned horizontal scroll scrub (`components/home/AccordsGallery.tsx`).
- **Half-Disc Pair Device:** Scroll-driven -90° to 0° rotation on flat axis (`components/PairDisc.tsx`).
- **Product Switching:** 380ms out / 460ms in smooth crossfade transition on PDP (`app/products/[handle]/page.tsx`).
- **Magnetic Buttons:** Pointer mapping at `0.35` strength with elastic return (`components/Buttons.tsx`).

---

## 3. HOW TO ADD A SIXTH ACCORD

To add a 6th fragrance accord to the catalog:

1. Add the product image assets to `/public/`:
   - High-res background scene image: `/public/accord_06_bg.jpg`
   - 50ml flacon PNG cut-out: `/public/accord_06_50ml.png`
   - 20ml discovery flacon PNG cut-out: `/public/accord_06_20ml.png`

2. Open `lib/products.ts` and append a new `Product` object to the `PRODUCTS` array:

```ts
{
  id: '6',
  handle: 'soleil-noir',
  name: 'SOLEIL NOIR',
  frenchEcho: 'L\'éclat d\'obscurité',
  descriptor: 'NEROLI · INCENSE · TONKA',
  notes: {
    top: 'Neroli',
    heart: 'Smoked Incense',
    base: 'Tonka Bean',
  },
  sceneGround: '#140D07',
  accentColor: '#D4AF37',
  price50ml: 205,
  price100ml: 290,
  bgImage: '/accord_06_bg.jpg',
  bottleImage50ml: '/accord_06_50ml.png',
  bottleImage20ml: '/accord_06_20ml.png',
  description: 'A radiant clash of solar Grasse neroli blossom and dark subterranean incense.',
  pyramidDetails: {
    topDetail: 'Grasse Neroli & Solar Citrus',
    heartDetail: 'Somali Incense Resin & Myrrh',
    baseDetail: 'Roasted Tonka Bean & Vetiver',
  },
  volume: '50ml / 1.7 fl. oz. · 100ml / 3.4 fl. oz.',
  origin: 'Grasse, France',
}
```

3. Save the file. The hero observer slide deck, horizontal accords gallery, PDP pages, collections filter, and coffret builder will automatically render the new accord!

---

## 4. COMMANDS

- `npm run dev`: Start Next.js development server at `http://localhost:3000`
- `npm run build`: Build production bundle
- `npm start`: Run production server
- `http://localhost:3000/styleguide`: View live design system styleguide
