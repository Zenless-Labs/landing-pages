import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://zenlesslabs.com',
  ),
  title: 'Zenless Labs — Ideas, Made Physical',
  description:
    'San Francisco Bay Area, CA design and making studio for individuals and companies. Custom multicolor 3D printing, laser cutting and engraving, UV printing, and small CNC crafts for teams building what’s next. Bring your idea, artwork, or model.',
  openGraph: {
    title: 'Zenless Labs — Ideas, Made Physical',
    description:
      'Your idea, made in every detail. Custom 3D printing, laser cutting and engraving, UV printing, and CNC crafts from an independent studio rooted in the AI industry.',
    images: [
      {
        url: '/images/explorer-hero-zenless.webp',
        width: 1672,
        height: 941,
        alt: 'A detailed multicolor 3D printed explorer concept',
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
