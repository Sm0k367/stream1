import type { Metadata, Viewport } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'Smoke Stream | Suno Nebula Experience',
  description:
    'A hyper-visual, generative audio experience powered by Suno AI, Three.js, and Next.js 14. Immerse yourself in a reactive 3D particle nebula that dances to your music.',
  keywords: [
    'Suno AI',
    'Music Player',
    '3D Visualization',
    'Audio Reactive',
    'Interactive',
    'Web Audio',
    'Three.js',
    'Next.js',
  ],
  authors: [{ name: 'DJ Smoke Stream' }],
  creator: 'DJ Smoke Stream',
  publisher: 'Smoke Stream',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smoke-stream.vercel.app',
    siteName: 'Smoke Stream',
    title: 'Smoke Stream | Suno Nebula Experience',
    description:
      'A hyper-visual, generative audio experience powered by Suno AI, Three.js, and Next.js 14.',
    images: [
      {
        url: 'https://cdn1.suno.ai/image_budKYGOsXRPSzUXI.png',
        width: 1200,
        height: 630,
        alt: 'Smoke Stream',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smoke Stream | Suno Nebula Experience',
    description:
      'A hyper-visual, generative audio experience powered by Suno AI, Three.js, and Next.js 14.',
    images: ['https://cdn1.suno.ai/image_budKYGOsXRPSzUXI.png'],
    creator: '@smokestream',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75" fill="%23a855f7">♪</text></svg>',
        type: 'image/svg+xml',
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
    <html lang="en" className="bg-black scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Smoke Stream" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${spaceMono.variable} bg-black text-white antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
