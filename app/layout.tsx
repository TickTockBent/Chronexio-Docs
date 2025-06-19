import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Chronexio Documentation',
    template: '%s | Chronexio Docs',
  },
  description: 'Complete documentation for Chronexio APIs - UUID generation, hashing, text processing, and more. Developer infrastructure that moves at the speed of thought.',
  keywords: ['API', 'documentation', 'UUID', 'hash', 'text processing', 'developer tools', 'REST API'],
  authors: [{ name: 'Chronexio' }],
  creator: 'Chronexio',
  publisher: 'Chronexio',
  metadataBase: new URL('https://docs.chronexio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.chronexio.com',
    siteName: 'Chronexio Documentation',
    title: 'Chronexio Documentation',
    description: 'Complete documentation for Chronexio APIs - Developer infrastructure that moves at the speed of thought.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chronexio Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronexio Documentation',
    description: 'Complete documentation for Chronexio APIs - Developer infrastructure that moves at the speed of thought.',
    images: ['/og-image.png'],
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
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}