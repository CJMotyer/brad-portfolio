import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Avery Stone — Actor', description: 'Cinematic actor portfolio template for film and television performers.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
