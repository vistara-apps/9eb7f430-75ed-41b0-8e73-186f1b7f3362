import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowYourRights Cards',
  description: 'Your Pocket Guide to Rights in Stressful Encounters',
  keywords: 'legal rights, police encounters, civil rights, documentation',
  authors: [{ name: 'KnowYourRights Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e1b4b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
