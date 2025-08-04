import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Literata } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nusa',
  description: 'A Progressive Web App for connecting local SMEs in Indonesia',
  applicationName: 'Nusa',
  appleWebApp: {
    title: 'Nusa',
  },
  openGraph: {
    title: 'Nusa',
    description: 'A Progressive Web App for connecting local SMEs in Indonesia',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-196x196.png', sizes: '196x196', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
      { url: '/apple-touch-icon-192x192.png', sizes: '192x192' },
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#ff5c02',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none">
      <head>
        <meta name="apple-mobile-web-app-title" content="Nusa" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${literata.variable} overscroll-none antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
