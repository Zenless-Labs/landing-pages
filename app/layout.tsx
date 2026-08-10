import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Zenless Labs — Custom AI Media Pipelines',
  description:
    'Zenless Labs builds custom, product-integrated AI media pipelines with adaptive creative profiles and automatic model orchestration.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mono.variable} font-mono antialiased`}>{children}</body>
    </html>
  );
}
