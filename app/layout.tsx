import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site-seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Aurum Hyderabad | Luxury 4 BHK Apartments',
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Sree Varaaha Group' }],
  creator: 'Sree Varaaha Group',
  publisher: 'Sree Varaaha Group',
  category: 'real estate',
  keywords: [
    'Aurum Hyderabad',
    'luxury apartments in Hyderabad',
    '4 BHK apartments in Hyderabad',
    'Nanakramguda apartments',
    'Financial District Hyderabad apartments',
    'Sree Varaaha Group',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Aurum Hyderabad | Luxury 4 BHK Apartments',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        width: 1920,
        height: 1080,
        alt: 'Aurum luxury residences by Sree Varaaha Group in Hyderabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurum Hyderabad | Luxury 4 BHK Apartments',
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
  icons: {
    icon: '/company-icon.svg',
    shortcut: '/company-icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
