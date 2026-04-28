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
    'Fullstack Developer based in Belo Horizonte, Brazil. Building scalable web and mobile applications with modern technologies and AI integrations.',
  keywords: ['Fullstack Developer', 'React', 'React Native', 'Flutter', 'NestJS', 'TypeScript', 'Next.js', 'AI', 'Brazil', 'Mobile', 'Web'],
  authors: [{ name: 'Felipe Figueiredo' }],
  creator: 'Felipe Figueiredo',
  metadataBase: new URL('https://felipefigueiredodev.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://felipefigueiredodev.vercel.app',
    siteName: 'Felipe Figueiredo',
    title: 'Felipe Figueiredo — Fullstack Developer',
    description:
      'Fullstack Developer based in Belo Horizonte, Brazil. Building scalable web and mobile applications with modern technologies and AI integrations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Figueiredo — Fullstack Developer',
    description:
      'Fullstack Developer based in Belo Horizonte, Brazil. Building scalable web and mobile applications with modern technologies and AI integrations.',
    creator: '@felipefigueiredo',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-icon.svg',
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
  url: 'https://felipefigueiredodev.vercel.app',
  sameAs: [
    'https://github.com/FigueiredoFelipe',
    'https://www.linkedin.com/in/fjnfigueiredo/',
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
