import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { PAGE_CONFIG, SITE_CONFIG } from '@/lib/constants/config';
import './globals.css';

// Lazy-load SiteHeader com SSR habilitado para não impactar Time to First Byte
const SiteHeader = dynamic(
  () => import('@/components/sections/SiteHeader').then((mod) => ({ default: mod.SiteHeader })),
  {
    loading: () => (
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="container-max flex h-16 items-center justify-between px-4 py-4">
          <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
          <div className="hidden gap-4 md:flex">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-16 animate-pulse rounded bg-slate-200" />
            ))}
          </div>
        </div>
      </header>
    ),
    ssr: true,
  }
);

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = SITE_CONFIG.url;
const companyName = PAGE_CONFIG.companyName;
const companyDescription =
  'Empreiteira especializada em construção civil, reformas e manutenção predial em São Paulo e Grande SP.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: `${companyName} | Empreiteira em São Paulo`,
    template: `%s | ${companyName}`,
  },
  description: `${companyDescription} Mais de 15 anos de experiência, 500+ projetos entregues.`,
  keywords: [
    'empreiteira',
    'construção civil',
    'reforma',
    'manutenção predial',
    'São Paulo',
    'obras residenciais',
    'obras comerciais',
    'empreiteira SP',
    'mandure servicos',
  ],
  authors: [{ name: companyName }],
  creator: companyName,
  publisher: companyName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    title: `${companyName} | Empreiteira em São Paulo`,
    description: companyDescription,
    siteName: companyName,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${companyName} - Empreiteira em São Paulo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${companyName} | Empreiteira em São Paulo`,
    description: companyDescription,
    images: ['/og-image.jpg'],
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: companyName,
  description: companyDescription,
  url: siteUrl,
  telephone: PAGE_CONFIG.phone,
  email: PAGE_CONFIG.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: PAGE_CONFIG.address,
    addressLocality: PAGE_CONFIG.city,
    addressRegion: PAGE_CONFIG.state,
    addressCountry: 'BR',
  },
  foundingDate: '2009',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 80 },
  sameAs: [PAGE_CONFIG.instagram, PAGE_CONFIG.facebook].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/images/logo/logo_128.avif" type="image/avif" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo/logo_256.avif" type="image/avif" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-slate-800 antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
