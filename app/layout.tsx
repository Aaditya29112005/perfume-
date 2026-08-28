import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'FRASMETICS PARIS — Haute Parfumerie de Grasse',
  description:
    'Luxury French niche fragrance house. Unisex in spirit. Absolute in intent. Five signature accords formulated in Grasse, France.',
  openGraph: {
    title: 'FRASMETICS PARIS — Haute Parfumerie de Grasse',
    description: 'Luxury French niche fragrance house. Unisex in spirit. Absolute in intent.',
    url: 'https://frasmetics.com',
    siteName: 'FRASMETICS PARIS',
    images: [
      {
        url: '/heritage_oud.jpg',
        width: 1200,
        height: 630,
        alt: 'FRASMETICS Haute Parfumerie',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[var(--rouge)] selection:text-white bg-[var(--blanc-ivory)] text-[var(--noir)]">
        <Preloader />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
