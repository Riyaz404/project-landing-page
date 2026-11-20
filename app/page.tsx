import { AurumLanding } from '@/components/aurum-landing'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site-seo'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Sree Varaaha Group',
      url: SITE_URL,
      logo: `${SITE_URL}/company-icon.svg`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+91 9177445222',
          areaServed: 'IN',
          availableLanguage: 'English',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+91 9642344222',
          areaServed: 'IN',
          availableLanguage: 'English',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '5th Floor, Myscape Weave, Financial District, Gachibowli',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500032',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Place',
      '@id': `${SITE_URL}/#aurum`,
      name: 'Aurum',
      description: SITE_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nanakramguda, Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <AurumLanding />
    </>
  )
}

