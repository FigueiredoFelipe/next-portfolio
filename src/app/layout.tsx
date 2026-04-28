import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Providers from './Providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Felipe Figueiredo — Fullstack Developer',
    template: '%s | Felipe Figueiredo',
  },
  description:
    'Fullstack Developer based in Belo Horizonte, Brazil. Building scalable web applications with React, NestJS, TypeScript, and AI integrations.',
  keywords: ['Fullstack Developer', 'React', 'NestJS', 'TypeScript', 'Next.js', 'AI', 'Brazil'],
  authors: [{ name: 'Felipe Figueiredo' }],
  creator: 'Felipe Figueiredo',
  metadataBase: new URL('https://felipefigueiredo.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://felipefigueiredo.dev',
    siteName: 'Felipe Figueiredo',
    title: 'Felipe Figueiredo — Fullstack Developer',
    description:
      'Fullstack Developer based in Belo Horizonte, Brazil. Building scalable web applications with React, NestJS, TypeScript, and AI integrations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Figueiredo — Fullstack Developer',
    description:
      'Fullstack Developer based in Belo Horizonte, Brazil. Building scalable web applications with React, NestJS, TypeScript, and AI integrations.',
    creator: '@felipefigueiredo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Felipe Figueiredo',
  jobTitle: 'Fullstack Developer',
  url: 'https://felipefigueiredo.dev',
  sameAs: [
    'https://github.com/FigueiredoFelipe',
    'https://linkedin.com/in/felipefigueiredo',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Belo Horizonte',
    addressCountry: 'BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
