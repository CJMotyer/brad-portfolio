import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Brad Motyer — Actor & Singer',
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.svg` },
  description: 'I’m Brad Motyer, an actor and singer studying Musical Theatre at Kent State University. View my production photos, theatre credits, and résumé.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
