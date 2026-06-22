import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VoiceLocal — Private Voice Dictation for Mac',
  description:
    'Dictate anywhere on your Mac. Speech-to-text that never leaves your device — no cloud, no subscription, no account. Works in every app.',
  openGraph: {
    title: 'VoiceLocal — Private Voice Dictation for Mac',
    description: 'Dictate anywhere on your Mac. 100% private, 100% offline.',
    url: 'https://voicelocalapp.com',
    siteName: 'VoiceLocal',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoiceLocal — Private Voice Dictation for Mac',
    description: 'Dictate anywhere on your Mac. 100% private, 100% offline.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  )
}
