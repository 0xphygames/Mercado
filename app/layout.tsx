import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mercadinho Brisa Mar — Sua Entrega Rápida em Luís Correia',
  description: 'Água mineral, gás de cozinha e compras de supermercado entregues na sua casa, pousada ou casa de praia em Luís Correia, PI.',
  manifest: '/manifest.json',
  themeColor: '#dc2626',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  openGraph: {
    title: 'Mercadinho Brisa Mar — Sua Entrega Rápida em Luís Correia',
    description: 'Água mineral, gás de cozinha e compras de supermercado entregues na sua casa, pousada ou casa de praia em Luís Correia, PI.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Mercadinho Brisa Mar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercadinho Brisa Mar — Sua Entrega Rápida em Luís Correia',
    description: 'Água mineral, gás de cozinha e compras de supermercado entregues na sua casa, pousada ou casa de praia em Luís Correia, PI.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Mercadinho Brisa Mar',
    'image': '/assets/aistudio/image_8c39438c.png',
    '@id': '',
    'url': 'https://maps.app.goo.gl/TWzoxuSqDiUtStHi9',
    'telephone': '+5586995353043',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Avenida Teresina',
      'addressLocality': 'Luís Correia',
      'addressRegion': 'PI',
      'postalCode': '64220-000',
      'addressCountry': 'BR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -2.9013541,
      'longitude': -41.6201847
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '07:00',
        'closes': '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '07:00',
        'closes': '14:00'
      }
    ],
    'sameAs': [
      'https://maps.app.goo.gl/TWzoxuSqDiUtStHi9'
    ]
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
