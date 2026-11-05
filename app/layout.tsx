import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Mercadinho Brisa Mar — Sua Entrega Rápida em Luís Correia',
  description: 'Água mineral, gás de cozinha e compras de supermercado entregues na sua casa, pousada ou casa de praia em Luís Correia, PI.',
  openGraph: {
    title: 'Mercadinho Brisa Mar — Sua Entrega Rápida em Luís Correia',
    description: 'Água mineral, gás de cozinha e compras de supermercado entregues na sua casa, pousada ou casa de praia em Luís Correia, PI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercadinho Brisa Mar — Sua Entrega Rápida em Luís Correia',
    description: 'Água mineral, gás de cozinha e compras de supermercado entregues na sua casa, pousada ou casa de praia em Luís Correia, PI.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
