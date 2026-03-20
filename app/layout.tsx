import { SiteHeader } from '@/components/sections/SiteHeader';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: 'Mandure Serviços | Empreiteira em São Paulo',
    template: '%s | Mandure Serviços',
  },
  description:
    'Empreiteira especializada em construção civil, reformas e manutenção predial em São Paulo e Grande SP. Mais de 15 anos de experiência, 500+ projetos entregues.',
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
  authors: [{ name: 'Mandure Serviços' }],
  creator: 'Mandure Serviços',
  publisher: 'Mandure Serviços',
  metadataBase: new URL('https://mandureservicos.com.br'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mandureservicos.com.br',
    title: 'Mandure Serviços | Empreiteira em São Paulo',
    description:
      'Empreiteira especializada em construção civil, reformas e manutenção predial em São Paulo e Grande SP.',
    siteName: 'Mandure Serviços',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mandure Serviços - Empreiteira em São Paulo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mandure Serviços | Empreiteira em São Paulo',
    description:
      'Empreiteira especializada em construção civil, reformas e manutenção predial em São Paulo.',
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
  name: 'Mandure Serviços',
  description:
    'Empreiteira especializada em construção civil, reformas e manutenção predial em São Paulo e Grande SP.',
  url: 'https://mandureservicos.com.br',
  telephone: '+55-11-99999-9999',
  email: 'contato@mandureservicos.com.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Paulista, 1000, Sala 101',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  foundingDate: '2009',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 80 },
  sameAs: ['https://instagram.com/mandureservicos', 'https://facebook.com/mandureservicos'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-slate-800 antialiased transition-colors duration-300">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
